import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

const providers = [
  ...(process.env.GITHUB_CLIENT_ID
    ? [GitHub({ clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET! })]
    : []),
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== "your-google-client-id"
    ? [Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })]
    : []),
  ...(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_ID !== "your-linkedin-client-id"
    ? [LinkedIn({ clientId: process.env.LINKEDIN_CLIENT_ID, clientSecret: process.env.LINKEDIN_CLIENT_SECRET! })]
    : []),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const ghProfile = profile as any;
        const githubId = String(ghProfile.id || "");
        const username = ghProfile.login || token.email?.split("@")[0] || "user";
        const email = ghProfile.email || token.email || null;
        const name = ghProfile.name || null;
        const avatarUrl = ghProfile.avatar_url || null;
        const bio = ghProfile.bio || null;
        const location = ghProfile.location || null;
        const website = ghProfile.blog || null;

        // Store access token for GitHub API calls
        if (account.access_token) {
          token.accessToken = account.access_token;
        }

        try {
          // Upsert user in DB
          const existing = githubId
            ? await db.select().from(users).where(eq(users.githubId, githubId)).limit(1)
            : [];

          if (existing.length > 0) {
            // Update existing user
            await db
              .update(users)
              .set({
                name: name || existing[0].name,
                avatarUrl: avatarUrl || existing[0].avatarUrl,
                bio: bio || existing[0].bio,
                location: location || existing[0].location,
                website: website || existing[0].website,
                email: email || existing[0].email,
                githubUsername: username,
                updatedAt: new Date(),
              })
              .where(eq(users.githubId, githubId));

            token.id = String(existing[0].id);
            token.username = existing[0].username;
            token.githubUsername = username;
          } else {
            // Check if username is taken, append suffix if so
            let finalUsername = username;
            const usernameCheck = await db
              .select({ id: users.id })
              .from(users)
              .where(eq(users.username, username))
              .limit(1);
            if (usernameCheck.length > 0) {
              finalUsername = `${username}-${githubId.slice(-4)}`;
            }

            const inserted = await db
              .insert(users)
              .values({
                username: finalUsername,
                email,
                name,
                avatarUrl,
                bio,
                location,
                website,
                githubUsername: username,
                githubId,
              })
              .returning({ id: users.id, username: users.username });

            token.id = String(inserted[0].id);
            token.username = inserted[0].username;
            token.githubUsername = username;
          }
        } catch (error) {
          console.error("Error upserting user:", error);
          token.username = username;
          token.githubUsername = username;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.githubUsername = token.githubUsername as string;
        if (token.accessToken) {
          session.user.accessToken = token.accessToken as string;
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/`) {
        // Will be overridden client-side or via callbackUrl
        return baseUrl;
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
});
