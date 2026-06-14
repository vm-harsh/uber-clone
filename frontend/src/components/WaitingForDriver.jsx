import React from 'react'
import car from '../assets/images/uber_car.png'

const WaitingForDriver = () => {
  return (
    <div className='p-5'>
            <div className='flex w-full justify-between items-center my-5'>
                <img className='w-30 h-30 rounded-full' src={car} alt="uber_car" />
                <div className='flex flex-col items-end'>
                    <h1 className='text-sm font-semibold'>Harsh Verma</h1>
                    <h4 className='text-lg font-semibold'>UP 15 DL 3632</h4>
                    <h4 className='font-semibold text-gray-500'>G-Wagon</h4>
                </div>
            </div>
            <div>
                <h4 className='font-medium text-lg text-gray-500'>Destination</h4>
                <p className='text-sm font-semibold'>6 B.N P.A.C R.R.F Rorkee road meerut</p>
            </div>
            <div className='mt-3'>
                <h4 className='font-medium text-lg text-gray-500'>Price</h4>
                <p className='text-sm font-semibold'>{'\u20B9'} 50.45</p>
            </div>
        </div>
  )
}

export default WaitingForDriver