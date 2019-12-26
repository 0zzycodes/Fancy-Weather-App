let city = document.querySelector(".city");
let date = document.querySelector(".date");
let output = document.querySelector("#output");
let desc = document.querySelector(".desc");
let temp = document.querySelector(".temp");
let hum = document.querySelector(".hum");
let pres = document.querySelector(".pressure");
let oz = document.querySelector(".ozone");
let bgImage = document.querySelector(".bg-image");
let app = document.querySelector(".app");
let speed = document.querySelector(".wind-speed");
let temDB = []

const todayD = new Date()
const proxy = 'https://cors-anywhere.herokuapp.com/';
const api = '701c955448e09bde13555965f059341b';

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    console.log(position);
    const url = `${proxy}https://api.darksky.net/forecast/${api}/${lat},${long}`;
    fetchData(url)

    fetch(`${proxy}https://geocode.xyz/${lat},${long}?json=1 `)
      .then(res => res.json())
      .then(res => {
        console.log(res); {
          /* <img src="assets/sun.svg" class="anime"></img> */
        }
        city.innerHTML = ` ${res.city}`;
      });
  })

  function fetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const {
          apparentTemperature,
          humidity,
          ozone,
          pressure,
          summary,
          temperature,
          time,
          windSpeed
        } = data.currently
        desc.innerHTML = summary
        hum.innerHTML = `${humidity * 100}%`
        speed.innerHTML = `${windSpeed.toFixed(0)} mph`
        pres.innerHTML = `${pressure.toFixed(0)} mb`
        oz.innerHTML = ozone.toFixed(0)

        const tem = (5 / 9) * (temperature - 32),
          aptem = (5 / 9) * (apparentTemperature - 32),
          tm = timeConverter(time)
        date.innerHTML = `${tm.dayName} ${tm.date}  ${tm.month}`
        temp.innerHTML = `<h3>${ tem.toFixed(0) }°C</h3> <span><strong>Feels Like: ${aptem.toFixed(0)}°C </strong></span>`
        let holder = data.daily.data
        output.innerHTML = null
        holder.shift()
        holder.forEach(dayForcast => {
          const {
            icon,
            humidity,
            ozone,
            pressure,
            summary,
            sunriseTime,
            sunsetTime,
            temperatureMax,
            temperatureMin,
            time,
            windSpeed
          } = dayForcast
          // console.log(dayForcast);

          let weatherIcon
          Ico = weatherIcon
          changeBG(icon)
          const convertedTime = timeConverter(time),
            convertedMaxTemp = (5 / 9) * (temperatureMax - 32),
            convertedMinTemp = (5 / 9) * (temperatureMin - 32)
          let forecaste = {
            dayForcast,
            convertedTime
          }
          temDB.push(forecaste)
          localStorage.setItem("Forcasts", JSON.stringify(temDB))

          output.innerHTML += `
                            <li onClick=showDetails("${convertedTime.dayName}")><span>${convertedTime.dayName}</span> <span>${convertedMinTemp.toFixed(0)}°C - ${convertedMaxTemp.toFixed(0)}°C</span></li>
                            `
        })
      })
  }

  document.querySelector('form').addEventListener('submit',
    e => {
      e.preventDefault()
      let value = document.querySelector('input').value
      console.log(value);
      getFavData(value.toLowerCase())

    })

  function getFavData(id) {
    fetch(`${proxy}https://geocode.xyz/${id}?json=1 `)
      .then(res => res.json())
      .then(res => {
        const {
          latt,
          longt
        } = res
        let url = `${proxy}https://api.darksky.net/forecast/${api}/${latt},${longt}`;
        console.log(res);
        fetchData(url)
        city.innerHTML = ` ${res.standard.city}`;
      });
  }



}
// CONVERT UNIX TIME STAMP

function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    year = a.getFullYear(),
    month = months[a.getMonth()],
    date = a.getDate(),
    dayName = days[a.getDay()],
    time = date + ' ' + month

  return {
    month,
    date,
    dayName,
    time
  };
}

function changeBG(icon) {
  if (icon === "clear-day") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/afternoon.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/afternoon.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<img src="assets/sun.svg"></img>`;
  } else if (icon === "clear-night") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/clear-night.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/clear-night.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<i class="wi wi-night-clear"></i>`;
  } else if (icon === "rain") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/raining.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/raining.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<i class="wi wi-rain"></i>`;
  } else if (icon === "snow") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/snow.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/snow.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<i class="wi wi-snow"></i>`;
  } else if (icon === "sleet") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/sleet.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/sleet.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<i class="wi wi-sleet"></i>`;
  } else if (icon === "wind") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/wind.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/wind.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<i class="wi wi-windy"></i>`;
  } else if (icon === "fog") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/foggy.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/foggy.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<i class="wi wi-fog"></i>`;
  } else if (icon === "cloudy") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/cloudy.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/cloudy.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<i class="wi wi-cloudy"></i>`;
  } else if (icon === "partly-cloudy-day") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/partly-cloudy-day.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/partly-cloudy-day.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<img src="assets/partlyCloudy.svg"></img>`;
  } else if (icon === "partly-cloudy-night") {
    document.querySelector('.current').style.background = '#1b1b1ba6'
    bgImage.style.background = "url('./assets/partly-cloudy-night.gif')"
    bgImage.style.backgroundPosition = "center"
    bgImage.style.backgroundSize = "cover"
    app.style.background = "url('./assets/partly-cloudy-night.gif')"
    app.style.backgroundPosition = "center"
    app.style.backgroundSize = "cover"
    weatherIcon = `<i class="wi wi-night-alt-cloudy"></i>`;
  } else {
    weatherIcon = `<i class="wi wi-day-sunny"></i>`;
  }
}

function showDetails(id) {
  const data = JSON.parse(localStorage.getItem("Forcasts"))
  let result = data.filter(item => item.convertedTime.dayName === id);
  result.forEach(item => {
    const {
      icon,
      humidity,
      ozone,
      pressure,
      summary,
      sunriseTime,
      sunsetTime,
      temperatureMax,
      temperatureMin,
      time,
      windSpeed
    } = item.dayForcast
    desc.innerHTML = summary
    humidity.toFixed(0)
    changeBG(icon)
    hum.innerHTML = `${humidity * 100}%`
    speed.innerHTML = `${windSpeed.toFixed(0)} km/h`
    pres.innerHTML = `${pressure.toFixed(0)} mb`
    oz.innerHTML = ozone.toFixed(0)
    const tem = (5 / 9) * (((temperatureMax + temperatureMin) / 2) - 32)
    temp.innerHTML = `<h3>${ tem.toFixed(0) }°C</h3> <span><strong>Feels Like: ${tem.toFixed(0)}°C </strong></span>`
    document.querySelector('.day').innerHTML = id
  })

}

let hour = todayD.getHours();
let minutes = todayD.getMinutes();
const am_pm = hour >= 12 ? 'PM' : 'AM';
// hour = 12;
minutes = minutes < 10 ? `0${minutes}` : minutes;
document.querySelector('.clock').innerHTML = `<h2>${hour}:${minutes} ${am_pm}</h2>`