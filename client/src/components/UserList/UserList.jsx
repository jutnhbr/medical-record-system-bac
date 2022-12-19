import UserItem from "../UserItem/UserItem";
import "./UserList.css";

const UserList = ({users, callback}) => {
    return (
        <div className={"user-container"}>
            {users.map(user => (
                    <UserItem user={user} callback={callback} key={user.username}/>
            ))}
        </div>
    );
}

export default UserList;