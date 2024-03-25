"use client"
import React from 'react'

const DailyComponent = () => {
    return (
        <div className='flex w-full px-4 py-2 justify-center'>
            <div className='flex bg-gray-50 min-h-72 w-2/3 min-w-72 border-2 border-black rounded-[17px]'>
                <div className="flex md:flex-col md:justify-between w-1/2 h-full text-center p-8 flex-wrap">
                    <h1 className='text-6xl'>Stockton, CA</h1>
                    <img alt='favorite heart' />
                </div>
                <div className="flex flex-col justify-between text-center w-1/2 p-8">
                    <div className="flex">
                        <div className="w-1/2 text-xl">^84</div>
                        <div className="w-1/2 text-xl">3/25/24</div>
                    </div>
                    <div className="w-full text-9xl">80°</div>
                    <div className="flex">
                        <div className="w-1/2 text-xl">v56</div>
                        <div className="w-1/2 text-xl">7:30 AM</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DailyComponent
