import { useState } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/Components/Misc/ModeToggle.tsx';
import Footer from '@/Pages/Footer/Footer.tsx';
import {SignInButton} from "@/Components/ui/AceternityUI/tailwindcss-buttons.tsx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
                <header className="sticky top-0 z-50 dark:bg-gradient-to-r  from-gray-900 to-gray-700 shadow-md">
                    <div className="container mx-auto px-4 flex items-center justify-between py-4">
                        <Link to="/" className="text-4xl font-bold no-underline text-primary">
                            Omni Game Studios
                        </Link>

                        <nav className="hidden md:flex items-center space-x-6 ml-auto">
                            <NavLink to="/" className={({ isActive }) => cn(
                                'flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-6 py-3 rounded-lg transition-all',
                                isActive ? 'font-medium' : 'font-normal'
                            )}>
                                <span className={"text-primary font-bold text-2xl"}>HOME</span>
                            </NavLink>

                            <RadixMenu.Root>
                                <RadixMenu.Trigger className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-6 py-3 rounded-lg transition-all">
                                    <span className={"text-primary font-bold text-2xl"}>GAME LIST</span>
                                </RadixMenu.Trigger>
                                <RadixMenu.Portal>
                                    <RadixMenu.Content className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 w-56 z-50 transition-transform max-h-96 overflow-y-auto">
                                        <RadixMenu.Item asChild>
                                            <Link
                                                to="/games/archerage-remastered"
                                                className="block px-4 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold"
                                            >
                                                ArcheRage Remastered
                                            </Link>
                                        </RadixMenu.Item>
                                        <RadixMenu.Item asChild>
                                            <Link
                                                to="/games/echoes-of-azeroth"
                                                className="block px-4 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold"
                                            >
                                                Echoes of Azeroth
                                            </Link>
                                        </RadixMenu.Item>
                                        <RadixMenu.Item asChild>
                                            <Link
                                                to="/games/dead-zone"
                                                className="block px-4 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold"
                                            >
                                                Dead Zone
                                            </Link>
                                        </RadixMenu.Item>
                                    </RadixMenu.Content>
                                </RadixMenu.Portal>
                            </RadixMenu.Root>
                            <NavLink to="/support" className={({ isActive }) => cn(
                                'flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-6 py-3 rounded-lg transition-all',
                                isActive ? 'font-medium' : 'font-normal'
                            )}>
                                <span className={"text-primary font-bold text-2xl"}>SUPPORT</span>
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) => cn(
                                'flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 px-6 py-3 rounded-lg transition-all',
                                isActive ? 'font-medium' : 'font-normal'
                            )}>
                                <span className={"text-primary font-bold text-2xl"}>Q&A</span>
                            </NavLink>
                            <SignInButton/>

                        </nav>

                        <button className="block md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={() => setIsOpen(!isOpen)}>
                            <svg className={cn('h-6 w-6 transition-transform', isOpen ? 'rotate-90' : '')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zm0 6a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </header>

                {isOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                        <ul className="space-y-4">
                            <li>
                                <NavLink to="/" onClick={closeMenu} className="block px-6 py-3 rounded-lg transition-all hover:bg-gray-200 dark:hover:bg-gray-700">
                                    Home
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}

                <main className="flex-grow container mx-auto px-4 py-4">
                    <Outlet />
                </main>

                <div className="fixed bottom-4 right-4 z-50">
                    <ModeToggle />
                </div>
            </div>
            <Footer />
            <ScrollRestoration />
        </>
    );
};

export default Navbar;
