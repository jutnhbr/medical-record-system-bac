import {Avatar, IconButton} from "@mui/material";
import "./UserItem.css";
import {Delete, Update} from "@mui/icons-material";

const UserItem = ({user, type, callback}) => {

    const handleClick = () => {
        callback("record" + user.versicherungsnummer + ".md");
    }

    return (
        <div onClick={handleClick} className="user-item">
            <div className={"user-avatar-frame"}>
                <Avatar>H</Avatar>
            </div>
            <div className={"user-info"}>
                <p className="user-item-name">{user.fullname != null ? user.fullname : user.username}</p>
                <p className="user-item-role">{"Role: " + user.type}</p>
                <p>{user.versicherungsnummer != null ? "Nr.: " + user.versicherungsnummer : null }</p>
            </div>
            <div className={"user-item-buttons"}>
                <div>
                    <IconButton aria-label="delete">
                        {type !== "edit"
                            ? <Delete/>
                            : <Update/>
                        }
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default UserItem;