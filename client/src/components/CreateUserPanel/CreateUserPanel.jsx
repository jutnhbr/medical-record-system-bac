import "./CreateUserPanel.css";
import {useState} from "react";

const CreateUserPanel = () => {

    const [selectedRole, setSelectedRole] = useState("doctor");


    return (
        <div className="create-user-panel">
            <div className="create-user-panel-title">
                <h2>Create a new User</h2>
            </div>
            <div className="create-user-panel-form">
                <form>
                    <div className="create-user-panel-form-input">
                        <label>First Name</label>
                        <input type="text" placeholder="Enter First Name"/>
                        <label>Last Name</label>
                        <input type="text" placeholder="Enter Last Name"/>
                        <label>Age</label>
                        <input type="text" placeholder="Enter Age"/>
                        <label>Select Role</label>
                        <select onChange={(e) => setSelectedRole(e.target.value)} defaultValue={"doctor"}>
                            <option value="admin">Admin</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                        <label>Select corresponding doctor</label>
                        {(selectedRole !== "patient")
                            ? <select disabled defaultValue={""}></select>
                            : <select defaultValue={"Doctor1"}>
                                <option value="Doctor1">Doctor1</option>
                                <option value="Doctor2">Doctor2</option>
                                <option value="Doctor3">Doctor3</option>
                            </select>
                        }
                    </div>
                    <div className="create-user-panel-form-buttons">
                        <button className={"create-user-panel-form-button"} type="submit">Create User</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUserPanel;