import Home from "./pages/Home";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import MedicalBoard from "./pages/MedicalBoard";
import UserAdministration from "./pages/UserAdministration";
import Reauth from "./pages/Reauth";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/records" element={<Records/>}/>
                <Route path="/medicalboard" element={<MedicalBoard/>}/>
                <Route path="/dashboard/reauth" element={<Reauth/>}/>
                <Route path="/dashboard/usrmgmt" element={<UserAdministration/>}/>
            </Routes>
        </Router>
    );
}

export default App;