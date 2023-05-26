import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteUser from "../modals/DeleteUser";

function AdminUser (){
    const {state} = useLocation();
    const user = state ? state.user : null;
    const [users, setUsers] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    
    const deleteUser = (id) => {
        axios.delete(`http://localhost:8000/user/${id}`).then(() => {
            console.log("Utilisateur supprimé");
            getUser();
        });
    };
    const getUser  = () => {axios.get("http://localhost:8000/user/").then((response) => {
        setUsers(response.data);
        console.log(response.data);
    });}
    useEffect(() => {
        getUser();
    }, []);
   
    return (
        <div>
        <Navbar user={user}/>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Nom
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Prénom
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Tel
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Administateur
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.firstname}
                </td>
                <td className="px-6 py-4">
                    {user.lastname}
                </td>
                <td className="px-6 py-4">
                    {user.phone}
                </td>
                <td className="px-6 py-4">
                    {user.email}
                </td>
                <td className="px-6 py-4">
                    {user.administrator ? "Oui" : "Non"}
                </td>
                <td className="px-6 py-4">
                <button onClick={() => setShowConfirmationModal(true)}>Supprimer </button>
                {showConfirmationModal && (
                <DeleteUser onClose={() => setShowConfirmationModal(false)} userId={user._id} deleteUser={deleteUser} />
                )} </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
</div>

)}

export default AdminUser;