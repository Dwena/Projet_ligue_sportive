import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";

export default function ShoppingCart() {

    const [user, setUser] = useState({});
    const {state} = useLocation();
    const userId = state ? state.user._id : null;

    useEffect(() => {
        axios.get(`http://localhost:8000/user/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, [userId]);

    const handleCheckout = async () => {
        axios.post(`http://localhost:8000/user/${userId}/cart/validate`)
            .then(() => {
                console.log("Commande enregistrée");
            })
            .catch(error => {
                console.error('Error validating cart:', error);
            });
    };

    useEffect(() => {
        calculateSubtotal()
    }, [user.cart]);
    const calculateSubtotal = () => {
        if (user.cart) {

            let subtotal = 0;
            user.cart.forEach((product) => {
                const total = product.quantity * product.price;
                subtotal += total
            });

            return <p className={'text-2xl'}>{subtotal} €</p>
        }
    };

    return (
        <>
            {user.cart ? (
                <div>
                    <Navbar user={user}/>
                    <div className="flow-root">
                        <h1 className="m-5 font-bold text-4xl mb-8">Mon panier</h1>
                        <div
                            className="mx-auto max-w-2xl px-2 py-16 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-14 border-solid border-2 border-b-gray-300 rounded-2xl mb-8">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {user.cart.map((product) => (
                                    <li key={product._id} className="flex py-6 justify-center items-center">
                                        <div
                                            className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={product.img}
                                                 className="h-full w-full object-cover object-center"
                                                 alt={product.title}/>
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div
                                                    className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>{product.title}</h3>
                                                    <p className="ml-4 text-1xl pr-2">{product.price} €</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p>{product.quantity}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div
                                className="flex items-center justify-between text-base font-medium text-gray-900 mt-6 p-2 border-solid border-2 border-gray-500 rounded-2xl">
                                <p className={'text-1xl'}>Total</p>
                                {calculateSubtotal()}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="mt-6 flex justify-end">
                            <Link to="/accueil" state={{user: user}}>
                                <button
                                    type="button"
                                    className="flex mr-80 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    onClick={handleCheckout}
                                >
                                    Payer
                                </button>
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                <Link to="/catalogue" state={{user: user}}
                                      className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continuer les achats
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            ) : (
                <>
                    <div className="flex justify-center">
                        <p className="text-gray-500">No items in your cart.</p>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or
                            <Link to="/catalogue" state={{user: user}}
                                  className="font-medium text-indigo-600 hover:text-indigo-500">
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </p>
                    </div>
                </>
            )
            }
        </>
    );
}
