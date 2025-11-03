import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProteinTrace - O Teatro da Descoberta Científica",
  description: "Laboratório virtual onde cada simulação é uma performance científica, e cada resultado um manifesto assinado de evidência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
