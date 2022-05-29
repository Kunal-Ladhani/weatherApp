// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const api_key = `7e6067ea0aa872491fddff71912d1541`;

document.getElementById("checkWeather").addEventListener('click',getWeather); 

async function getWeather(lat,lon) {
    let city = document.getElementById("city").value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    // using city name

    let path = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    // using latitude and longitude

    // this is called string interpolation in template literal
    // Automatic replacing of variables with real values is called string interpolation.
    // you can substitute variables and expressions

    console.log(path);

    let weatherObject = await fetch(url);
    let weatherData = await weatherObject.json();
    
    appendToDOM(weatherData);
}

function appendToDOM(data) {
    let container = document.getElementById("container");
    container.innerHTML = null;

    let div = document.createElement("div");
        
    let city = document.createElement("h3");
    city.innerText = `Weather in ${data.name}`;

    let temp = document.createElement("p");
    temp.innerText = "Temp : " + (Number(data.main.temp) - 273.15).toPrecision(4) + " °C";

    let max_temp = document.createElement("p");
    max_temp.innerText = "Max Temp : " + (Number(data.main.temp_max) - 273.15).toPrecision(4) + " °C";

    let min_temp = document.createElement("p");
    min_temp.innerText = "Min Temp : " + (Number(data.main.temp_min) - 273.15).toPrecision(4) + " °C";

    let feels_like = document.createElement("p");
    feels_like.innerText = "Feels like : " + (Number(data.main.feels_like) - 273.15).toPrecision(4) + " °C";

    let pressure = document.createElement("p");
    pressure.innerText = "Pressure : " + data.main.pressure + " hPa"; 

    div.append(city,temp,max_temp,min_temp,feels_like,pressure);
    container.append(div);

    let iframe = document.getElementById("gmap_canvas");
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(currPosition);

    function currPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getWeather(latitude,longitude);
        getTimeAPI(latitude,longitude);
    }
}

function getTime() {
    let date = new Date();
    // date is of type object

    // date
    console.log(`date : ${date.getDate()}`);

    // day
    console.log(`day : ${date.getDay()}`);
    /*
        0 - Sun 
        1 - Mon
        2 - Tue
        3 - Wed
        4 - Thurs
        5 - Fri
        6 - Sat 
    */

    // month
    console.log(`month : ${date.getMonth()}`);
    /*
        0 - Jan
        1 - Feb
        2 - Mar
        3 - Apr
        4 - May
        5 - June
        6 - July
        7 - Aug
        8 - Sept
        9 - Oct
        10 - Nov
        11 - Dec
    */

    // year
    console.log(`Year : ${date.getFullYear()}`);

    // hours
    console.log(`Hours : ${date.getHours()}`);

    // Minutes
    console.log(`Minutes : ${date.getMinutes()}`);

    // Seconds
    console.log(`Seconds : ${date.getSeconds()}`);

    // Milliseconds
    console.log(`Milliseconds : ${date.getMilliseconds()}`);

}

async function getTimeAPI(lat,lon) {
    let time_url = `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`;

    // let time_data = await fetch(time_url);
    
    let timeData = await fetch(time_url);
    console.log(timeData);
    
    let time = timeData.json();
    console.log(time); 

}
getLocationWeather();