import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

function ProductItem({ id, name, image, price }) {
    const { currency } = useContext(ShopContext);

    // Provide a fallback image if `image` is null or empty
    const productImage = Array.isArray(image) && image.length > 0 ? image[0] : "/fallback-image.jpg"; 

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            {/* Image container */}
            <div className="overflow-hidden">
                <img
                    className="w-full hover:scale-110 transition-transform duration-300 ease-in-out"
                    src={productImage}
                    alt={name || "Product Image"} 
                />
            </div>

            {/* Product details */}
            <p className="pt-3 pb-1 text-sm">{name || "No Name Available"}</p>
            <p className="text-sm font-medium">
                {currency}
                {price || "N/A"}
            </p>
        </Link>
    );
}

export default ProductItem;
