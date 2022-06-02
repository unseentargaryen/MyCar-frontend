import LogoComponent from "../../src/Components/Primary/LogoComponent";
import LoginForm from "../../src/Components/LoginForm";
import {useEffect} from "react";
import {useRouter} from "next/router";
import PageLoader from "../../src/Components/Primary/PageLoader";

const Login = () => {

    let router = useRouter();

    if (router.query.logout) {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
    }

    useEffect(() => {
        router.prefetch("/register");
    });

    return (
        <>
            <div className={"container-fluid"}>
                <div className={"row mt-5 pt-5"}>
                    <div className={"col-12 d-flex justify-content-center"}>
                        <LogoComponent/>
                    </div>
                    <LoginForm/>
                </div>
            </div>
        </>

    )
}
export default Login;