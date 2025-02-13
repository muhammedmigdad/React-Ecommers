import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

function Product() {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]); // Set the first image as default
      }
    };

    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* .............Product Data ...................*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*........... Product Images.................... */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img onClick={()=>setImage(item)}
                key={index} // Use the image URL as the key
                src={item}
                alt=''
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
            <div className='w-full sm:w-{80%'>
              <img className='w-full h-auto'  src={image}  alt="" />
            </div>
        </div>
        {/* .............product info ...................*/}
        <div className='flex-1'>
          <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
          <div className='gap-1 mt-2 flex items-center'>
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-2 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col my-8 gap-4'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button className={`border py-2 px-4 bg-gray-100`} key={index}>{item}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;