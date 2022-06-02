import LogoComponent from "../../../src/Components/Primary/LogoComponent";
import {useEffect} from "react";
import {useRouter} from "next/router";
import ResetPasswordFormComponent from "../../../src/Components/ResetPasswordFormComponent";

const ResetPasswordForm = () => {

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
                    <ResetPasswordFormComponent/>
                </div>
            </div>
        </>

    )
}
export default ResetPasswordForm;