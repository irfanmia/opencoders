import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-section">
      <div className="mx-auto w-full px-4 lg:px-0 lg:max-w-[75vw] py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <span className="text-xl font-bold">
              <span className="text-primary">OPEN</span>CODERS
            </span>
            <p className="mt-2 text-sm font-normal text-gray-500">
              Showcase your open source contributions and connect with developers worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-xs tracking-wider text-gray-400 uppercase mb-3">Platform</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm font-normal text-gray-600 hover:text-primary transition-colors">Home</Link>
              <Link href="/launchpad" className="block text-sm font-normal text-gray-600 hover:text-primary transition-colors">Launchpad</Link>
              <Link href="/explore" className="block text-sm font-normal text-gray-600 hover:text-primary transition-colors">Explore</Link>
              <Link href="/login" className="block text-sm font-normal text-gray-600 hover:text-primary transition-colors">Sign In</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-xs tracking-wider text-gray-400 uppercase mb-3">Community</h4>
            <div className="space-y-2">
              <a href="https://github.com/opencoders" target="_blank" className="block text-sm font-normal text-gray-600 hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="block text-sm font-normal text-gray-600 hover:text-primary transition-colors">Discord</a>
              <a href="#" className="block text-sm font-normal text-gray-600 hover:text-primary transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs font-normal text-gray-400">
          © 2024 Open Coders. Built with ❤️ by the community.
        </div>
      </div>
    </footer>
  );
}
