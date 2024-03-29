import './App.css';
import Home from "./views/Home";
import {Signin} from "./views/Signin";
import {Signup} from "./views/Signup";
import NotFound from "./views/NotFound";
import {Navigate, Route, Routes} from "react-router-dom";
import {RecoverPswd} from "./views/RecoverPswd";
import ProductCatalog from "./views/ProductCatalog";
import ProductDetails from "./views/ProductDetails";
import MyAccount from "./views/MyAccount";
import ShoppingCart from "./components/ShoppingCart";
import AdminUser from './views/AdminUser';
import AdminProduct from './views/AdminProduct';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Signin/>}/>
                <Route path="/inscription" element={<Signup/>}/>
                <Route path="/accueil" element={<Home/>}/>
                <Route path="/catalogue" element={<ProductCatalog/>}/>
                <Route path="/product/:id" element={<ProductDetails/>}/>
                <Route path="/mon-compte" element={<MyAccount/>}/>
                <Route path="/admin-user" element={<AdminUser/>}/>
                <Route path="/admin-product" element={<AdminProduct/>}/>
                <Route path="/panier" element={<ShoppingCart/>}/>
                <Route path="/mot-de-passe-oublie" element={<RecoverPswd/>}/>
                <Route path="*" element={<Navigate to="/not-found" replace/>}/>
                <Route path="/not-found" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
