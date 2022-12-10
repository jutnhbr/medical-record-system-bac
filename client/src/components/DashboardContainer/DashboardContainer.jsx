import UserList from "../UserList/UserList";
import CreateUserPanel from "../CreateUserPanel/CreateUserPanel";
import "./DashboardContainer.css";
import MockPanel from "../MockPanel/MockPanel";
import Box from "@mui/material/Box";
import UpdateUserPanel from "../UpdateUserPanel/UpdateUserPanel";

const DashboardContainer = ({users}) => {
    return (
        <div className={"container"}>
            <UserList users={users}/>
            <Box
                sx={{display: 'flex', alignItems: "center", flexDirection: "column"}}>
                <CreateUserPanel/>
                <UpdateUserPanel/>
            </Box>
            <MockPanel/>
        </div>
    )
}

export default DashboardContainer;