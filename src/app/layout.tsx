import { NavMenu } from "@/components/NavMenu";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black scrollbar-hide overflow-x-hidden">
        <header className="fixed top-0 left-0 right-0 z-50 p-6 mx-5">
          <NavMenu />
        </header>
        {children}
      </body>
    </html>
  );
}
