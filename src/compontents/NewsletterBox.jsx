import React from 'react'

function NewsletterBox() {

    const onSubmitHandler = (event) =>{
        event.preventDefault();
  
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='mt-3 text-gray-400'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos cupiditate nostrum, placeat earum labore vero?</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border rounded-lg p-3 shadow-md'>
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

    </div>
  )
}

export default NewsletterBox
