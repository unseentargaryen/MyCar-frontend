import {Dropdown} from "react-bootstrap";
import React, {useEffect} from "react";
import {useRouter} from "next/router";

const AvatarIconComponent = ({user}) => {

    const router = useRouter();

    // eslint-disable-next-line react/display-name
    const customToggler = React.forwardRef(({children, onClick}, ref) => (
        <i className="bi bi-person-circle col-6 text-end rem1-5" href="" ref={ref} onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}/>
    ));

    // eslint-disable-next-line react/display-name
    const customLogoutItem = React.forwardRef(({children, onClick}, ref) => (
        <div style={{marginLeft: "7px"}} className={"d-flex align-items-center"}>
            <i className="bi bi-box-arrow-left  rem1-5" ref={ref} style={{marginRight: "5px"}} onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}/>
            <span>Logout</span>
        </div>
    ));

    // eslint-disable-next-line react/display-name
    const customProfileItem = React.forwardRef(({children, onClick}, ref) => (
        <div style={{marginLeft: "7px"}} className={"d-flex align-items-center"}>
            <i className="bi bi-person-circle rem1-5" ref={ref} style={{marginRight: "5px"}} onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}/>
            <span>{children}</span>
        </div>
    ));

    const handleProfileClick = () => {
        router.push("/profile");
    }

    const handleProfileLoginClick = () => {
        router.push("/login");
    }

    const handleLogoutClick = () => {
        router.push("/login?logout=true", "/login");
    }

    useEffect(() => {
        if (!user)
            router.prefetch("/login");
    })

    return (
        <Dropdown className="col-6 text-end">
            <Dropdown.Toggle as={customToggler} id="dropdown-custom-components"/>
            <Dropdown.Menu>
                {user !== null ?
                    <>
                        <div onClick={handleProfileClick}>
                            <Dropdown.Item href="#/action-1" as={customProfileItem}>Profilo</Dropdown.Item>
                        </div>
                        <div onClick={handleLogoutClick}>
                            <Dropdown.Item href="#/action-1" as={customLogoutItem}>Logout</Dropdown.Item>
                        </div>
                    </>
                    :
                    <>
                        <div onClick={handleProfileLoginClick}>
                            <Dropdown.Item href="#/action-1" as={customProfileItem}>Accedi</Dropdown.Item>
                        </div>
                    </>
                }
            </Dropdown.Menu>
        </Dropdown>);
}

export default AvatarIconComponent;