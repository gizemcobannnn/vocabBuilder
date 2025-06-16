import React from 'react'
import book from '../assets/book.svg'
import { createPortal } from 'react-dom'
export default function Welldone({closeModal}) {
  return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <button type="button" onClick={closeModal} className='text-white'>X</button>
      <div className='relative flex flex-col items-center justify-start w-full h-100 bg-[#85AA9F] rounded-3xl p-10'>
        <h1 className='text-2xl text-white font-semibold mb-6'>Well done</h1>
        <div className='grid grid-cols-2 gap-5 w-full'>
            <div className='flex flex-col items-center justify-center '>
                <h2 className='text-white'>Correct answers</h2>
                <ul className='flex flex-col gap-1'></ul>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <h2 className='text-white '>Mistakes</h2>
                <ul className='flex flex-col gap-1'></ul>
            </div>
        </div>
        <div className='absolute bottom-5 right-0'><img src={book} alt="book" /></div>
    </div>
    </div>
    ,document.body
  )
}
