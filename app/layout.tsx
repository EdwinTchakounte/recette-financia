import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Financia — Tests a realiser",
  description:
    "Liste des tests a faire sur Financia, par plateforme (site web / application mobile) et par profil.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
