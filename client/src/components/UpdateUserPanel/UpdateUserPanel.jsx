import "./UpdateUserPanel.css";
import {useNavigate} from "react-router-dom";

const UpdateUserPanel = () => {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/dashboard/reauth")
    }



    return(
        <div className="update-user-panel-container">
            <div className="update-user-panel-title">
                <h2>System User Manager</h2>
            </div>
            <div className="update-user-panel-content">
                <button onClick={handleRedirect} className={"update-user-panel-button"}>Update Users</button>
            </div>
        </div>
    )
}

export default UpdateUserPanel;