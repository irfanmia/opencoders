import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

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
        token.username =
          (profile as any).login || // GitHub
          token.email?.split("@")[0] || // fallback
          "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).username = token.username as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After sign in, redirect to profile
      if (url === baseUrl || url === `${baseUrl}/`) {
        return baseUrl;
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
});
