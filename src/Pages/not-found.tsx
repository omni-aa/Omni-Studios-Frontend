import { NavLink } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

export const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900">
            {/* Header Section */}
            <header className="text-center">
                <h1 className="text-8xl font-extrabold text-primary dark:text-primary-400 mb-4">
                    404
                </h1>
                <p className="text-2xl md:text-3xl text-neutral-800 dark:text-neutral-200 font-semibold">
                    Oops! Page Not Found
                </p>
            </header>

            {/* Description Section */}
            <p className="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 text-center px-4">
                The page you're looking for doesn't exist, or it might have been moved. Don't worry, you can navigate back home!
            </p>

            {/* Return to Home Button */}
            <NavLink
                to="/"
                className="mt-8 inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-primary dark:bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-500 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
                <ArrowLeftCircle size={24} className="mr-3" />
                Back to Home
            </NavLink>

            {/* Decorative Image or Icon */}
            <div className="mt-12">
                <img
                    src="https://i.ibb.co/3ybcwgz/wp2481581.jpg"
                    alt="404 illustration"
                    className="w-[70%] max-w-md mx-auto"
                />
            </div>
        </div>
    );
};
