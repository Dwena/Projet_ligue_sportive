import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";

export default function ProductCatalog() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const productsPerPage = 8;
    let {state} = useLocation();
    let user = state.user

    useEffect(() => {
        axios.get('http://localhost:8000/product/getAll')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const getStockStatus = (quantity) => {
        if(quantity > 30) return <p className="mt-1 text-lg font-medium text-green-600">En stock</p>;
        if(quantity > 0) return <p className="mt-1 text-lg font-medium text-yellow-600">Bientôt en rupture</p>;
        return <p className="mt-1 text-lg font-medium text-red-600">Épuisé</p>;
    }

    // Récupérer les catégories uniques pour les options du filtre
    const categories = [...new Set(products.flatMap(product => product.category))];


    return (
        <div className="bg-white">
            <Navbar user={user}/>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-14">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-8">
                    Catalogue de produit
                </h2>

                {/* Filtre de catégorie */}
                <div className="mb-4">
                    <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">Catégorie</label>
                    <select id="category-filter" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="all">Tous</option>
                        {categories.map((category) => (
                            <option value={category} key={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div
                    className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products
                        .filter(product => categoryFilter === 'all' || product.category.includes(categoryFilter))
                        .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                        .map((product) => (
                            <Link to={`/product/${product._id}`} state={{user: user}} className="group"
                                  key={product._id}
                                  href={product.href}>
                                <div
                                    className="w-500 h-500 overflow-hidden rounded-lg bg-gray-200 xl:w-500 xl:h-500">
                                    <img
                                        src={product.img}
                                        alt={product.imageAlt}
                                        className="object-cover object-center group-hover:opacity-75 w-full h-full transform group-hover:scale-90 transition-transform duration-200"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{product.price} €</p>
                                {getStockStatus(product.quantity)}
                            </Link>
                        ))}
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="mr-3 px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
                    >
                        Précédent
                    </button>
                    <button
                        disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
                    >
                        Suivant
                    </button>
                </div>

            </div>
        </div>
    )
}
