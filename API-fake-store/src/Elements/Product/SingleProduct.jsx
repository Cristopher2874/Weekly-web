import { useParams } from 'react-router-dom';
import { useProductStore } from '@/ZustandStore/data.store';
import { useStore } from "@/ZustandStore/store";

const SingleProduct = () => {
    const addItem = useStore((state) => state.addItem);
    const { id } = useParams();
    const data = useProductStore((state) => state.data);
    const item = data.find(item => item.id === parseInt(id, 10));

    function getImages(product) {
        const response = product.images[0];
        try {
            const data = JSON.parse(response);
            return data[0];
        } catch {
            return response;
        }
    }

    const handleAddToCart = (product) => {
        addItem(product);
    };


    if (!item) return <div className='text-black'>loading...</div>;

    return (
        <section className="text-black 
            bg-white 
            border-[#ddd] 
            border 
            rounded-md 
            p-5
            w-4/5
            h-auto
            m-3
            shadow-sm 
            cursor-pointer 
            flex flex-row items-center justify-around
            transition transform duration-200 
            hover:translate-y-[-5px] 
        hover:shadow-md" >
            <img src={`${getImages(item)}`} alt={`Image of ${item.title}`} className="p-3 max-h-80 w-auto" />
            <div className='w-3/4 p-3 m-3'>
                <h2 className="text-xl mb-4">{item.title}</h2>
                <hr />
                <p className="text-[#555] text-sm p-3"> Price: ${item.price}</p>
                <hr />
                <p className="text-[#555] text-sm p-3 text-justify">{item.description}</p>
                <p className="text-[#555] text-sm p-3">Category: {item.category.name}</p>
            </div>
            <button
                className="p-2 mt-3 bg-[#811d2eff] text-[#f3f1f2ff] hover:bg-[#f3b61fff] max-h-14 w-1/3 rounded-md"
                onClick={() => handleAddToCart(item)}
            >
                Add to cart
            </button>
        </section >
    );
};

export default SingleProduct;