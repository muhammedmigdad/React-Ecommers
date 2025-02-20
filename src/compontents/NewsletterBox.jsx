import React from 'react';
import { motion } from 'framer-motion';

function NewsletterBox() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <motion.div 
      className='text-center'
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 50 }} // Disappears when scrolled back up
      transition={{ duration: 0.8, ease: "easeOut" }} 
      viewport={{ once: false }} // Runs animation every time it enters the viewport
    >
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='mt-3 text-gray-400'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos cupiditate nostrum, placeat earum labore vero?
      </p>
      <form 
        onSubmit={onSubmitHandler} 
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border rounded-lg p-3 shadow-md'
      >
        <input
          placeholder='Enter your email'
          type='email'
          className='w-full sm:flex-1 outline-none p-2 border rounded-l-lg focus:ring-2 focus:ring-black'
          required
        />
        <button
          className='bg-black text-white text-xs sm:text-sm px-8 py-3 rounded-r-lg hover:bg-gray-800 transition-colors duration-300'
          type='submit'
        >
          SUBSCRIBE
        </button>
      </form>
    </motion.div>
  );
}

export default NewsletterBox;

