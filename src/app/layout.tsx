import type { Metadata, Viewport } from "next";
import "./globals.css";
import SecurityGuard from "@/components/SecurityGuard";

export const metadata: Metadata = {
  title: "Linne",
  description:
    "Portfolio of John Allen A. Guerra, a recent BS Information Technology graduate from Dalubhasaan ng Lungsod ng San Pablo. Skilled in system development, technical support, and research.",
  icons: {
    icon: "/Hero.png",
  },
};

// Without this, mobile browsers render the page at a desktop-like width
// (~980px) and zoom out to fit, which is why everything looked cut off
// on the right edge on mobile — the page wasn't actually broken, it was
// being viewed "zoomed out" with the right side off-screen.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SecurityGuard />
        {children}
      </body>
    </html>
  );
}