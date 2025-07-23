import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
    variable: "--noto", 
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true
})

export const metadata = {
    title: "Typehere++",
    description: "Baguette noises?",
};

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "./providers";

export default function RootLayout({ children }) {

    return (
        <html lang="en" className="" suppressHydrationWarning>
            <body className={`${notoSans.variable} antialiased`}>
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