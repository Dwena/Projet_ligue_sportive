import {useLocation} from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MyAccount() {


    let {state} = useLocation();
    let user = state.user

    return (
        <>
            <Navbar user={user}/>
        </>
    )
}
