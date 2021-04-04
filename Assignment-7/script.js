const searchedCity = document.getElementById("searchedCity")
const city = document.querySelector(".city")
const time = document.querySelector(".time")
const temperature = document.querySelector(".temperature")
const weather = document.querySelector(".weather")
const min_max_temp = document.querySelector(".min_max_temp")
const loading = document.querySelector(".loading")
const err_msg = document.querySelector(".err_msg")
const API_key = config.api_key

let load = false;


// ipinfo api will be called when website will load and
// will call the callWeather fnction with user's city name as arguments
window.onload = async function(){
    const request = await fetch("https://ipinfo.io/json?token=16576546ce1744")
    const json = await request.json()
    callWeather(json.city)
}

// will call the callWeather function if enter key is pressed and no api call is being executing
searchedCity.onkeypress = async function(e){
    if(e.keyCode === 13 && !load){
        let city = searchedCity.value;
        callWeather(city)
    }
}


// callWeather function which will call asynchronous getWeatherStatus function with the argument city name
// and it will handel the promises and errors that the function returns
function callWeather(city){
    getWeatherStatus(city)
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            err_msg.classList.toggle("hide")
            err_msg.innerHTML = `${err.message} <span class="times">&times;</span>`
        })
}


// an asynchronous function which will call the openweathermap api with the city name parameter and an unique api key
// it will handel resolve or rejections from the api call and will return accordingly
async function getWeatherStatus(city_name){
    load = true
    loading.classList.toggle("hide")
    err_msg.classList.add("hide")
    const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_key}`)
    const data = await request.json()
    load = false
    loading.classList.toggle("hide")
    if(request.ok){
        city.innerHTML = `<span>${data.name}</span>, <span>${data.sys.country}</span>`
        time.innerHTML = `${timeConverter(data.dt)}`
        temperature.innerHTML = `${data.main.temp} &degC`
        weather.innerHTML = `<i>${data.weather[0].main}</i>`
        min_max_temp.innerHTML = `<span>${data.main.temp_min} &degC</span> / <span>${data.main.temp_max} &degC</span>`
        return data
    }
    else{
        throw new Error(data.message)
    }
}


// a function for making UNIX timestamp to a relatable date and time format
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var day = a.toLocaleDateString("en-US", { weekday: 'long' });
    var year = a.getFullYear();
    var month = a.toLocaleDateString("en-US", { month: 'long' });
    var date = a.getDate();
    var time = day + ', ' + date + ' ' + month + ' ' + year;
    return time;
}


// this event listener will toggle the err message with the help of event delegation
err_msg.addEventListener("click", function(e){
    if(e.target.className === "times"){
        err_msg.classList.toggle("hide")
    }
})
