import {Spinner} from "react-bootstrap";

const PageLoader = ({visible = false}) => {
    if (visible)
    return(
        <div className={"w-100 h-100 loader bg-light position-absolute"}>
            <Spinner animation="border" variant="primary" style={{opacity:"100%!important"}} />
        </div>
    )

    return <></>
}

export default PageLoader;