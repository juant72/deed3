import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FooterNew: React.FC = () => {
    return (
        <footer className="bg-slate-900 py-16 mt-20 border-t border-border" role="contentinfo">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Logo y descripción */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Ir a inicio">
                            <span className="flex flex-col justify-center">
                                <span className="text-2xl font-bold leading-none">
                                    <span className="text-blue-400">Encrypia</span>
                                    <span className="text-white ml-2">Deeds3</span>
                                </span>
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            Encrypia Deeds3: The institutional-grade platform for Web3 real estate tokenization and investment.
                        </p>
                        <div className="pt-6 border-t border-white/10">
                            <h2 className="text-white font-semibold mb-4 text-base">Get The Latest Updates</h2>
                            <form className="flex" aria-label="Newsletter subscription">
                                <Input
                                    type="email"
                                    className="flex-1 rounded-l-lg"
                                    placeholder="Your email"
                                    aria-label="Email address"
                                    required
                                />
                                <Button type="submit" className="rounded-r-lg" aria-label="Subscribe to newsletter">
                                    Subscribe
                                </Button>
                            </form>
                            <p className="text-gray-500 text-sm mt-3">Email is safe. We don&apos;t spam.</p>
                        </div>
                    </div>
                    {/* Enlaces Deeds3 */}
                    <div>
                        <h2 className="text-white font-semibold mb-6 text-base">Deeds3</h2>
                        <ul className="space-y-3" aria-label="Deeds3 links">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Protocol Explore</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">System Token</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Optimize Time</a></li>
                        </ul>
                    </div>
                    {/* Recursos */}
                    <div>
                        <h2 className="text-white font-semibold mb-6 text-base">Resources</h2>
                        <ul className="space-y-3" aria-label="Resources links">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Docs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">API Reference</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
                        </ul>
                    </div>
                    {/* Social y contacto */}
                    <div>
                        <h2 className="text-white font-semibold mb-6 text-base">Contact & Social</h2>
                        <ul className="space-y-3" aria-label="Social links">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Twitter</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Discord</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Encrypia Deeds3. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default FooterNew;
