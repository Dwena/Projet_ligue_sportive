import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const productId = useParams().id;
    let { state } = useLocation();
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

    let availabilityText, availabilityColor;
    if (product.quantity > 30) {
        availabilityText = "En stock";
        availabilityColor = "text-green-600";
    } else if (product.quantity > 0) {
        availabilityText = "Bientôt en rupture";
        availabilityColor = "text-orange-600";
    } else {
        availabilityText = "Épuisé";
        availabilityColor = "text-red-600";
    }

    return (
        <div className="bg-white">
            <Navbar user={user}/>
            <div className="max-w-2xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                    <div className="flex items-center justify-center">
                        <div className="overflow-hidden w-full h-96 rounded-lg">
                            <img src={product.img} alt={product.title} className="object-contain w-full h-full"/>
                        </div>
                    </div>

                    <div className="mt-10 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>
                        <p className="mt-4 text-gray-500">{product.description}</p>

                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{product.price} €</p>

                        <p className={`mt-6 text-2xl font-semibold ${availabilityColor}`}>{availabilityText}</p>
                        <hr className="my-6"/>

                        <div>
                            <h3 className="font-medium text-gray-900">Categories</h3>
                            {product.category.map((category, index) => (
                                <p key={index} className="text-gray-600">{category}</p>
                            ))}
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={addToCart}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
