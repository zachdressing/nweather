export const weatherCall = async (latitude:number, longitude:number, apiKey: string | undefined) => {
    const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
    const weatherData = await weatherPromise.json();
    return weatherData;
}

export const foreCall = async (latitude:number, longitude:number, apiKey: string | undefined) => {
    const forecastPromise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
    const forecastData = await forecastPromise.json();
    return forecastData;
}

export const localCall = async (searchVal:string, apiKey: string | undefined) =>{
    const localSearch = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchVal}&limit=5&appid=${apiKey}`);
        const localData = await localSearch.json();
        return localData;
}

export const reverseCall = async (latitude:number, longitude:number, apiKey: string | undefined) =>{
    const locationPromise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`)
    const locationData = await locationPromise.json();
    return locationData;
}