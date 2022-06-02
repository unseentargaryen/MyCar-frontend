import {Alert, Button, FormControl, TextField} from "@mui/material";
import {Form} from "react-bootstrap";
import {useRef, useState} from "react";

const ResetPasswordRequestFormComponent = () => {
    const [requestSuccessfull, setRequestSuccessfull] = useState(null);
    const [message, setMessage] = useState('');

    const emailRef = useRef();

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        setMessage('');
        setRequestSuccessfull(null);

        let url = process.env.NEXT_PUBLIC_BACKEND_URL + process.env.NEXT_PUBLIC_BACKEND_API_URL + process.env.NEXT_PUBLIC_BACKEND_RESET_REQUEST_URL;

        let payload = {
            email: emailRef.current.value,
        };

        await fetch(url+1, {
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
                } else {
                    throw data;
                }
            }).catch((error) => {
                setRequestSuccessfull(false);
                if (error.errors && error.errors.email) {
                    setMessage(error.errors.email[0]);
                } else {
                    setMessage("Errore.Riprova più tardi o contatta un amministratore")
                }
            });
    }

    return (
        <Form
            className={"offset-1 col-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6 justify-content-center d-flex flex-column mt-5"}
            onSubmit={handleSubmitForm}>
            <div className={"row"}>
                <FormControl variant="outlined">
                    <TextField id="email" inputRef={emailRef} label="Email" variant="outlined"/>
                </FormControl>
            </div>
            <div className={"row mt-5"}>
                <div className={"col-12"}>
                    { requestSuccessfull ? <Alert severity={"success"} className={"w-100"}>{message}</Alert> : requestSuccessfull === false ?
                        <Alert severity={"error"} className={"w-100"}>{message}</Alert> : ''}
                    <Button variant={"contained"} type={"info"} className={"w-100 mt-3"}>INVIA RICHIESTA</Button>
                </div>
            </div>
        </Form>
    );
}
export default ResetPasswordRequestFormComponent;