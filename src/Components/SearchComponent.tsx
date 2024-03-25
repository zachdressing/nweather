"use client";

import React from 'react'
import { TextInput, Button, Popover } from "flowbite-react";



const SearchComponent = () => {
    return (
        <div className='flex w-full px-4 pt-2 justify-center'>
            <div className='flex flex-row-reverse w-2/3 justify-center flex-wrap'>
                <div className="flex w-1/6 min-w-40 gap-2 m-2">
                    <Popover
                        aria-labelledby="default-popover"
                        content={
                            <div className="w-64 text-lg text-gray-500 dark:text-gray-400">
                                <div className="flex flex-col justify-center text-center p-4">
                                    <ul id='favorites'>
                                        <li>Stockton, CA</li>
                                    </ul>
                                </div>
                            </div>
                        }
                    >
                        <Button className='w-full rounded-[17px] border-2 border-black' color="warning">
                            Favorites
                        </Button>
                    </Popover>

                </div>
                <div className="flex w-1/6 min-w-40 gap-2 m-2">
                    <Button className='w-full rounded-[17px] border-2 border-black' color="blue">
                        Search
                    </Button>
                </div>
                <div className="flex w-3/5 min-w-72 gap-4 m-2">
                    <TextInput className=' w-full border-2 rounded-[17px] border-black' id="lg" type="text" sizing="lg" placeholder="Search..." />
                </div>
            </div>
        </div>
    )
}

export default SearchComponent
