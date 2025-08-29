export function NavMenu() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/robot", label: "Robot" },
  ];

  return (
    <nav className="flex items-center w-full">
      <a
        key={links[0].href}
        href={links[0].href}
        className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
      >
        {links[0].label}
      </a>
      <div className="flex gap-8 ml-auto">
        {links.slice(1).map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
