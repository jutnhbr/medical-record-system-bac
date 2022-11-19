import "./CreateUserPanel.css";

const CreateUserPanel = () => {
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
                        <select>
                            <option value="admin">Admin</option>
                            <option value="patient">Patient</option>
                            <option selected value="doctor">Doctor</option>
                        </select>
                        <label>Select corresponding doctor</label>
                        <select>
                            <option value="admin">Admin</option>
                            <option value="patient">Patient</option>
                            <option selected value="doctor">Doctor</option>
                        </select>
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