'use client'

import { TextInput, Button, Popover } from "flowbite-react";
import React, { useEffect, useState } from 'react'

export default function MainPage() {


  //Set the data from the API Calls into the spots on the page
  const [searchVal, setSearchVal] = useState<String>("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const apiKey = '85f5ee4cb9ec8763732f475eee4bf5af';
  let lat: number;
  let lon: number;


  const errorFunc = () => {
    console.log('no')
  }

  useEffect(() => {
    // Update the document title using the browser API
    //
    navigator.geolocation.getCurrentPosition(success,errorFunc)

  }, []);

  const success = async (position: Iposition) => {
    if (searchVal) {
      const citySearch = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchVal}&limit=5&appid=${apiKey}`);
      const cityName = await citySearch.json();
      lat = cityName[0].lat;
      lon = cityName[0].lon;
      console.log(cityName);
    }
    /*
    else if (liValue) {
        const citySearch = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${liValue}&limit=5&appid=${apiKey}`);
        const cityName = await citySearch.json();
        lat = cityName[0].lat;
        lon = cityName[0].lon;
    }*/
    else {
      //set lat and lon to coords
      lat = position.coords.latitude
      lon = position.coords.longitude
    }

    //Current Weather API
    const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    const weatherData = await weatherPromise.json()

    //Forecast Weather API
    const forecastPromise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    const forecastData = await forecastPromise.json();

    //fetch the API for Reverse Geolocation
    const locationPromise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`)
    const locationData = await locationPromise.json();
    console.log(weatherData, forecastData, locationData)
  }
  return (
    <div className="bg-Light dark:bg-Dark min-h-screen pt-12">
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
            <Button onClick={()=>{success()}} className='w-full rounded-[17px] border-2 border-black' color="blue">
              Search
            </Button>
          </div>
          <div className="flex w-3/5 min-w-72 gap-4 m-2">
            <TextInput className=' w-full border-2 rounded-[17px] border-black' id="lg" type="text" sizing="lg" placeholder="Search..." onChange={(e) => setSearchVal(e.target.value)} />
          </div>
        </div>
      </div>
      <div className='flex w-full px-4 py-2 justify-center flex-wrap'>
        <div className='flex flex-col md:flex-row bg-gray-50 min-h-72 w-2/3 min-w-72 border-2 border-black rounded-[17px]'>
          <div className="flex items-center justify-center md:flex-col md:justify-between w-full md:w-1/2 text-center p-8 gap-2">
            <h1 className='text-5xl lg:text-6xl'>{}</h1>
            <a><p className='text-7xl text-red-500 cursor-pointer'>♥</p></a>
          </div>
          <div className="flex flex-col justify-between w-full md:w-1/2 p-8">
            <div className="flex">
              <div className="w-1/2 text-2xl">^84</div>
              <div className="w-1/2 text-lg text-end">{currentDate.toLocaleDateString('en-US')}</div>
            </div>
            <div className="w-full text-7xl lg:text-9xl text-center">80°</div>
            <div className="flex">
              <div className="w-1/2 text-2xl">v56</div>
              <div className="w-1/2 text-2xl text-end">{currentDate.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full px-4 py-2 justify-center flex-wrap'>
        <div className='flex flex-wrap md:flex-row bg-gray-50 min-h-96 w-2/3 min-w-72 border-2 border-black rounded-[17px] p-8'>
          <div className="w-1/3 flex justify-center items-center gap-4">
            <div className="flex flex-col justify-between">
              <p className='text-4xl'>^80*</p>
              <p className='text-4xl'>v80*</p>
            </div>
            <div className="flex flex-col gap-4">
              <p>{new Date(currentDate.getTime() + 86400000).toLocaleDateString('en-US')}</p>
              <p>{new Date(currentDate.getTime() + 86400000).toLocaleDateString('default', { weekday: 'long' })}</p>
            </div>
          </div>
          <div className="w-1/3 flex justify-center items-center gap-4">
            <div className="flex flex-col justify-between">
              <p className='text-4xl'>^80*</p>
              <p className='text-4xl'>v80*</p>
            </div>
            <div className="flex flex-col gap-4">
            <p>{new Date(currentDate.getTime() + 86400000*2).toLocaleDateString('en-US')}</p>
              <p>{new Date(currentDate.getTime() + 86400000*2).toLocaleDateString('default', { weekday: 'long' })}</p>
            </div>
          </div>
          <div className="w-1/3 flex justify-center items-center gap-4">
            <div className="flex flex-col justify-between">
              <p className='text-4xl'>^80*</p>
              <p className='text-4xl'>v80*</p>
            </div>
            <div className="flex flex-col gap-4">
            <p>{new Date(currentDate.getTime() + 86400000*3).toLocaleDateString('en-US')}</p>
              <p>{new Date(currentDate.getTime() + 86400000*3).toLocaleDateString('default', { weekday: 'long' })}</p>
            </div>
          </div>
          <div className="w-1/3 flex justify-center items-center gap-4">
            <div className="flex flex-col justify-between">
              <p className='text-4xl'>^80*</p>
              <p className='text-4xl'>v80*</p>
            </div>
            <div className="flex flex-col gap-4">
            <p>{new Date(currentDate.getTime() + 86400000*4).toLocaleDateString('en-US')}</p>
              <p>{new Date(currentDate.getTime() + 86400000*4).toLocaleDateString('default', { weekday: 'long' })}</p>
            </div>
          </div>
          <div className="w-1/3 flex justify-center items-center gap-4">
            <div className="flex flex-col justify-between">
              <p className='text-4xl'>^80*</p>
              <p className='text-4xl'>v80*</p>
            </div>
            <div className="flex flex-col gap-4">
            <p>{new Date(currentDate.getTime() + 86400000*5).toLocaleDateString('en-US')}</p>
              <p>{new Date(currentDate.getTime() + 86400000*5).toLocaleDateString('default', { weekday: 'long' })}</p>
            </div>
          </div>
          <div className="w-1/3 flex justify-center items-center gap-4">
            <div className="flex flex-col justify-between">
              <p className='text-4xl'>^80*</p>
              <p className='text-4xl'>v80*</p>
            </div>
            <div className="flex flex-col gap-4">
            <p>{new Date(currentDate.getTime() + 86400000*6).toLocaleDateString('en-US')}</p>
              <p>{new Date(currentDate.getTime() + 86400000*6).toLocaleDateString('default', { weekday: 'long' })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
