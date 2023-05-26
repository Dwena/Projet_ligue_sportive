import {Disclosure} from '@headlessui/react'
import {Bars3Icon, ShoppingCartIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {Link} from "react-router-dom";
import Avatar from "./Avatar";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({user}) {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to={'/accueil'}
                                          state={{user: user}}>
                                        <img
                                            className="block h-8 w-auto lg:hidden"
                                            src="https://upload.wikimedia.org/wikipedia/fr/c/cf/Le_coq_sportif_2016_logo.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                        <img
                                            className="hidden h-8 w-auto lg:block bg-white rounded-full p-1"
                                            src="
                                        https://upload.wikimedia.org/wikipedia/fr/c/cf/Le_coq_sportif_2016_logo.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <Link to={'/catalogue'}
                                              state={{user: user}}
                                              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                                            Liste des produits
                                        </Link>
                                        <Link to={'/commande'}
                                              state={{user: user}}
                                              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                                            Liste des commandes
                                        </Link>

                                        {user && user.administrator &&
                                            (
                                                <Link to={'/admin-user'}
                                                      state={{user: user}}
                                                      className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                                                    Liste des utilisateurs
                                                </Link>
                                            ) && (
                                                <Link to={'/admin-product'}
                                                      state={{user: user}}
                                                      className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                                                    Liste des produits
                                                </Link>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Link to={'/panier'} state={{user: user}}>
                                    <button
                                        type="button"
                                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="sr-only">Mon panier</span>
                                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>

                                </Link>

                                {/* Profile dropdown */}
                                <Avatar user={user}/>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
