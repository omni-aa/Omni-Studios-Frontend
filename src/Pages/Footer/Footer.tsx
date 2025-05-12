import {Github, Mail, Twitch, Twitter} from "lucide-react";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-primary text-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">OmniGameStudios</h2>
                        <p className="text-sm mt-2">
                            Future of gaming is now. Build the Future of this magical world with us
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4 mt-4">
                            <a href="mailto:contact@auroraproject.com" className="hover:text-white">
                                <Mail size={20} />
                            </a>
                            <a href="https://github.com/auroraproject" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                <Github size={20} />
                            </a>
                            <a href="https://twitch.tv/auroraproject" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                <Twitch size={20} />
                            </a>
                            <a href="https://twitter.com/auroraproject" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold text-white">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                            <Link to="/info/about" className="text-gray-300 hover:text-white">About Us</Link>
                            <Link to="/contribute" className="text-gray-300 hover:text-white">Contribute</Link>
                            <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link>
                        </div>
                    </div>

                    {/* Newsletter Signup */}
                    <div>
                        <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
                        <form className="mt-2 space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-xs text-gray-400 mt-2">
                            Subscribe for the latest updates and exclusive content.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-6 pt-4 text-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} OmniGameStudios. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
