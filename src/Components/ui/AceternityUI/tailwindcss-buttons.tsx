import {NavLink} from "react-router-dom";

export const SignInButton = () => {
    return (
    <>
        <div>
            <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-400 rounded-lg"/>
                <div
                    className="px-8 py-2  bg-gray-200 dark:bg-green-800 rounded-[6px]  relative group transition duration-200 text-primary hover:text-green-300 font-bold hover:bg-transparent">
                    <NavLink to="/account/login">Login</NavLink>
                </div>
            </button>
        </div>
    </>
    )
}

