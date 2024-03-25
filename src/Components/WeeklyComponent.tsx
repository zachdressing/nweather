"use client"
import React from 'react'

const WeeklyComponent = () => {
    return (
        <div className='flex w-full px-4 py-2 justify-center flex-wrap'>
            <div className='flex flex-wrap md:flex-row bg-gray-50 min-h-96 w-2/3 min-w-72 border-2 border-black rounded-[17px] p-8'>
                <div className="w-1/3 flex justify-center items-center gap-4">
                    <div className="flex flex-col justify-between">
                        <p className='text-4xl'>^80*</p>
                        <p className='text-4xl'>v80*</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>3/26/24</p>
                        <p>tuesday</p>
                    </div>
                </div>
                <div className="w-1/3 flex justify-center items-center gap-4">
                    <div className="flex flex-col justify-between">
                        <p className='text-4xl'>^80*</p>
                        <p className='text-4xl'>v80*</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>3/26/24</p>
                        <p>wednesday</p>
                    </div>
                </div>
                <div className="w-1/3 flex justify-center items-center gap-4">
                    <div className="flex flex-col justify-between">
                        <p className='text-4xl'>^80*</p>
                        <p className='text-4xl'>v80*</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>3/26/24</p>
                        <p>thursday</p>
                    </div>
                </div>
                <div className="w-1/3 flex justify-center items-center gap-4">
                    <div className="flex flex-col justify-between">
                        <p className='text-4xl'>^80*</p>
                        <p className='text-4xl'>v80*</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>3/26/24</p>
                        <p>friday</p>
                    </div>
                </div>
                <div className="w-1/3 flex justify-center items-center gap-4">
                    <div className="flex flex-col justify-between">
                        <p className='text-4xl'>^80*</p>
                        <p className='text-4xl'>v80*</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>3/26/24</p>
                        <p>saturday</p>
                    </div>
                </div>
                <div className="w-1/3 flex justify-center items-center gap-4">
                    <div className="flex flex-col justify-between">
                        <p className='text-4xl'>^80*</p>
                        <p className='text-4xl'>v80*</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>3/26/24</p>
                        <p>sunday</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeeklyComponent
