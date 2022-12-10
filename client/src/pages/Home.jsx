import AuthForm from "../components/AuthForm/AuthForm";
import NavBar from "../components/NavBar/NavBar";

const Home = () => {
    return (
        <div>
            <NavBar title={"Home"} authenticated={false}/>
            <AuthForm title={"Login to MedEX"} />
        </div>
    );
}

export default Home;