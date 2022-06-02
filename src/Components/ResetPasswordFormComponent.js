import {Alert, Button,  FormControl,TextField} from "@mui/material";
import {Form} from "react-bootstrap";
import {useRef, useState} from "react";
import {useRouter} from "next/router";

const ResetPasswordFormComponent = () => {
    const [requestSuccessfull, setRequestSuccessfull] = useState(null);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    let router = useRouter();
    let {email,token} = router.query;

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setErrors([]);

        let url = process.env.NEXT_PUBLIC_BACKEND_URL + process.env.NEXT_PUBLIC_BACKEND_API_URL + process.env.NEXT_PUBLIC_BACKEND_RESET_URL;

        let payload = {
            email,
            token,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmRef.current.value,
        };

        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    setRequestSuccessfull(true);
                    setMessage(data.message);
                    setTimeout(() => {
                        router.push("/login");
                    },3000);
                }else{
                    throw data;
                }
            }).catch((error) => {
                setRequestSuccessfull(false);
                setErrors(error.errors);
                if (error.message === 'passwords.token'){
                    setMessage("Token non valido. Effettuare una nuova richiesta");
                }else{
                    setMessage("Errore. Riprova più tardi o contatta un amministratore ");
                }
            });
    }

    return (
        <Form
              className={"offset-1 col-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6 justify-content-center d-flex flex-column mt-5"}
              onSubmit={handleSubmitForm}>
            <div className={"row"}>
                <FormControl variant="outlined">
                    <TextField id="password" type={"password"} inputRef={passwordRef} label="Password" variant="outlined"/>
                </FormControl>
            </div>
            <div className={"row mt-3"}>
                <FormControl variant="outlined">
                    <TextField id="password_confirm" inputRef={passwordConfirmRef} label="Password confirm" variant="outlined"
                               type={"password"}/>
                </FormControl>
            </div>
            <div className={"row mt-5"}>
                <div className={"col-12"}>
                    {requestSuccessfull === true ? <Alert severity={"success"} className={"w-100"}>{message}</Alert> : requestSuccessfull === false ?
                        <Alert severity={"error"} className={"w-100"}>{message}</Alert> : ''}                    <Button variant={"contained"} type={"info"} className={"w-100 mt-3"}>CAMBIA PASSWORD</Button>
                </div>
            </div>
        </Form>
    );
}
export default ResetPasswordFormComponent;