import type {Metadata} from "next";import "./globals.css";export const metadata:Metadata={title:"Deluxe Engineering | دەلۆکس ئەندازیاری",description:"پڕۆژێن ئەندازیاری، دیزاین و ئاڤاکرنێ یێن دەلۆکس ئەندازیاری.",icons:{icon:"/deluxe-logo.png"}};export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ku" dir="rtl"><body>{children}</body></html>}

