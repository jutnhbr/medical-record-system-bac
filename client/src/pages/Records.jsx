import NavBar from "../components/NavBar/NavBar";
import RecordItem from "../components/RecordItem/RecordItem";
import Box from "@mui/material/Box";
import RecordFooter from "../components/RecordFooter/RecordFooter";
import {useEffect, useState} from "react";
import {checkSession} from "../util/sessionStorageChecker";
import CircularLoader from "../components/CircularLoader/CircularLoader";
import {Navigate} from "react-router-dom";

const Records = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const title = "Medical Record Insight for Patients"
    useEffect(() => {
        setAuthenticated(checkSession("patient"));
        if (authenticated) {
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
        } else {
            return (
                <>
                    <NavBar title={title}/>
                    <Box
                        sx={{display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <RecordItem/>
                        <RecordFooter/>
                    </Box>
                </>
            )
        }
    }
}

export default Records;