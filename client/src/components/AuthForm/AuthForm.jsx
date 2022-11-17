import "./AuthForm.css";
import {useState} from "react";
import { useNavigate } from "react-router-dom";


const AuthForm = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(async (res) => {
            setIsSubmitting(false)
            if (res.status !== 200) {
                setError(await res.text())
            }
            else {
                const user = await res.json()
                if(user.auth) {
                    sessionStorage.setItem("auth", JSON.parse(user.auth))
                    navigate("/dashboard")
                }
            }
        })
            .catch((err) => {
                console.log(err)
                setIsSubmitting(false)
                setError("Something went wrong! Please try again later.")
            })
    }


    return (
        <div className="auth-form">
        <div className="form-container">
            <h1 className={"login-title"}>Login to MedEX</h1>
            {error && <p className={"error-message-login"}>{error}</p>}

            <form className="form" onSubmit={handleFormSubmit}>
                <div className="input-group">
                    <label> Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="email"
                            placeholder="Username"/>
                    </label>
                </div>
                <div className="input-group">
                    <label>Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder={"Password"}/>
                    </label>
                </div>
                <button type={"submit"}
                        className="login-button">{`${isSubmitting ? "LOGGING IN..." : "LOG IN"}`}</button>
            </form>
        </div>
    </div>
    );
}

export default AuthForm;