import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const policyItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

function OurPolicy() {
  return (
    <motion.div
      className='py-16 bg-gray-900 rounded-lg my-10 shadow-md mx-auto max-w-6xl px-6 sm:px-12'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
        <motion.div
          variants={policyItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          whileHover="hover"
          whileTap="tap"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <img src={assets.exchange_icon} className='w-10 h-10 text-blue-500' alt="Easy Exchange" />
          </div>
          <h3 className='font-semibold text-lg text-blue-700 mb-2'>Easy Exchange Policy</h3>
          <p className='text-gray-600 text-sm md:text-base'>Experience hassle-free exchanges with our straightforward policy.</p>
        </motion.div>

        <motion.div
          variants={policyItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          whileHover="hover"
          whileTap="tap"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <img src={assets.quality_icon} className='w-10 h-10 text-green-500' alt="7 Days Return" />
          </div>
          <h3 className='font-semibold text-lg text-green-700 mb-2'>7 Days Return Policy</h3>
          <p className='text-gray-600 text-sm md:text-base'>Enjoy peace of mind with our 7-day free return guarantee.</p>
        </motion.div>

        <motion.div
          variants={policyItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          whileHover="hover"
          whileTap="tap"
          className="flex flex-col items-center  p-6 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <img src={assets.support_img} className='w-10 h-10 text-indigo-500' alt="Customer Support" />
          </div>
          <h3 className='font-semibold text-lg text-indigo-700 mb-2'>Best Customer Support</h3>
          <p className='text-gray-600 text-sm md:text-base'>Our dedicated support team is available 24/7 to assist you.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default OurPolicy;