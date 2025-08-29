"use client";

export function NavMenuLinks(props: { onNavigate?: () => void }) {
  const links: Array<{ href: string; label: string }> = [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            onClick={props.onNavigate}
            className="block px-3 py-2 rounded hover:bg-white/10 border border-transparent hover:border-white/10"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
