import NavBar from "../components/NavBar/NavBar";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {useFetch} from "../hooks/useFetch";
import DashboardContainer from "../components/DashboardContainer/DashboardContainer";
import CircularLoader from "../components/CircularLoader/CircularLoader";
import {checkSession} from "../util/sessionStorageChecker";

const Dashboard = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const {fetchedData: users, isLoading, errMsg} = useFetch("http://localhost:8000/users");

    useEffect(() => {
        setAuthenticated(checkSession("admin"));
        if(authenticated) {
            setLoading(false);
        }
        if(loading) {
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
                <div>
                    <NavBar title={"Admin Dashboard"} authenticated={authenticated}/>
                    {users && <DashboardContainer users={users}/>}
                </div>
            )
        }
    }
}
export default Dashboard;
