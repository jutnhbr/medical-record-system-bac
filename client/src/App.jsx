import Home from "./pages/Home";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import MedicalBoard from "./pages/MedicalBoard";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/records" element={<Records/>}/>
                <Route path="/medicalboard" element={<MedicalBoard/>}/>
            </Routes>
        </Router>
    );
}

export default App;