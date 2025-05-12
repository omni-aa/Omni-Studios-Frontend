import {NavLink} from "react-router-dom";

export const SignInButton = () => {
    return (
    <>
        <div>
            <button className="p-[3px] relative">
                <div className="absolute inset-0  rounded-lg " />
                <div
                    className="px-8 py-2  bg-primary hover:bg-purple-500 dark:bg-primary dark:hover:bg-purple-500 rounded-[6px]  text-2xl relative group transition duration-200 text-primary font-bold">
                    <NavLink to="/account/login" className="text-white dark:text-white">Login</NavLink>
                </div>
            </button>
        </div>
    </>
    )
}

