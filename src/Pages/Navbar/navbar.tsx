import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/Components/Misc/ModeToggle.tsx';
import Footer from '@/Pages/Footer/Footer.tsx';
import { SignInButton } from '@/Components/ui/AceternityUI/tailwindcss-buttons.tsx';

interface NavItem {
    to: string;
    label: string;
    subItems?: NavItem[];
}

const Navbar = ({
                    logoText = 'MySite',
                    navItems = [
                        { to: '/', label: 'Home' },
                        {
                            to: '#',
                            label: 'Services',
                            subItems: [
                                { to: '/services/design', label: 'Design' },
                                { to: '/services/development', label: 'Development' },
                            ],
                        },
                        { to: '/about', label: 'About' },
                        { to: '/contact', label: 'Contact' },
                        { to: '/account/dashboard', label: 'Dashboard' },

                    ],
                }: {
    logoText?: string;
    navItems?: NavItem[];
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    // Render single nav link or dropdown
    const renderNavItem = (item: NavItem, isMobile = false) => {
        if (!item.subItems) {
            return (
                <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={isMobile ? closeMobileMenu : undefined}
                    className={({ isActive }) =>
                        cn(
                            'block px-3 py-2 rounded-md transition-colors whitespace-nowrap',
                            isActive
                                ? 'text-purple-600 dark:text-purple-400 font-bold'
                                : 'hover:text-purple-600 dark:hover:text-purple-400'
                        )
                    }
                >
                    {item.label}
                </NavLink>
            );
        }

        // Dropdown menu
        if (isMobile) {
            // Mobile: use <details> for accordion style
            return (
                <details key={item.label} className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        {item.label}
                        <svg
                            className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div className="mt-1 flex flex-col space-y-1 pl-4">
                        {item.subItems.map((sub) => renderNavItem(sub, true))}
                    </div>
                </details>
            );
        }

        // Desktop: Radix dropdown menu
        return (
            <RadixMenu.Root key={item.label}>
                <RadixMenu.Trigger
                    className="relative px-3 py-2 rounded-md cursor-pointer select-none inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {item.label}
                    <svg
                        className="ml-1 h-3 w-3 sm:h-4 sm:w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </RadixMenu.Trigger>

                <RadixMenu.Portal>
                    <RadixMenu.Content
                        sideOffset={5}
                        align="start"
                        className="mt-1 min-w-[12rem] max-w-[18rem] rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-3"
                    >
                        {item.subItems.map((sub) => (
                            <RadixMenu.Item key={sub.to} asChild>
                                <Link
                                    to={sub.to}
                                    className="block px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded"
                                >
                                    {sub.label}
                                </Link>
                            </RadixMenu.Item>
                        ))}
                    </RadixMenu.Content>
                </RadixMenu.Portal>
            </RadixMenu.Root>
        );
    };

    return (
        <>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
                <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 shadow-md">
                    <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3 md:py-4">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-600 dark:text-purple-400 no-underline"
                            aria-label={`${logoText} homepage`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {logoText}
                        </Link>

                        {/* Desktop nav */}
                        <nav
                            aria-label="Primary Navigation"
                            className="hidden md:flex flex-wrap items-center space-x-6 lg:space-x-8 font-semibold text-gray-700 dark:text-gray-300 max-w-full overflow-x-auto"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {navItems.map((item) => renderNavItem(item))}
                            <div className="pl-2">
                                <SignInButton />
                            </div>
                        </nav>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Mobile Drawer Menu */}
                <div
                    className={cn(
                        'fixed inset-0 z-50 transform bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out md:hidden shadow-lg',
                        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    )}
                    role="dialog"
                    aria-modal="true"
                    id="mobile-menu"
                >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 no-underline"
                        >
                            {logoText}
                        </Link>
                        <button
                            onClick={closeMobileMenu}
                            aria-label="Close menu"
                            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    </div>

                    <nav
                        className="flex flex-col px-5 py-6 space-y-6 text-lg font-semibold text-gray-700 dark:text-gray-300"
                        aria-label="Mobile Primary Navigation"

                    >
                        {navItems.map((item) => renderNavItem(item, true))}
                        <div>
                            <SignInButton />
                        </div>

                    </nav>
                </div>

                {/* Main Content */}
                <main className="flex-grow container mx-auto px-4 py-6">
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
