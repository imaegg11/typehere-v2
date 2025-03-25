import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Typehere++",
    description: "Baguette noises?",
};

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "./providers";

export default function RootLayout({ children }) {

    return (
        <html lang="en" className="" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    // disableTransitionOnChange
                >
                    {children}
                    <Toaster richColors closeButton="true" />
                </ThemeProvider>
            </body>
        </html>
    );
}
