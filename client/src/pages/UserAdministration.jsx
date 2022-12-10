import NavBar from "../components/NavBar/NavBar";
import {useEffect, useState} from "react";
import CircularLoader from "../components/CircularLoader/CircularLoader";
import {useFetch} from "../hooks/useFetch";
import {Navigate} from "react-router-dom";
import UserItem from "../components/UserItem/UserItem";

const UserAdministration = () => {

    const [reAuthenticated, setReAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const {fetchedData: users, isLoading, errMsg} = useFetch("http://localhost:3001/users");

    useEffect(() => {
        const auth = JSON.parse(sessionStorage.getItem('auth'));
        const reauth = JSON.parse(sessionStorage.getItem('reauth'));
        if (auth && reauth) {
            setReAuthenticated(auth);
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
        if (!reAuthenticated) {
            return <Navigate replace to="/"/>
        } else {
            return (
                <div>
                    <NavBar title={"User Administration"} authenticated={reAuthenticated}/>
                    {users && users.map(user => (
                        <UserItem user={user} type={"edit"} key={user.id}/>
                    ))}
                }
                </div>
            )
        }
    }
}

export default UserAdministration;