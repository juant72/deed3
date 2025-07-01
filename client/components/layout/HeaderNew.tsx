import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import AdvancedWalletConnect from "../../PageComponents/Components/AdvancedWalletConnect";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/roadmap", label: "Roadmap" },
];

const exploreLinks = [
    { href: "/active", label: "Activity" },
    { href: "/creator", label: "Creator" },
    { href: "/explor", label: "Explore" },
];

const HeaderNew: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [exploreOpen, setExploreOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-md">
            <nav className="container mx-auto flex items-center justify-between px-4 py-3" aria-label="Main navigation">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Ir a inicio">
                    <span className="flex flex-col justify-center">
                        <span className="text-2xl font-bold leading-none">
                            <span className="text-blue-400">Encrypia</span>
                            <span className="text-white ml-2">Deeds3</span>
                        </span>
                    </span>
                </Link>
                {/* Desktop Nav */}
                <ul className="hidden xl:flex items-center gap-2 ml-8" role="menubar">
                    {navLinks.map(link => (
                        <li key={link.href} role="none">
                            <Link href={link.href} className="px-3 py-2 text-gray-300 font-medium rounded hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors" role="menuitem">{link.label}</Link>
                        </li>
                    ))}
                    <li className="relative group" role="none">
                        <button
                            className="px-3 py-2 text-gray-300 font-medium rounded hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors flex items-center gap-1"
                            aria-haspopup="true"
                            aria-expanded={exploreOpen}
                            onClick={() => setExploreOpen(v => !v)}
                            onBlur={() => setExploreOpen(false)}
                            role="menuitem"
                        >
                            Explore
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {exploreOpen && (
                            <ul className="absolute left-0 top-full min-w-[230px] bg-slate-800 border border-border rounded-b-lg p-3 shadow-lg z-50" role="menu">
                                {exploreLinks.map(link => (
                                    <li key={link.href} role="none">
                                        <Link href={link.href} className="flex items-center justify-between px-3 py-2 text-gray-300 hover:text-primary hover:bg-black/30 rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" role="menuitem">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
                {/* Wallet Connect & Mobile Menu Button */}
                <div className="flex items-center gap-2">
                    <AdvancedWalletConnect onClose={() => setMobileMenuOpen(false)} />
                    <Button
                        variant="ghost"
                        className="xl:hidden"
                        aria-label="Abrir menú móvil"
                        onClick={() => setMobileMenuOpen(v => !v)}
                    >
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </Button>
                </div>
            </nav>
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <nav className="xl:hidden bg-slate-900/95 border-t border-border px-4 py-4" aria-label="Menú móvil">
                    <ul className="flex flex-col gap-2" role="menu">
                        {navLinks.map(link => (
                            <li key={link.href} role="none">
                                <Link href={link.href} className="block px-3 py-2 text-gray-200 font-medium rounded hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors" role="menuitem">{link.label}</Link>
                            </li>
                        ))}
                        <li className="relative group" role="none">
                            <button
                                className="w-full text-left px-3 py-2 text-gray-200 font-medium rounded hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors flex items-center gap-1"
                                aria-haspopup="true"
                                aria-expanded={exploreOpen}
                                onClick={() => setExploreOpen(v => !v)}
                                onBlur={() => setExploreOpen(false)}
                                role="menuitem"
                            >
                                Explore
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {exploreOpen && (
                                <ul className="mt-2 bg-slate-800 border border-border rounded-lg p-2 shadow-lg z-50" role="menu">
                                    {exploreLinks.map(link => (
                                        <li key={link.href} role="none">
                                            <Link href={link.href} className="block px-3 py-2 text-gray-200 hover:text-primary hover:bg-black/30 rounded transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" role="menuitem">{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default HeaderNew;
