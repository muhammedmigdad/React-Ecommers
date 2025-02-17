import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

function ProductItem({id,name,image,price}) {

    const {currency} = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
    {/* Image container */}
    <div className="overflow-hidden">
        <img
        className="w-full hover:scale-110 transition-transform duration-300 ease-in-out"
        src={image[0]}
        alt={name} 
        />
    </div>

    {/* Product details */}
    <p className="pt-3 pb-1 text-sm">{name}</p>
    <p className="text-sm font-medium">
        {currency}
        {price}
    </p>
    </Link>
  )
}

export default ProductItem
