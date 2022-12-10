import AuthForm from "../components/AuthForm/AuthForm";
import {useEffect, useState} from "react";
import {checkSession} from "../util/sessionStorageChecker";
import CircularLoader from "../components/CircularLoader/CircularLoader";
import {Navigate} from "react-router-dom";

const Reauth = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = JSON.parse(sessionStorage.getItem('auth'));
        if (auth) {
            setAuthenticated(auth);
            setLoading(false);
        }
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [loading]);

    if (loading) {
        return (
            <CircularLoader/>
        )
    } else {
        if (!authenticated) {
            return <Navigate replace to="/"/>
        }
        return (
            <AuthForm title={"Reauthenticate"} type={"reauth"}/>
        )
    }
}

export default Reauth;