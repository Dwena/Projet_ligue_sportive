import { useEffect, useState } from 'react';

export default function ProductCatalog() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    useEffect(() => {
        fetch('http://localhost:8000/product/getAll')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }, []);
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div
                    className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products
                    .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                    .map((product) => (
                        <a key={product.id} href={product.href} className="group">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price} €</p>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.quantity} en sock</p>
                        </a>
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