

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/hearder";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({subsets:["latin"]});

export const metadata = {
  title: "Sansai - AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
  appearance={{
    baseTheme: dark,   // 👈 ye correct hai
  }}
>
  <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className}`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {/* header */}
        <Header />
        <main className="min-h-screen">{children}</main>
        {/* footer */}
       
      </ThemeProvider>
    </body>
  </html>
</ClerkProvider>

  );
}