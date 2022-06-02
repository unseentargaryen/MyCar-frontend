import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import "../styles/colors.css"
import "../styles/utils.css"

import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import Footer from "../src/Components/Primary/Footer";
import AppBarComponent from "../src/Components/Primary/AppBarComponent";
import axios from "axios";

function MyApp({Component, pageProps}) {

    let router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        let access_token = localStorage.getItem("access_token");

        const call = async () => {
            let url = process.env.NEXT_PUBLIC_BACKEND_URL + process.env.NEXT_PUBLIC_BACKEND_API_URL + process.env.NEXT_PUBLIC_BACKEND_VERIFY_TOKEN_URL;

            const config = {
                headers: {Authorization: `Bearer ${access_token}`}
            };

            axios.post(
                url,
                [],
                config
            ).then(({data}) => {
                if (data.code !== 200) {
                    throw data.code;
                }
                setUser(data.user);
            }).catch((error) => {
                if (error === 403) {
                    setUser(null);
                    localStorage.removeItem("user");
                    localStorage.removeItem("access_token");
                }
            });
        }

        call();

    }, [router]);

    useEffect(() => {
        switch (router.route) {
            case "/login":
            case "/register":
                if (user !== null) {
                    router.push("/");
                }
                break;

            default:
                break;
        }
    }, [user])

    return (
        <>
            <AppBarComponent user={user}/>
            <Component {...pageProps} />
            <Footer/>
        </>
    );
}

export default MyApp
