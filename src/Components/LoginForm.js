import {Alert, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Input, TextField} from "@mui/material";
import {Form} from "react-bootstrap";
import {useRef, useState} from "react";
import {useRouter} from "next/router";

const LoginForm = () => {
    const [error, setError] = useState('');
    const [errors, setErrors] = useState([]);

    const emailRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setError('');
        setErrors([]);

        let url = process.env.NEXT_PUBLIC_BACKEND_URL + process.env.NEXT_PUBLIC_BACKEND_API_URL + process.env.NEXT_PUBLIC_BACKEND_LOGIN_URL;

        let payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
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
                if (data.token !== undefined && data.user !== undefined) {
                    localStorage.setItem('access_token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    router.push("/");
                }
                throw data;
            }).catch((error) => {
                if (error.code === 401) {
                    setError(error.error_message);
                } else {
                    setErrors(error.errors);
                }
            });
    }

    return (
        <Form autoComplete={"true"}
              className={"offset-1 col-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6 justify-content-center d-flex flex-column mt-5"}
              onSubmit={handleSubmitForm}>
            <div className={"row"}>
                <FormControl variant="outlined">
                    {errors && errors.email ? <p className={"text-danger"}> {errors.email[0]}</p> : ''}
                    <TextField id="email" type={"email"} required inputRef={emailRef} label="Email" variant="outlined"/>
                </FormControl>
            </div>
            <div className={"row mt-3"}>
                {errors && errors.password ? <p className={"text-danger"}> {errors.password[0]}</p> : ''}
                <FormControl variant="outlined">
                    <TextField id="password" required inputRef={passwordRef} label="Password" variant="outlined"
                               type={"password"}/>
                </FormControl>
            </div>
            <div className={"row mt-1 text-center"}>
                <label className={"fw-bold"}>Hai dimenticato la password? <a href={"/reset-password-request"}
                                                                             className={"link-primary fw-bold"}>Reimpostala</a></label>
            </div>
            <div className={"row mt-5"}>
                <div className={"col-12"}>
                    {error !== '' ? <Alert severity={"error"} className={"w-100"}>{error}</Alert> : ''}
                    <Button variant={"contained"} type={"info"} className={"w-100 mt-3"}>LOGIN</Button>
                </div>
            </div>
            <div className={"row mt-2 text-center"}>
                <label className={"fw-bold"}>Non hai un account? <a href={"/register"}
                                                                    className={"link-primary fw-bold"}>Registrati</a></label>
            </div>
        </Form>
    );
}
export default LoginForm;