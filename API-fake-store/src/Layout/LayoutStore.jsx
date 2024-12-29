import { createContext, useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import axios from 'axios'
import reactLogo from "/assets/vite.svg";
import SearchBar from "../Elements/Store/SearchBar";

export const LayoutContext = createContext();

async function getProducts() { //async function to get the products from the API
    try {
        const res = await axios('https://api.escuelajs.co/api/v1/products')
        const data = res.data ? res.data : []
        const filterCars = data.length > 0 ? data.slice(0, 36) : []
        const filterDescription = filterCars.filter(car => car.description.length > 20)
        return filterDescription
    } catch (error) {
        return []
    }
}

const LayoutStore = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    const fetchData = async () => {
        try {
            const products = await getProducts()
            setData(products)
            const uniqueCategories = [...new Set(products.map(product => product.category.name))]
            setCategories(uniqueCategories)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart')) ?? []
        setCart(data)
    }, [])

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

    function addToCart(item) {
        const itemExists = cart.findIndex(cartItem => cartItem.id === item.id);

        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= 10) return
            const updatedCartItem = [...cart];
            updatedCartItem[itemExists].quantity++;
            setCart(updatedCartItem);
        } else {
            item.quantity = 1;
            setCart(prevCart => [...prevCart, item]);
        }
    }

    return (
        <LayoutContext.Provider value={{
            searchTerm, setSearchTerm,
            selectedCategory, setSelectedCategory,
            categories, setCategories,
            data, setData, cart, setCart,
            addToCart
        }}>
            <div className="flex flex-col h-screen">
                <header className="flex justify-evenly items-center p-5 bg-[#27223aff]">
                    <img className="flex-initial mr-3" src={reactLogo}></img>

                    <SearchBar />

                    <Link to="/" className="text-[#f3f1f2ff] px-4">
                        <i className="fas fa-user-circle"></i>
                        <p>My Profile</p>
                    </Link>
                    <Link to="/cart" className="text-[#f3f1f2ff]">
                        <i className="fas fa-wallet"></i>
                        <p>Cart</p>
                    </Link>
                </header>
                <nav className="flex justify-row items-auto p-1 w-full bg-[#463d68]">
                    <ul className="flex flex-row justify-around items-center w-full">
                        <li className="p-2"><Link to="/" className="text-[#f3f1f2ff]">Home</Link></li>
                        <li className="p-2"><Link to="#products" className="text-[#f3f1f2ff]">Season</Link></li>
                        <li className="p-2"><Link to="#deals" className="text-[#f3f1f2ff]">Offers</Link></li>
                        <li className="p-2"><Link to="#contact" className="text-[#f3f1f2ff]">Contact</Link></li>
                    </ul>
                </nav>
                <main className="bg-[#f3f1f2ff] flex-grow flex-1 justify-center items-center">
                    <div className="flex justify-center items-center w-full h-full">

                        <Outlet />

                    </div>
                </main>
                <footer className="justify-center items-center w-full bg-[#27223aff] text-[#f3f1f2ff] p-2">
                    <p>&copy; 2023 Fake API Store. All rights reserved.</p>
                </footer>
            </div>
        </LayoutContext.Provider>
    );
};

export default LayoutStore;

/* CSS HEX
/* CSS HEX
--dark-purple: #27223aff;
--uranian-blue: #a9cef4ff;
--xanthous: #f3b61fff;
--claret: #811d2eff;
--white-smoke: #f3f1f2ff;
*/