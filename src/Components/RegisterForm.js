import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Input, TextField} from "@mui/material";
import {Form} from "react-bootstrap";
import {useRef, useState} from "react";
import {useRouter} from "next/router";

const RegisterForm = () => {

    const [errors, setErrors] = useState([]);

    const router = useRouter();
    const emailRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const checkRef = useRef();


    const handleSubmitForm = (e) => {
        e.preventDefault();
        setErrors([]);


        let url = process.env.NEXT_PUBLIC_BACKEND_URL + process.env.NEXT_PUBLIC_BACKEND_API_URL + process.env.NEXT_PUBLIC_BACKEND_REGISTER_URL;

        let payload = {
            email: emailRef.current.value,
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmRef.current.value,
            check: checkRef.current.value,
        };

        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token !== undefined && data.user !== undefined) {
                    localStorage.setItem('access_token', data.token);
                    router.push("/");
                }
                throw data;
            })
            .catch((err) => {
                setErrors(err.errors);
            });
    }


    return (
        <Form
            className={"offset-1 col-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6 justify-content-center d-flex flex-column mt-5"}
            onSubmit={handleSubmitForm}>
            <div className={"row"}>
                {errors && errors.email ? <p className={"text-danger"}> {errors.email[0]}</p> : ''}
                <FormControl variant="outlined">
                    <TextField id="email" inputRef={emailRef} label="Email" variant="outlined" required/>
                </FormControl>
            </div>
            <div className={"row mt-3"}>
                {errors && errors.name ? <p className={"text-danger"}> {errors.name[0]}</p> : ''}
                <FormControl variant="outlined">
                    <TextField id="name" inputRef={nameRef} label="Nome" variant="outlined" required />
                </FormControl>
            </div>
            <div className={"row mt-3"}>
                {errors && errors.surname ? <p className={"text-danger"}> {errors.name[0]}</p> : ''}
                <FormControl variant="outlined">
                    <TextField id="surname" inputRef={surnameRef} label="Cognome" variant="outlined" required />
                </FormControl>
            </div>
            <div className={"row mt-3"}>
                {errors && errors.password ? <p className={"text-danger"}> {errors.password[0]}</p> : ''}
                <FormControl variant="outlined">
                    <TextField id="password" inputRef={passwordRef} label="Password" variant="outlined" type={"password"} required/>
                </FormControl>
            </div>
            <div className={"row mt-3"}>
                {errors && errors.password_confirmation ? <p className={"text-danger"}> {errors.password_confirmation[0]}</p> : ''}
                <FormControl variant="outlined">
                    <TextField id="password_confirmation" inputRef={passwordConfirmRef} label="Conferma password" variant="outlined" type={"password"} required/>
                </FormControl>
            </div>
            <div className={"row mt-3"}>
                {errors && errors.check ? <p className={"text-danger"}> {errors.check[0]}</p> : ''}
                <FormGroup>
                    <FormControlLabel control={<Checkbox id={"check"} inputRef={checkRef} required />} label="Accetto i termini e le condizioni" required/>
                </FormGroup>
            </div>
            <div className={"row mt-5"}>
                <Button variant={"contained"} type={"info"}>REGISTRATI</Button>
            </div>
            <div className={"row mt-2 text-center"}>
                <label className={"fw-bold"}>Hai già un account? <a href={"/login"} className={"link-primary fw-bold"}>Esegui il Login</a></label>
            </div>
        </Form>
    );
}
export default RegisterForm;