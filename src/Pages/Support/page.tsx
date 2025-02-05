import {Button} from "@/Components/ui/Shadcn/button.tsx";
import {NavLink} from "react-router-dom";

const SupportPage = () => {
    return (

        <>
            <div className={"dark:text-primary"}>SupportPage</div>
            <NavLink to={"/support/email-support"}><Button className={"dark:text-gray-700"}>Email Us</Button></NavLink>
            <NavLink to={"/support/discord"}><Button className={"dark:text-gray-700"}>Discord</Button></NavLink>

        </>
    )
}
export default SupportPage
