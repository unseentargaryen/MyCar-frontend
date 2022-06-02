import {useRouter} from "next/router";
import {useEffect} from "react";

const HomeIconComponent = () => {

    const router = useRouter();

    const goHomeHandler = () => {
        router.push("/");
    }

    useEffect(() => {
        if (router.route !== "/")
            router.prefetch("/");
    });

    return (<i className="bi bi-house col-1 text-start rem1-5" onClick={goHomeHandler}/>);
}

export default HomeIconComponent;