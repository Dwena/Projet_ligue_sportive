import './App.css';
import Home from "./views/Home";
import {Signin} from "./views/Signin";
import {Signup} from "./views/Signup";
import NotFound from "./views/NotFound";
import {Navigate, Route, Routes} from "react-router-dom";
import {RecoverPswd} from "./views/RecoverPswd";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Signin/>}/>
                <Route path="/inscription" element={<Signup/>}/>
                <Route path="/accueil" element={<Home/>}/>
                <Route path="/mot-de-passe-oublie" element={<RecoverPswd/>}/>
                <Route path="*" element={<Navigate to="/not-found" replace/>}/>
                <Route path="/not-found" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
