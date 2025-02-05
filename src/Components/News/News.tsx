import { useState, useEffect } from "react";
import {NewsCard} from "@/Interfaces/News/News-Interface.ts";
import NewsDataCard from "@/Components/News/NewsQuery.tsx";
import {urlFor} from "@/lib/Sanity/sanity.ts";
// Adjust the path as per your project structure

export default function WebsiteNews() {
    const [news, setNews] = useState<NewsCard[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadNewsData = async () => {
            const newsData = await NewsDataCard();
            setNews(newsData);
        };

        loadNewsData();
    }, []);
    const truncateDescription = (description: string, wordLimit: number) => {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    };
    const filteredNewsData = news.filter((NEWS) =>
        NEWS.title.toLowerCase().includes(searchTerm.toLowerCase())

    );

    return (
        <div className="text-primary py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                {/* Search Bar */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search News..."
                        className="w-full md:w-64 px-4 py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 md:mb-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* News Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredNewsData.slice(0, 3).map((NEWS) => (
                        <div
                            key={NEWS.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="p-6">
                                {/* Display image above the title */}
                                <img
                                    src={urlFor(NEWS.newsImage).url()}  // Assuming the image URL is in NEWS.image
                                    alt={NEWS.title}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />

                                {/* Title */}
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                                    {NEWS.title}
                                </h2>

                                {/* Description (Truncated if necessary) */}
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                    {truncateDescription(NEWS.smallDescription, 30)} {/* Truncate after 30 words */}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>



                {/* No Results Message */}
                {filteredNewsData.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
                        No News Found!
                    </p>
                )}

                {/* Features Section */}
            </div>
        </div>
    );
}
