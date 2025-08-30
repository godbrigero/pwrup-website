import Link from "next/link";

export function SimpleBlogPost(props: {
  title: string;
  description: string;
  date: string;
  href: string;
  prefetch?: boolean;
}) {
  return (
    <Link
      href={props.href}
      className="flex flex-col gap-2 p-2 border border-white/20 rounded-md px-5 lg:w-96 w-72 hover:bg-white/10"
      prefetch={props.prefetch}
    >
      <div className="lg:text-2xl text-xl font-medium">{props.title}</div>
      <div className="text-sm text-white/70">{props.description}</div>
      <div className="text-sm text-white/50">{props.date}</div>
    </Link>
  );
}
