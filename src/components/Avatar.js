import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {Link} from "react-router-dom";

export default function Avatar({user}) {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <Menu as="div" className="relative ml-3">
                <div>
                    <Menu.Button
                        className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>

                            <h3 className={'block px-4 py-2 text-sm text-gray-700 font-bold'}>Bonjour {user.firstname} !
                                {user.administrator && " (admin)"}</h3>

                        </Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <Link to={'/mon-compte'} state={{user: user}}
                                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Mon espace client
                                </Link>
                            )}
                        </Menu.Item>
                        {user.administrator && (
                            <>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to={'/admin-user'} state={{user: user}}
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Liste des utilisateurs
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            to={'/admin-product'} state={{user: user}}
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Liste des produits
                                        </Link>
                                    )}
                                </Menu.Item>
                            </>
                        )}
                        <Menu.Item>
                            {({active}) => (
                                <a
                                    href="/"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-red-700')}
                                >
                                    Se déconnecter
                                </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
