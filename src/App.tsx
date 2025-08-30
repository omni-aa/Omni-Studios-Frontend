import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme-provider";
import { HomePage } from "@/Pages/HomePage/home-page";
import { NotFound } from "@/Pages/not-found";
import Navbar from "@/Pages/Navbar/navbar";
import GameDirectory from "@/Pages/Games/page";
import EchoesOfAzeroth from "@/Pages/Games/Echoes of Azeroth/page";
import ArcheRageRemastered from "@/Pages/Games/ArcheRage Remastered/page";
import LoginPage from "@/Pages/Accounts/Login/page";
import AccountCreation from "@/Pages/Accounts/AccountCreation/page";
import AccountOTPVerification from "@/Pages/Accounts/AccountOTPVerification/page";
import ForgotPassword from "@/Pages/Accounts/ForgotPassword/page";
import Overview from "@/Pages/AboutUs/Overview/page";
import EmailSupport from "@/Pages/Support/Email/page";
import SupportPage from "@/Pages/Support/page";
import DashboardPage from "@/Pages/Accounts/AccountDashboard/page";
import { useEffect, ReactNode } from "react";
import { useAuthStore } from "./store/authStore";

// ✅ ProtectedRoute component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/account/login" replace />;
    }

    if (user && !user.isVerified) {
        return <Navigate to="/account/verify-email" replace />;
    }

    return <>{children}</>;
};

// ✅ RedirectAuthenticatedUser component
const RedirectAuthenticatedUser = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user?.isVerified) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

// ✅ Router config
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />

            {/* Game Route Directory */}
            <Route path="games" element={<GameDirectory />} />
            <Route path="games/echoes-of-azeroth" element={<EchoesOfAzeroth />} />
            <Route path="games/archerage-remastered" element={<ArcheRageRemastered />} />

            {/* Account Routes */}
            <Route
                path="account/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="account/login"
                element={
                    <RedirectAuthenticatedUser>
                        <LoginPage />
                    </RedirectAuthenticatedUser>
                }
            />
            <Route
                path="account/creation"
                element={
                    <RedirectAuthenticatedUser>
                        <AccountCreation />
                    </RedirectAuthenticatedUser>
                }
            />

            <Route path="account/verify-email" element={<AccountOTPVerification />} />
            <Route path="account/forgot-password" element={<ForgotPassword />} />

            {/* Support Routes */}
            <Route path="support" element={<SupportPage />} />
            <Route path="support/email-support" element={<EmailSupport />} />

            {/* Company Info */}
            <Route path="about-us/overview" element={<Overview />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin mb-4"></div>

                {/* Loading text */}
                <p className="text-lg font-semibold">Checking authentication...</p>
            </div>
        );
    }


    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
