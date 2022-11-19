import UserList from "../UserList/UserList";
import CreateUserPanel from "../CreateUserPanel/CreateUserPanel";
import "./DashboardContainer.css";
import MockPanel from "../MockPanel/MockPanel";

const DashboardContainer = ({users}) => {
    return (
        <div className={"container"}>
            <UserList users={users} />
            <CreateUserPanel />
             <MockPanel />
        </div>
    )
}

export default DashboardContainer;