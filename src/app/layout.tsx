import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black scrollbar-hide overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
