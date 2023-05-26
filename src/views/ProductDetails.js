import {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const productId = useParams().id;
    let {state} = useLocation();
    let user = state ? state.user : null;
    const addToCart = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/user/${user._id}/cart`, {
                product: productId,
                quantity: 1
            });
        } catch (error) {
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/product/getById/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white">
            <Navbar user={user}/>
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol
                        role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                    >
                        {/* Breadcrumbs */}
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    {/* Image gallery */}
                </div>

                {/* Product info */}
                <div
                    className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                        <p className="text-3xl tracking-tight text-gray-900">{product.price} €</p>
                        <p className="text-lg font-medium text-gray-900">{product.quantity} en stock</p>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Category</h3>
                            <ul className="mt-4">
                                {product.category.map((category, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    <div
                        className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        <div>
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={addToCart}>
                        Add to bag
                    </button>
                </div>
            </div>
        </div>
    );

};

export default ProductDetails;
