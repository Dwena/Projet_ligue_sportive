import './App.css';
import Home from "./views/Home";
import {Signin} from "./views/Signin";
import {Signup} from "./views/Signup";
import NotFound from "./views/NotFound";
import {Navigate, Route, Routes} from "react-router-dom";
import {RecoverPswd} from "./views/RecoverPswd";
import OrderedProduct from "./views/OrderedProduct";
import ProductCatalog from "./views/ProductCatalog";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Signin/>}/>
                <Route path="/inscription" element={<Signup/>}/>
                <Route path="/accueil" element={<Home/>}/>
                <Route path="/catalogue" element={<ProductCatalog/>}/>
                <Route path="/commande" element={<OrderedProduct/>}/>
                <Route path="/mot-de-passe-oublie" element={<RecoverPswd/>}/>
                <Route path="*" element={<Navigate to="/not-found" replace/>}/>
                <Route path="/not-found" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
