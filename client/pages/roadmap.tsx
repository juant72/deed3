
import React from "react";
import { NextPage } from "next";
import {
    Header,
    Footer,
    Copyright,
    MobileNavigation,
} from "../PageComponents/Components";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { CheckCircle, Zap, Target } from "lucide-react";

const RoadmapPage: NextPage = () => {
    const roadmap = {
        completed: [
            {
                title: "Core Tech Stack & Platform Migration",
                description:
                    "Successfully migrated the legacy jQuery project to a modern Next.js, TypeScript, and Tailwind CSS stack.",
            },
            {
                title: "Web3 Integration",
                description:
                    "Integrated wallet connectivity (SIWE) and essential Web3 hooks using Wagmi and RainbowKit.",
            },
            {
                title: "Code Quality & Linting",
                description:
                    "Established a strict ESLint and Prettier configuration, resolving all existing linting errors and warnings.",
            },
            {
                title: "Component Modernization",
                description:
                    "Replaced legacy components (Slick Carousel, Nice Select) with modern, accessible Shadcn UI and Framer Motion alternatives.",
            },
        ],
        inProgress: [
            {
                title: "Product Strategy & UX Refinement",
                description:
                    "Analyzing user flows to define a core user persona and streamline the onboarding process, reducing friction for non-crypto native users.",
            },
            {
                title: "Architectural Refactoring",
                description:
                    "Restructuring the component library to follow Atomic Design principles for improved scalability and maintainability.",
            },
            {
                title: "Testing Framework Implementation",
                description:
                    "Setting up Jest and React Testing Library to build a robust suite of unit and integration tests, ensuring platform stability.",
            },
            {
                title: "Public Transparency Initiative",
                description:
                    "Building dedicated pages for this Roadmap and for Security measures to enhance user trust and project transparency.",
            },
        ],
        future: [
            {
                title: "Live Data Dashboard",
                description:
                    "A public-facing dashboard displaying real-time platform metrics like properties funded, ROI, and user growth.",
            },
            {
                title: "Secondary Market Launch",
                description:
                    "Developing a secure and liquid secondary market for users to trade their tokenized real estate assets.",
            },
            {
                title: "Full Smart Contract Audit",
                description:
                    "Engaging with a top-tier security firm to perform a comprehensive audit of all smart contracts before mainnet launch.",
            },
            {
                title: "Institutional Investor Portal",
                description:
                    "Creating a dedicated portal with advanced analytics, reporting, and compliance tools for institutional-grade investors.",
            },
        ],
    };

    const Section = ({ title, items, icon: Icon, colorClass }) => (
        <AnimateOnScroll animation="slideUp" className="mb-16">
            <div className="flex items-center mb-8">
                <Icon className={`w-8 h-8 mr-4 ${colorClass}`} />
                <h2 className="text-3xl font-bold text-white">{title}</h2>
            </div>
            <div className="space-y-6 border-l-2 border-gray-700/50 pl-8">
                {items.map((item, index) => (
                    <div key={index} className="relative">
                        <div className={`absolute -left-10 h-4 w-4 rounded-full mt-1.5 ${colorClass} opacity-50`} />
                        <div className={`absolute -left-[42px] h-4 w-4 rounded-full mt-1.5 ${colorClass} animate-ping`} />
                        <h3 className="text-xl font-semibold text-gray-100">{item.title}</h3>
                        <p className="text-gray-400 mt-1">{item.description}</p>
                    </div>
                ))}
            </div>
        </AnimateOnScroll>
    );

    return (
        <div className="template-color-1 nft-body-connect bg-gray-900">
            <Header />
            <MobileNavigation />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <AnimateOnScroll animation="fadeIn" className="text-center mb-20">
                        <h1 className="text-5xl font-bold text-white tracking-tight">
                            Project Roadmap
                        </h1>
                        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                            Our journey to build a transparent, secure, and user-friendly
                            real estate tokenization platform. We are currently in the Proof
                            of Concept phase, demonstrating core functionalities.
                        </p>
                    </AnimateOnScroll>

                    <Section
                        title="Completed Milestones"
                        items={roadmap.completed}
                        icon={CheckCircle}
                        colorClass="text-green-400"
                    />
                    <Section
                        title="Currently In Progress"
                        items={roadmap.inProgress}
                        icon={Zap}
                        colorClass="text-yellow-400"
                    />
                    <Section
                        title="Future Vision"
                        items={roadmap.future}
                        icon={Target}
                        colorClass="text-purple-400"
                    />
                </div>
            </main>
            <Footer />
            <Copyright />
        </div>
    );
};

export default RoadmapPage;
