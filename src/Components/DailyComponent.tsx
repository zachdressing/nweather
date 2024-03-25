"use client"
import React from 'react'

const DailyComponent = () => {
    return (
        <div className='flex w-full px-4 py-2 justify-center flex-wrap'>
            <div className='flex flex-col md:flex-row bg-gray-50 min-h-72 w-2/3 min-w-72 border-2 border-black rounded-[17px] flex-wrap'>
                <div className="flex items-center justify-center md:flex-col md:justify-between w-full md:w-1/2 text-center p-8 flex-wrap gap-2">
                    <h1 className='text-5xl lg:text-6xl'>Stockton, CA</h1>
                    <p className='text-7xl text-red-500'>♥</p>
                </div>
                <div className="flex flex-col justify-between w-full md:w-1/2 p-8 flex-wrap">
                    <div className="flex">
                        <div className="w-1/2 text-xl">^84</div>
                        <div className="w-1/2 text-xl text-end">3/25/24</div>
                    </div>
                    <div className="w-full text-7xl lg:text-9xl text-center">80°</div>
                    <div className="flex">
                        <div className="w-1/2 text-xl">v56</div>
                        <div className="w-1/2 text-xl text-end">7:30 AM</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DailyComponent
