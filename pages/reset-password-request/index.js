import LogoComponent from "../../src/Components/Primary/LogoComponent";
import {useEffect} from "react";
import {useRouter} from "next/router";
import ResetPasswordRequestFormComponent from "../../src/Components/ResetPasswordRequestFormComponent";

const ResetPassword = () => {
    let router = useRouter();

    useEffect(() => {
        router.prefetch("/login");
    });

    return (
        <>
            <div className={"container-fluid"}>
                <div className={"row mt-5 pt-5"}>
                    <div className={"col-12 d-flex justify-content-center"}>
                        <LogoComponent/>
                    </div>
                    <ResetPasswordRequestFormComponent/>
                </div>
            </div>
        </>

    )
}
export default ResetPassword;