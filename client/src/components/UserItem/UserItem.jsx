import {Avatar, IconButton} from "@mui/material";
import "./UserItem.css";
import {Delete} from "@mui/icons-material";

const UserItem = ({user}) => {
    return (
        <div className="user-item">
            <div className={"user-avatar-frame"}>
                <Avatar>H</Avatar>
            </div>
            <div className={"user-info"}>
                <p className="user-item-name">{user.name}</p>
                <p className="user-item-role">{"Role: " + user.role}</p>
            </div>
            <div className={"user-item-buttons"}>
                <div>
                    <IconButton aria-label="delete">
                        <Delete/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default UserItem;