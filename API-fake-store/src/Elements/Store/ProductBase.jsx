import { useStore } from "@/ZustandStore/store";
import { useProductStore } from "@/ZustandStore/data.store";
import { Link } from "react-router-dom";

const ProductBase = () => {
    const addItem = useStore((state) => state.addItem);
    const Zdata = useProductStore(state => state.data);
    const Zcategory = useProductStore(state => state.category);
    const ZsearchTerm = useProductStore(state => state.searchTerm);

    function getImages(product) {
        const response = product.images[0];
        try {
            const data = JSON.parse(response);
            return data[0];
        } catch {
            return response;
        }
    }

    const filteredProducts = Zdata.filter(product =>
        product.title.toLowerCase().includes(ZsearchTerm.toLowerCase()) &&
        (Zcategory === '' || product.category.name === Zcategory)
    )

    const handleAddToCart = (product) => {
        addItem(product);
    };

    return (
        <div className="flex flex-row p-5 items-start bg-[#f3f1f2ff] min-h-full text-black overflow-auto
            box-border w-4/5 justify-center
        ">
            <section className="flex">
                <div className="flex flex-wrap gap-5 justify-start items-start mx-0 my-auto max-w-full box-border">
                    {filteredProducts.map((product) => (
                        <div className="text-black bg-white border-[#ddd] border rounded-md p-5 w-64 shadow-sm cursor-pointer transition transform duration-200 hover:translate-y-[-5px] hover:shadow-md">
                            <Link to={`/product/${product.id}`} className="flex flex-col" key={product.id}>
                                <img src={`${getImages(product)}`} alt={`Image of ${product.title}`} className="p-3" />
                                <h2 className="text-black text-xl mb-4">{product.title}</h2>
                                <p className="text-[#555] text-sm p-3">{product.description}</p>
                                <p className="text-[#555] text-sm p-3">${product.price}</p>
                                <p className="text-[#555] text-sm p-3">Category: {product.category.name}</p>
                            </Link>
                            <button
                                className="p-2 mt-3 bg-[#811d2eff] text-[#f3f1f2ff] hover:bg-[#f3b61fff]"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductBase;