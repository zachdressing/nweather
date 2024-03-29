'use client'

import { foreCall, localCall, weatherCall, reverseCall } from "@/DataServices/DataService";
import { IDay, IForecast, ILocale, IWeather } from "@/Interfaces/Interfaces";
import { TextInput, Button, Popover } from "flowbite-react";
import React, { useEffect, useState } from 'react'

export default function MainPage() {
    const [searchBarVal, setSearchBarVal] = useState<string>("");
    const [searchVal, setSearchVal] = useState<string>("");
    const [location, setLocation] = useState<ILocale>()
    const [weather, setWeather] = useState<IWeather>()
    const [forecast, setForecast] = useState<IForecast>()
    const [latitude, setLatitude] = useState<number>(0)
    const [longitude, setLongitude] = useState<number>(0)
    const [favArr, setFavArr] = useState<Array<string>>([""])
    const [isClient, setIsClient] = useState<boolean>(false)
    const [dropdown, setDropdown] = useState<JSX.Element[]>();
    const [starClasses, setStarClasses] = useState('text-7xl cursor-pointer text-black');
    const [day2, setDay2] = useState<IDay>({ temp_max: 100, temp_min: 0, iconURL: '01d', weather_type: 'Clear' });
    const [day3, setDay3] = useState<IDay>({ temp_max: 100, temp_min: 0, iconURL: '01d', weather_type: 'Clear' });
    const [day4, setDay4] = useState<IDay>({ temp_max: 100, temp_min: 0, iconURL: '01d', weather_type: 'Clear' });
    const [day5, setDay5] = useState<IDay>({ temp_max: 100, temp_min: 0, iconURL: '01d', weather_type: 'Clear' });
    const [day6, setDay6] = useState<IDay>({ temp_max: 100, temp_min: 0, iconURL: '01d', weather_type: 'Clear' });

    const currentDate = new Date();

    useEffect(() => {
        setIsClient(true)
        const success = (position: any) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }
        const errorFunc = () => {
            console.log('no');
        }
        navigator.geolocation.getCurrentPosition(success, errorFunc)
        let favorites = getLS();
        setFavArr(favorites);
        setDropdown(favArr && favArr.map((fav) => {
            return (
                <div key={fav} onClick={() => setSearchVal(fav)} className="cursor-pointer hover:bg-gray-300">
                    {fav}
                </div>)
        }))
    }, [])



    useEffect(() => {
        const APIStuff = async () => {
            if (searchVal != "") {
                let localData = await localCall(searchVal);
                if (localData) {
                    setLatitude(localData[0].lat);
                    setLongitude(localData[0].lon);
                }
            }
        }
        APIStuff();
    }, [searchVal]);

    useEffect(() => {
        const APIStuff2 = async () => {
            if (latitude != 0 && longitude != 0) {
                let weatherData = await weatherCall(latitude, longitude);
                let forecastData = await foreCall(latitude, longitude);
                let locationData = await reverseCall(latitude, longitude);
                setWeather(weatherData);
                setForecast(forecastData)
                dateSplitter(forecastData);
                setLocation(locationData[0]);

            }
        }
        APIStuff2();
    }, [latitude, longitude])

    useEffect(() => {
        handleColorChange(favArr)
    }, [location, favArr]);


    useEffect(() => {
        setDropdown(favArr && favArr.map((fav) => {
            return (
                <div key={fav} onClick={() => setSearchVal(fav)} className="cursor-pointer hover:bg-gray-300">
                    {fav}
                </div>
            )
        }))
    }, [favArr])

    const saveLS = (fav: string) => {
        let favorites = getLS();
        !favorites.includes(fav) ? favorites.push(fav) : removeLS(fav, favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setFavArr(favorites);
    }

    const getLS = () => {
        let lsData = localStorage.getItem('favorites');
        if (lsData === null || lsData === '') {
            return []
        } else {
            let favsArr = JSON.parse(lsData)
            return favsArr;
        }
    }

    const removeLS = (fav: string, favorites: Array<string>) => {
        let namedIndex = favorites.indexOf(fav);
        favorites.splice(namedIndex, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setFavArr(favorites);
    }

    const mostFrequent = (arr: Array<string>, n: number) => {
        let maxcount = 0;
        let element_having_max_freq;
        for (let i = 0; i < n; i++) {
            let count = 0;
            for (let j = 0; j < n; j++) {
                if (arr[i] == arr[j])
                    count++;
            }

            if (count > maxcount) {
                maxcount = count;
                element_having_max_freq = arr[i];
            }
        }
        return element_having_max_freq;
    }


    const dateSplitter = (data: IForecast) => {
        let forecast1Arr = [];
        let forecast1Icon = [];
        let forecast1Weather = [];
        let forecast2Arr = [];
        let forecast2Icon = [];
        let forecast2Weather = [];
        let forecast3Arr = [];
        let forecast3Icon = [];
        let forecast3Weather = [];
        let forecast4Arr = [];
        let forecast4Icon = [];
        let forecast4Weather = [];
        let forecast5Arr = [];
        let forecast5Icon = [];
        let forecast5Weather = [];


        for (let i = 0; i < data.list.length; i++) {
            let unixTime = new Date(data.list[i].dt * 1000)
            if (unixTime.toLocaleDateString('default') === new Date(currentDate.getTime() + 86400000).toLocaleDateString('default')) {
                forecast1Arr.push(data.list[i].main.temp_max)
                forecast1Weather.push(data.list[i].weather[0].main);
                let iconSplit = (data.list[i].weather[0].icon).split('n')[0].split('d');
                forecast1Icon.push(iconSplit[0])
                forecast1Arr.sort()
                let frequentIcon = mostFrequent(forecast1Icon, (forecast1Icon.length - 1))
                let frequentWeather = mostFrequent(forecast1Weather, (forecast1Weather.length - 1))
                setDay2({ temp_max: forecast1Arr[forecast1Arr.length - 1], temp_min: forecast1Arr[0], iconURL: 'https://openweathermap.org/img/wn/' + frequentIcon + 'd.png', weather_type: frequentWeather })
            }
            else if (unixTime.toLocaleDateString('default') === new Date(currentDate.getTime() + 86400000 * 2).toLocaleDateString('default')) {
                forecast2Arr.push(data.list[i].main.temp_max)
                forecast2Arr.sort()
                forecast2Weather.push(data.list[i].weather[0].main);
                let iconSplit = (data.list[i].weather[0].icon).split('n')[0].split('d');
                forecast2Icon.push(iconSplit[0])
                let frequentIcon = mostFrequent(forecast2Icon, (forecast2Icon.length - 1))
                let frequentWeather = mostFrequent(forecast2Weather, (forecast2Weather.length - 1))
                setDay3({ temp_max: forecast2Arr[forecast2Arr.length - 1], temp_min: forecast2Arr[0], iconURL: 'https://openweathermap.org/img/wn/' + frequentIcon + 'd.png', weather_type: frequentWeather })

            }
            else if (unixTime.toLocaleDateString('default') === new Date(currentDate.getTime() + 86400000 * 3).toLocaleDateString('default')) {
                forecast3Arr.push(data.list[i].main.temp_max)
                forecast3Arr.sort()
                forecast3Weather.push(data.list[i].weather[0].main);
                let iconSplit = (data.list[i].weather[0].icon).split('n')[0].split('d');
                forecast3Icon.push(iconSplit[0])
                let frequentIcon = mostFrequent(forecast3Icon, (forecast3Icon.length - 1))
                let frequentWeather = mostFrequent(forecast3Weather, (forecast3Weather.length - 1))
                setDay4({ temp_max: forecast3Arr[forecast3Arr.length - 1], temp_min: forecast3Arr[0], iconURL: 'https://openweathermap.org/img/wn/' + frequentIcon + 'd.png', weather_type: frequentWeather })

            }
            else if (unixTime.toLocaleDateString('default') === new Date(currentDate.getTime() + 86400000 * 4).toLocaleDateString('default')) {
                forecast4Arr.push(data.list[i].main.temp_max)
                forecast4Arr.sort()
                forecast4Weather.push(data.list[i].weather[0].main);
                let iconSplit = (data.list[i].weather[0].icon).split('n')[0].split('d');
                forecast4Icon.push(iconSplit[0])
                let frequentIcon = mostFrequent(forecast4Icon, (forecast4Icon.length - 1))
                let frequentWeather = mostFrequent(forecast4Weather, (forecast4Weather.length - 1))
                setDay5({ temp_max: forecast4Arr[forecast4Arr.length - 1], temp_min: forecast4Arr[0], iconURL: 'https://openweathermap.org/img/wn/' + frequentIcon + 'd.png', weather_type: frequentWeather })

            }
            else if (unixTime.toLocaleDateString('default') === new Date(currentDate.getTime() + 86400000 * 5).toLocaleDateString('default')) {
                forecast5Arr.push(data.list[i].main.temp_max)
                forecast5Arr.sort()
                forecast5Weather.push(data.list[i].weather[0].main);
                let iconSplit = (data.list[i].weather[0].icon).split('n')[0].split('d');
                forecast5Icon.push(iconSplit[0])
                let frequentIcon = mostFrequent(forecast5Icon, (forecast5Icon.length - 1))
                let frequentWeather = mostFrequent(forecast5Weather, (forecast5Weather.length - 1))
                setDay6({ temp_max: forecast5Arr[forecast5Arr.length - 1], temp_min: forecast5Arr[0], iconURL: 'https://openweathermap.org/img/wn/' + frequentIcon + 'd.png', weather_type: frequentWeather })
            }
        }
        console.log(forecast1Icon)
        console.log(forecast1Weather)
    }

    const handleColorChange = async (arr: Array<string>) => {
        let classes;
        let check = location?.name ? location.name : 'skeebidibopdomboddum'
        arr.includes(check) ? classes = 'text-7xl cursor-pointer text-yellow-300' : classes = 'text-7xl cursor-pointer text-black-500';
        setStarClasses(classes);
    };

    return (
        <div className="min-h-screen pt-12">
            <div className='flex w-full px-4 pt-2 justify-center'>
                <div className='flex flex-row-reverse w-2/3 justify-center flex-wrap'>
                    <div className="flex w-1/6 min-w-40 gap-2 m-2">
                        <Popover
                            aria-labelledby="default-popover"
                            content={
                                <div className="w-64 text-lg text-gray-500 dark:text-gray-400">
                                    <div className="flex flex-col justify-center text-center p-4">
                                        <ul id='favList'>
                                            {dropdown}
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
                        <Button onClick={() => { setSearchVal(searchBarVal) }} className='w-full rounded-[17px] border-2 border-black' color="blue">
                            Search
                        </Button>
                    </div>
                    <div className="flex w-3/5 min-w-72 gap-2 m-2">
                        <TextInput className=' w-full border-2 rounded-[17px] border-black' id="lg" type="text" sizing="lg" placeholder="Search..." onChange={(e) => setSearchBarVal(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='flex w-full px-4 py-2 justify-center flex-wrap'>
                <div id="midBack" className='flex flex-col md:flex-row bg-gray-50/[.9] min-h-72 w-2/3 min-w-72 border-2 border-black rounded-[17px]'>
                    <div className="flex items-center justify-center md:flex-col md:justify-between text-center w-full md:w-1/2 text-center p-8 gap-2">
                        <h1 id="locName" className='text-5xl lg:text-6xl'>{isClient ? location && location.state ? location.name + ', ' + location.state : location && location.name + ', ' + location.country : ""}</h1>
                        <p id="star" onClick={() => { saveLS(location!.name), handleColorChange(favArr) }} className={starClasses}>★</p>
                    </div>
                    <div className="flex flex-col justify-between text-center  w-full md:w-1/2 p-8">
                        <div className="flex">
                            <div className="w-1/3 text-2xl text-start">{isClient ? weather && Math.round(weather.main.temp_max) + '°↑' : ""}</div>
                            <div className="w-1/3 text-2xl text-start">{isClient ? <img className="min-w-16 " src={'https://openweathermap.org/img/wn/' + weather?.weather[0].icon + '.png'} alt="icon" /> : ""}</div>
                            <div className="w-1/3 text-lg text-end">{isClient ? currentDate.toLocaleDateString('en-US') : ""}</div>
                        </div>
                        <div className="w-full text-7xl lg:text-9xl text-center">{weather && Math.round(weather.main.temp) + '°'}</div>
                        <div className="flex">
                            <div className="w-1/2 text-2xl text-start">{isClient ? weather && Math.round(weather.main.temp_min) + '°↓' : ""}</div>
                            <div className="w-1/2 text-2xl text-end">{isClient ? currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-full px-4 py-2 justify-center flex-wrap'>
                <div className='flex flex-wrap md:flex-row bg-gray-50/[.9] min-h-96 w-2/3 min-w-72 border-2 border-black rounded-[17px] p-8'>
                    <div className="w-1/3 flex justify-center items-center gap-y-4">
                        <div className="flex flex-col justify-between text-center ">
                            {isClient ? <img className="min-w-16 " src={day2.iconURL} alt="icon" /> : <img alt="icon" />}
                            <p>{isClient ? day2.weather_type : ''}</p>
                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p className='text-4xl'>{isClient ? Math.round(day2.temp_max) + '°' : ""}</p>
                            <p className='text-4xl'>{isClient ? Math.round(day2.temp_min) + '°' : ""}</p>
                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000).toLocaleDateString('en-US') : ""}</p>
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000).toLocaleDateString('default', { weekday: 'long' }) : ""}</p>
                        </div>
                    </div>
                    <div className="w-1/3 flex justify-center items-center gap-y-4">
                        <div className="flex flex-col justify-between text-center ">
                            {isClient ? <img className="min-w-16 " src={day3.iconURL} alt="icon" /> : <img alt="icon" />}
                            <p>{isClient ? day3.weather_type : ''}</p>
                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p className='text-4xl'>{isClient ? Math.round(day3.temp_max) + '°' : ""}</p>
                            <p className='text-4xl'>{isClient ? Math.round(day3.temp_min) + '°' : ""}</p>
                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000 * 2).toLocaleDateString('en-US') : ""}</p>
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000 * 2).toLocaleDateString('default', { weekday: 'long' }) : ""}</p>
                        </div>
                    </div>
                    <div className="w-1/3 flex justify-center items-center gap-y-4">
                        <div className="flex flex-col justify-between text-center ">
                            {isClient ? <img className="min-w-16 " src={day4.iconURL} alt="icon" /> : <img alt="icon" />}
                            <p>{isClient ? day4.weather_type : ''}</p>
                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p className='text-4xl'>{isClient ? Math.round(day4.temp_max) + '°' : ""}</p>
                            <p className='text-4xl'>{isClient ? Math.round(day4.temp_min) + '°' : ""}</p>
                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000 * 3).toLocaleDateString('en-US') : ""}</p>
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000 * 3).toLocaleDateString('default', { weekday: 'long' }) : ""}</p>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center items-center gap-y-4">
                        <div className="flex flex-col justify-between text-center ">
                            {isClient ? <img className="min-w-16 " src={day5.iconURL} alt="icon" /> : <img alt="icon" />}
                            <p>{isClient ? day5.weather_type : ''}</p>

                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p className='text-4xl'>{isClient ? Math.round(day5.temp_max) + '°' : ""}</p>
                            <p className='text-4xl'>{isClient ? Math.round(day5.temp_min) + '°' : ""}</p>
                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000 * 4).toLocaleDateString('en-US') : ""}</p>
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000 * 4).toLocaleDateString('default', { weekday: 'long' }) : ""}</p>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center items-center gap-y-4">
                        <div className="flex flex-col justify-between text-center ">
                            {isClient ? <img className="min-w-16 " src={day6.iconURL} alt="icon" /> : <img alt="icon" />}
                            <p>{isClient ? day6.weather_type : ''}</p>
                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p className='text-4xl'>{isClient ? Math.round(day6.temp_max) + '°' : ""}</p>
                            <p className='text-4xl'>{isClient ? Math.round(day6.temp_min) + '°' : ""}</p>
                        </div>
                        <div className="flex flex-col justify-between text-center ">
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000 * 5).toLocaleDateString('en-US') : ""}</p>
                            <p>{isClient ? new Date(currentDate.getTime() + 86400000 * 5).toLocaleDateString('default', { weekday: 'long' }) : ""}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
