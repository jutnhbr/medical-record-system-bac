import NavBar from "../components/NavBar/NavBar";
import {useFetch} from "../hooks/useFetch";
import RecordItem from "../components/RecordItem/RecordItem";
import RecordViewerPanel from "../components/RecordViewerPanel/RecordViewerPanel";
import "./Pages.css";
import {useEffect, useState} from "react";
import {checkSession} from "../util/sessionStorageChecker";
import CircularLoader from "../components/CircularLoader/CircularLoader";
import {Navigate} from "react-router-dom";
import UserList from "../components/UserList/UserList";

const MedicalBoard = () => {

    const {fetchedData: users, isLoading, errMsg} = useFetch("http://localhost:3001/mypatients");
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recordid, setRecordid] = useState(null);


    useEffect(() => {
        setAuthenticated(checkSession("doctor"));
        if (authenticated) {
            setLoading(false);
        }
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [loading, authenticated]);

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
                    <NavBar title={"Patient Overview"} authenticated={authenticated}/>
                    <div className={"medicalboard-container"}>
                        {users && <UserList callback={setRecordid} users={users}/>}
                        <div className={"medicalboard-content"}>
                            {recordid &&
                                <>
                                    <RecordViewerPanel/>
                                    <RecordItem recordid={recordid}/>
                                </>
                            }
                            {!recordid &&
                                <p className={"medicalboard-content-text"}>Select a patient to view their records</p>}
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default MedicalBoard