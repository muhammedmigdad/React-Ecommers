import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faEnvelope, faPaperPlane);

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delayChildren: 0.3, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeIn' } },
};

const titleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const inputVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0 },
};

const buttonVariants = {
  hidden: { opacity: 0, x: 15 },
  visible: { opacity: 1, x: 0 },
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};

const privacyVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function NewsletterBox() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Add your subscription logic here
    alert('Thank you for subscribing!');
  };

  return (
    <motion.div
      className='bg-black py-16 px-8 rounded-xl shadow-xl text-center text-white' // Changed background and text color
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      exit='exit'
      viewport={{ once: true }}
    >
      <div className='max-w-md mx-auto'>
        <motion.h2
          className='text-3xl font-extrabold text-white mb-4' // Changed text color
          variants={titleVariants}
        >
          <FontAwesomeIcon icon={faEnvelope} className='mr-2' />
          Stay Updated
        </motion.h2>
        <motion.p
          className='text-lg text-gray-300 mb-6' // Adjusted text color for better contrast
          variants={descriptionVariants}
        >
          Don't miss out on our latest news, exclusive offers, and exciting updates.
          Subscribe to our newsletter today!
        </motion.p>
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col sm:flex-row items-center justify-center gap-3'
        >
          <motion.input
            type='email'
            placeholder='Your Email'
            className='w-full sm:w-auto flex-grow py-3 px-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-300' // Adjusted input styles for dark background
            required
            variants={inputVariants}
          />
          <motion.button
            type='submit'
            className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300'
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
          >
            Subscribe
            <FontAwesomeIcon icon={faPaperPlane} className='ml-2' />
          </motion.button>
        </form>
        <motion.p
          className='mt-4 text-sm text-gray-500' // Adjusted text color for better contrast
          variants={privacyVariants}
        >
          Your email is safe with us.
        </motion.p>
      </div>
    </motion.div>
  );
}

export default NewsletterBox;