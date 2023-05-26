import { Fragment, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

export default function ShoppingCart() {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const { state } = useLocation();
  const userId = state ? state.user._id : null;

  useEffect(() => {
    axios.get(`http://localhost:8000/user/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, []);

  useEffect(() => {
    if (user && user.cart) {
        const p = [];
        user.cart.map((item) => {
        axios.get(`http://localhost:8000/product/getById/${item.product}`).then(response => {
            p.push(response.data);
        }).catch(error => {
            console.error('Error fetching product details:', error);
        });
    })
    setProducts(p);
      }
  }, [user]);

  const handleCheckout = async () => {
    axios.post(`http://localhost:8000/user/${userId}/cart/validate`)
    .then(() => {
        console.log("Commande enregistrée");
    })
      .catch(error => {
        console.error('Error validating cart:', error);
      });
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    products.forEach((product) => {
      const quantity = user.cart.find((item) => item.product=== product._id)?.quantity || 0;
      subtotal += product.price * quantity;
    });
    return subtotal.toFixed(2);
  };
  console.log(products);

  return (
    <div>
    {products != [] && (
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product._id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{product.title}</h3>
                    <p className="ml-4">{product.price}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  {/* <p className="text-gray-500">Qty {user.quantity}</p> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
        )}
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>{calculateSubtotal}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to="/catalogue" state={{user: user}} className="font-medium text-indigo-600 hover:text-indigo-500">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div> 
    
    </div>
   
    );
}
