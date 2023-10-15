"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import GlowingGradientBorderButton from "./ui/GlowingGradientBorderButton";

export const LandingMain = () => {
    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl space-y-5 font-extrabold">
                <h1>Navigating User Experience For</h1>
                <div className=" py-5 text-transparent bg-clip-text bg-gradient-to-r from-red-50 to-red-600">
                    <TypewriterComponent 
                        options={{
                            strings: [
                                "Families",
                                "Friends",
                                "Coworkers",
                                "Enterprises",
                                "Governments"
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            <div className="py-10 text-sm md:text-xl font-light text-gray-600">
                        See how it's done through the app below.
            </div>
            </div>
                    <button className="pb-20 text-2xl">
                        <GlowingGradientBorderButton gradient="bg-gradient-to-r from-red-600 to-red-600" href="/dashboard">
                            Conversation
                        </GlowingGradientBorderButton>
                    </button>
                    
                
            
        </div>
    )
}