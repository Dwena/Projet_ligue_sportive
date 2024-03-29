import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteProduct from "../modals/DeleteProduct";

function AdminProduct (){
    const {state} = useLocation();
    const user = state ? state.user : null;
    const [products, setProducts] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const deleteProduct= (id) => {
        axios.delete(`http://localhost:8000/product/delete/${id}`).then(() => {
            console.log("Produit supprimé");
            getProducts();
        });
    };
    const getProducts  = () => {axios.get("http://localhost:8000/product/getAll").then((response) => {
        setProducts(response.data);
        console.log(response.data);
    });}
    useEffect(() => {
        getProducts();
    }, []);
   
    return (
        <div>
        <Navbar user={user}/>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Titre
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Prix
                    </th>
                    <th scope="col" className="px-6 py-3">
                        category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Stock
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
            {products.map(p => (
                <tr key={p._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {p.title}
                </td>
                <td className="px-6 py-4">
                    {p.description}
                </td>
                <td className="px-6 py-4">
                    {p.price} €
                </td>
                <td className="px-6 py-4">
                    {p.category}
                </td>
                <td className="px-6 py-4">
                    {p.quantity}
                </td>
                <td className="px-6 py-4">
                <button onClick={() => setShowConfirmationModal(true)}>Supprimer </button>
                {showConfirmationModal && (
                <DeleteProduct onClose={() => setShowConfirmationModal(false)} productId={p._id} deleteProduct={deleteProduct} />
                )}
                <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md dark:bg-gray-800 hover:bg-red-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-red-500 dark:focus:bg-gray-700">Ajouter</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
</div>

)}

export default AdminProduct;