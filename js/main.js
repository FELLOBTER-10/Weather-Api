"use strict"
// lets for today
let location_city = document.getElementById("location_city")
let temp = document.getElementById("temp")
let imgToday = document.getElementById("imgToday")
let textTody = document.getElementById("textTody")
let humidity = document.getElementById("humidity")
let imgeHumidity = document.getElementById("imgeHumidity")
let wind_kph = document.getElementById("wind_kph")
let wind_dir = document.getElementById("wind_dir")
let NameToDay = document.getElementById('NameToDay')
let NumberDay = document.getElementById("NumberDay")
let ToDayMonth = document.getElementById("ToDayMonth")
/***************************************************/
// lets for next days
let maxtemp_c = document.getElementsByClassName("maxtemp_c")
let mintemp_c = document.getElementsByClassName('mintemp_c')
let imgforcast = document.getElementsByClassName('imgforcast')
let TextForecast = document.getElementsByClassName('TextForecast')
let NextDays = document.getElementsByClassName('NextDays')
/***************************************************/
// input search
let InputSearch = document.getElementById("InputSearch")
/***************************************************/
// let getDate
let date = new Date()
// function getApi
async function getData(x) {
    let respons = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ab8495c991bc4dbcbd9184710243101&q=${x}&days=3`)
    let DataWether = await respons.json()
    // console.log(DataWether);
    return DataWether

}
getData()


/* function display today data */
function displayTodayData(data) {
    location_city.innerHTML = data.location.name
    temp.innerHTML = data.current.temp_c + " C"
    imgToday.setAttribute("src", data.current.condition.icon)
    textTody.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind_kph.innerHTML = data.current.wind_kph + "km/h"
    wind_dir.innerHTML = data.current.wind_dir
    NameToDay.innerHTML = date.toLocaleDateString("en-US", { weekday: 'long' })
    NumberDay.innerHTML = date.getDate()
    ToDayMonth.innerHTML = date.toLocaleDateString("en-US", { month: 'long' })
}
/* function display next days data */
function displayNextDay(data) {
    let forecast = data.forecast.forecastday
    // console.log(forecast);
    for (let i = 0; i < 2; i++) {
        let Days = new Date(forecast[i + 1].date)
        maxtemp_c[i].innerHTML = forecast[i + 1].day.maxtemp_c + " C"
        mintemp_c[i].innerHTML = forecast[i + 1].day.mintemp_c + " C"
        imgforcast[i].setAttribute("src", forecast[i + 1].day.condition.icon)
        TextForecast[i].innerHTML = forecast[i + 1].day.condition.text
        NextDays[i].innerHTML = Days.toLocaleDateString("en-US", { weekday: "long" })
    }
}
/***************************/
// Alert massege
let erorrMessage = document.getElementById('erorrMessage')
/* function start app */
async function startApp(valueiNput = "cairo") {
    let DataWether = await getData(valueiNput)
    if (!DataWether.erorr) {
        displayTodayData(DataWether)
        displayNextDay(DataWether)
    } else {
        displayTodayData(DataWether)
        displayNextDay(DataWether)
    }
}
startApp()
InputSearch.addEventListener("input", function () {
    startApp(InputSearch.value)
})
