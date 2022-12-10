import UserItem from "../UserItem/UserItem";
import "./UserList.css";

const UserList = ({users}) => {
    return (
        <div className={"user-container"}>
            {users.map(user => (
                    <UserItem user={user} key={user.username}/>
            ))}
        </div>
    );
}

export default UserList;