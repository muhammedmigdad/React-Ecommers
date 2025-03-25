import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

function ProductItem({ id, name, image, price }) {
    const { currency } = useContext(ShopContext);


    // Handle image: expect a string (from backend's mainimage), fallback if invalid
    const productImage = image && typeof image === 'string' ? image : '/fallback-image.jpg';

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            {/* Image container */}
            <div className="overflow-hidden">
                <img
                    className="w-full hover:scale-110 rounded-lg transition-transform duration-300 ease-in-out"
                    src={productImage}
                    alt={name || "Product Image"} 
                />
            </div>

            {/* Product details */}
            <p className="pt-3 text-black pb-1 text-xl">{name || "No Name Available"}</p>
            <p className=" text-gray-500 text-xl font-medium">
                {currency}
                {price || "N/A"}
            </p>
        </Link>
    );
}

export default ProductItem;