import {useRouter} from "next/router";
import LogoComponent from "../../src/Components/Primary/LogoComponent";
import RegisterForm from "../../src/Components/RegisterForm";
import {useEffect} from "react";

const Register = () => {

    const router = useRouter();

    useEffect(() => {
        router.prefetch("/login");
    })
    return (
        <div className={"container-fluid"}>
            <div className={"row mt-5 pt-5"}>
                <div className={"col-12 d-flex justify-content-center"}>
                    <LogoComponent/>
                </div>
                <RegisterForm/>
            </div>
        </div>
    )
}
export default Register;