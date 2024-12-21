import { Roboto } from "next/font/google";
import "./globals.css";

const RobotoSans = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${RobotoSans.className} antialiased`}>{children}</body>
    </html>
  );
}
