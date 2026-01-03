import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased">
        {/* Standardized Fixed Navbar */}
        <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a
              href="/"
              className="text-lg font-bold tracking-tighter text-slate-900"
            >
              DEV<span className="text-blue-600">BLOG</span>
            </a>
            <div className="flex gap-8 text-sm font-medium text-slate-600">
              <a href="/" className="hover:text-blue-600 transition">
                Articles
              </a>
              <a href="#" className="hover:text-blue-600 transition">
                Projects
              </a>
              <a href="#" className="hover:text-blue-600 transition">
                About
              </a>
            </div>
          </div>
        </nav>
        <div className="pt-16">
          {" "}
          {/* Space for fixed nav */}
          {children}
        </div>
      </body>
    </html>
  );
}
