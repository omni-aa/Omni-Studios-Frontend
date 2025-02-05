
import { BackgroundBeamsWithCollision } from "@/Components/ui/AceternityUI/background-beams-with-collision";
import {SparklesCore} from "@/Components/ui/AceternityUI/sparkles.tsx";
import {FeaturesSectionDemo} from "@/Components/Misc/Features.tsx";
import WebsiteNews from "@/Components/News/News.tsx";

export function HomePage() {
    return (
        <>
            <div
                className="h-[20rem] sm:h-[20rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md pb-8">
                <h1 className="md:text-6xl text-2xl lg:text-8xl font-bold text-center text-white relative z-20">
                    NEW & UPDATES
                </h1>
                <div className="w-full max-w-2xl h-32 sm:h-24 relative">
                    {/* Gradients */}
                    <div
                        className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"/>
                    <div
                        className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"/>
                    <div
                        className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"/>
                    <div
                        className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"/>

                    {/* Core component */}
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />

                    {/* Radial Gradient to prevent sharp edges */}
                    <div
                        className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(250px_150px_at_top,transparent_20%,white)]"></div>
                </div>
            </div>
            <WebsiteNews/>
            <FeaturesSectionDemo/>
            <BackgroundBeamsWithCollision className="py-3 px-5 my-4">
                <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                    Welcome to {" "}
                    <div
                        className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        <div
                            className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                            <span className="">Omni Game Studios</span>
                        </div>
                    </div>
                </h2>
            </BackgroundBeamsWithCollision>
        </>

    )
        ;
}


