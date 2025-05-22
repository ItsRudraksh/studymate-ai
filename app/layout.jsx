import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "@/components/ui/toaster";

const OutfitSans = Outfit({
  variable: "--font--outfit--sans",
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "StudyMate AI",
  description: "StudyMate AI is a platform that helps you learn new things",
  icons: {
    icon: "/favicon-16x16.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning>
        <body
          className={`${OutfitSans.variable} antialiased overflow-x-hidden`}>
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
