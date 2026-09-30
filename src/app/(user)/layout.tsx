import type { Metadata } from 'next';
import './global.css';
import { Geist } from 'next/font/google';
import Navbar from './components/navbar';
import { Banner } from './components/banner';


export const metadata: Metadata = {
    title: "Akadiva",
    description: "Platform Pendidikan Digital Akadiva",
}

const geist = Geist({
    variable: '--font-geist',
    subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="id">
            <body className={geist.variable}>
                <Navbar />
                <Banner />

                {children}
            </body>
        </html>
    );
} 