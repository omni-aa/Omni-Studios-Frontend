import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@/lib/theme-provider.tsx";
import {HomePage} from "@/Pages/HomePage/home-page.tsx";
import { NotFound } from "@/Pages/not-found";
import Navbar from "@/Pages/Navbar/navbar.tsx";
import GameDirectory from "@/Pages/Games/page.tsx";
import EchoesOfAzeroth from "@/Pages/Games/Echoes of Azeroth/page.tsx";
import ArcheRageRemastered from "@/Pages/Games/ArcheRage Remastered/page.tsx";
import LoginPage from "@/Pages/Accounts/Login/page.tsx";
import AccountCreation from "@/Pages/Accounts/AccountCreation/page.tsx";
import AccountOTPVerification from "@/Pages/Accounts/AccountOTPVerification/page.tsx";
import ForgotPassword from "@/Pages/Accounts/ForgotPassword/page.tsx";
import AccountDashboard from "@/Pages/Accounts/AccountDashboard/page.tsx";
import Overview from "@/Pages/AboutUs/Overview/page.tsx";
import EmailSupport from "@/Pages/Support/Email/page.tsx";
import SupportPage from "@/Pages/Support/page.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/"  element={<Navbar/>}>
            <Route path="/" element={<HomePage/>}/>

            / Game Route Directory
            <Route path="/games" element={<GameDirectory/>}/>
            <Route path="/games/echoes-of-azeroth" element={<EchoesOfAzeroth/>}/>
            <Route path="/games/archerage-remastered" element={<ArcheRageRemastered/>}/>


            / Login & Account Creation Routes
            <Route path="/account/login" element={<LoginPage/>}/>
            <Route path="/account/creation" element={<AccountCreation/>}/>
            <Route path="/account/verification" element={<AccountOTPVerification/>}/>
            <Route path="/account/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/account/dashboard"  element={<AccountDashboard/>}/>

            / Contact Support
            <Route path="/support" element={<SupportPage/>}/>
            <Route path="/support/email-support" element={<EmailSupport/>}/>



            / Company Information
            <Route  path={"/about-us/overview"} element={<Overview/>}/>

            /  404 Page Not Found
            <Route  path="*" element={<NotFound/>}/>
        </Route>
    )
);

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}


export default App
