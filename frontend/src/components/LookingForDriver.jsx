import React from 'react'
import car from '../assets/images/uber_car.png'

const LookingForDriver = () => {
  return (
    <div className='p-5'>
        <h1 className='text-xl font-medium'>Looking For NearBy Driver</h1>
        <img src={car} className='w-50 mx-auto'/>
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

export default LookingForDriver