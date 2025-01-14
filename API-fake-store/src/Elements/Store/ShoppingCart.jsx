import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useStore } from "@/ZustandStore/store";

const ShoppingCart = () => {
    const ZclearCart = useStore((state) => state.clearCart);
    const setCartItems = useStore((state) => state.setCartItems);
    const ZcartTotal = useStore((state) => state.getTotalPrice());
    const Zcart = useStore((state) => state.items);

    function getImages(product) {
        const response = product.images[0];
        try {
            const data = JSON.parse(response);
            return data[0];
        } catch {
            return response;
        }
    }

    function removeFromCart(itemId) {
        setCartItems(Zcart.filter(item => item.id !== itemId));
        if (Zcart.length === 1 || Zcart.length === 0) {
            ZclearCart()
        }
    }

    function clearCart() {
        ZclearCart();
    }

    function changeQuantity(change, id) {
        if (change === 1) {
            const newCart = Zcart.map(product => {
                if (product.id === id && product.quantity > 1) {
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    }
                }
                return product
            })
            setCartItems(newCart);
        } else {
            const newCart = Zcart.map(product => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    }
                }
                return product
            })
            setCartItems(newCart);
        }
    }

    const cartEmpty = useMemo(() => Zcart.length === 0, [Zcart]);

    return (
        <div className="flex flex-col p-5 items-start bg-[#f3f1f2ff] min-h-full text-black overflow-auto
            box-border w-4/5 justify-start">
            <section className="flex flex-col mt-4 bg-white p-3 rounded-lg shadow-md w-full justify-between items-start">
                <h2 className="mb-2 text-black text-2xl">Shopping Cart</h2>
                <p className="justify-start">Total to pay: ${ZcartTotal}</p>
                <a className="cursor-pointer hover:text-black" onClick={() => clearCart()}>Clear all products</a>
                <hr className="border-t-[#888b8d] mb-6 w-full mt-3" />
                <div className="w-full">
                    {cartEmpty ? (
                        <>
                            <p className="p-2 mb-2">Nothing added</p>
                            <Link to="/" className="p-2 mt-3 bg-[#811d2eff] text-[#f3f1f2ff] rounded-md hover:bg-[#f3b61fff]">Buy new items</Link>
                        </>
                    ) : (
                        Zcart.map((product) => {
                            return (
                                <div key={product.id}>
                                    <div className="flex flex-row justify-start items-center bg-white border-[#ddd] border rounded-md p-2 shadow-sm mb-3 transition transform duration-200 hover:translate-y-[-5px] hover:shadow-md">
                                        <img src={`${getImages(product)}`} alt={`Image of ${product.title}`} className="p-3 flex-initial w-auto max-h-44 mr-6 ml-1 rounded" />
                                        <section className="flex flex-col justify-start items-start w-2/3">
                                            <h2 className="text-xl mb-4">{product.title}</h2>
                                            <p className="test-[#555] text-sm p-3">${product.price}</p>
                                            <div className="flex justify-between items-center w-26">
                                                <a className="bg-[#811d2eff] w-8 p-1 rounded-md text-[#f3f1f2ff] cursor-pointer hover:bg-[#f3b61fff]"
                                                    onClick={() => changeQuantity(1, product.id)}
                                                >-</a>
                                                <p className="text-black text-sm p-3">{product.quantity}</p>
                                                <a className="bg-[#811d2eff] w-8 p-1 rounded-md text-[#f3f1f2ff] cursor-pointer hover:bg-[#f3b61fff]"
                                                    onClick={() => changeQuantity(2, product.id)}
                                                >+</a>
                                            </div>
                                            <button
                                                className="p-2 mt-3 bg-[#811d2eff] text-[#f3f1f2ff] hover:bg-[#f3b61fff]"
                                            >
                                                Buy now
                                            </button>
                                        </section>
                                        <button onClick={() => removeFromCart(product.id)} className="p-2 mt-3 rounded-3xl w-10 h-10 bg-[#811d2eff] text-[#f3f1f2ff] hover:bg-[#f3b61fff]">X</button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </section>
        </div>
    );
}

export default ShoppingCart;