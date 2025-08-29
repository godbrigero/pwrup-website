export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-white p-5 flex flex-col gap-5 items-center mt-10">
      <div className="transition-all duration-300 lg:w-1/2 md:w-3/4 w-6/7">
        {children}
      </div>
    </div>
  );
}
