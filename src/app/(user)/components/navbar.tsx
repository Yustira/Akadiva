"use client"

import Link from "next/link"; // navigasi
import Image from "next/image"; // memanggil gambar
import { usePathname } from "next/navigation"; // mengetahui halaman aktif
import { useEffect, useState } from "react"; // buka tutup hamburger
import { Menu, X } from "lucide-react";

// array navigasi
const navLinks = [
    {
        name: "Beranda",
        href: "/",
    },
    {
        name: "Tryout",
        href: "/tryout",
    },
    {
        name: "Materi",
        href: "/materi",
    },
    {
        name: "Kelas Online",
        href: "/kelas-online",
    },
];

export default function Navbar() {

    // mengetahui halaman aktif
    const pathname = usePathname();

    // buka tutup hamburger
    const [isOpen, setIsOpen] = useState(false);

    // efek navbar saat discroll
    const [isScrolled, setIsScrolled] = useState(false);

    // mendeteksi scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <nav className={`sticky top-0 z-50 bg-[#F6F7FE] transition-all duration-200 ${isScrolled ? "border-gray-200 shadow-md" : "border-transparent"}`}>
            <div className="flex mx-auto max-w-[1728px] h-[70px] items-center px-5 md:px-10 lg:px-15">

                {/* Logo */}
                <Link href={"/"} className="shrink-0 -ml-1 md:-ml-0" onClick={() => setIsOpen(false)}>
                    <Image src="/Akadiva.svg" alt="Akadiva" width={180} height={50} priority style={{ width: 'auto', height: 'auto' }} className="w-[145px] md:w-[180px]" />
                </Link >

                {/*Navigasi*/}
                <div className="hidden flex-1 lg:flex md:mx-15 lg:md-25">
                    <div className="flex items-center font-medium">

                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`rounded-md px-8 py-3 text-[16px] font-medium transition-colors duration-200
                                ${isActive ? "bg-[#EAEDFE] text-[#0068F3]" : "hover:text-[#0068F3]"}`}>
                                    {link.name}
                                </Link>
                            );
                        })}

                    </div>
                </div>

                {/* Desktop Login */}
                <Link href={"#"} className="hidden shrink-0 rounded-md bg-[#0068F3] px-8 py-3 text-[16px] font-medium text-white transition-colors duration-200 hover:bg-[#0758C9] lg:block">
                    Login
                </Link>

                {/* Mobile Hamberger */}
                <button type="button" aria-label={isOpen ? "Tutup menu" : "Buka menu"} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className="ml-auto flex items-center justify-end h-10 w-10 rounded-md z-20 lg:hidden " >
                    {isOpen ? (
                        <X className="h-6 w-6 text-white" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="px-6 py-4 fixed right-0 top-0 h-dvh bg-[#262E52] border-gray-200 shadow-md z-10 h-[100dvh] w-[280px] max-w-[50dvw] lg:hidden">
                        <div className="top-10 flex flex-col gap-1 h-full justify-between">
                            <div className="mt-15 flex flex-col text-white">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;

                                    return (
                                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`rounded-md px-4 py-3 text-[16px] font-medium
                                ${isActive ? "bg-[#EAEDFE] text-[#0068F3]" : "hover:text-[#0068F3]"}`}>
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col">
                                {/* Mobile Login */}
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-3 rounded-md bg-[#0068F3] px-4 py-3 text-center text-[16px] font-medium text-white transition-colors duration-200 hover:bg-[#0758C9]"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </nav >
    );
}