import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../compontents/RelatedProducts';

function Product() {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [sizes, setSizes] = useState('')

  useEffect(() => {
    if (products && products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image?.[0]); // Ensure image array exists
      }
    }
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
            {Array.isArray(productData.image) && productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt="Product"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          {/* Main Image */}
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="Selected Product" />
          </div>
        </div>
        {/* .............product info ...................*/}
        <div className='flex-1'>
          <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
          <div className='gap-1 mt-2 flex items-center'>
            <img className='w-3.5' src={assets.star_icon} alt="star" />
            <img className='w-3.5' src={assets.star_icon} alt="star" />
            <img className='w-3.5' src={assets.star_icon} alt="star" />
            <img className='w-3.5' src={assets.star_icon} alt="star" />
            <img className='w-3.5' src={assets.star_dull_icon} alt="star dull" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-2 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col my-8 gap-4'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={()=>setSizes(item)} className={`border py-2 px-4 bg-gray-100 ${item === sizes ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button className='bg-black text-white py-3 px-8 text-sm active:bg-gray-700 rounded-lg'>ADD TO CART</button>
          <hr className='sm:w-4/5 mt-8' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Orginal Products.</p>
            <p>Cash on delevery is available on this products.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/*............. Product Reviews ...................*/}
      <div className='mt-20'>
        <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Review (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Fashion e-commerce websites offer trendy apparel, accessories, and footwear with seamless shopping experiences. They provide secure payments, fast shipping, and personalized recommendations. Stylish collections cater to diverse tastes, ensuring customer satisfaction.</p>
          <p>A fashion e-commerce website offers stylish clothing, accessories, and footwear with easy navigation, secure checkout, and fast delivery. It provides the latest trends, exclusive deals, and a seamless shopping experience.</p>
        </div>
      </div>
      {/*............. display related products...................*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  );
}

export default Product;
