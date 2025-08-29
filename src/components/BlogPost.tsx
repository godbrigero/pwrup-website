import Link from "next/link";

export function SimpleBlogPost(props: {
  title: string;
  description: string;
  date: string;
  href: string;
}) {
  return (
    <Link
      href={props.href}
      className="flex flex-col gap-2 p-2 border border-white/20 rounded-md px-5 w-96 hover:bg-white/10"
    >
      <div className="text-2xl font-medium">{props.title}</div>
      <div className="text-sm text-white/70">{props.description}</div>
      <div className="text-sm text-white/50">{props.date}</div>
    </Link>
  );
}
