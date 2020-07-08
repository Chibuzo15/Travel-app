
//Add event listener to generate Button
const app = (event) => {
    console.log('App.js present')
    //Get values for input field

    const location = document.querySelector('#location').value;
    const date = document.querySelector('#date').value;

    //alert user to input a location and date
    if (location === '' && date === '') {
        alert('Please input a location and date');
        return;
    }

    const post_location_name = async (data) => {
        const response = await fetch('http://localhost:3000/post_location', {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: location,
                date: date
            })
        })

        let res_data = await response.json()
        return res_data;
    }

    const updateUI = (res, date) => {
        document.querySelector('#entryHolder').style.display = "block";
        document.querySelector('#print_trip').style.display = "block";

        const imageDOM = document.createElement('img');
        imageDOM.setAttribute("src", res.image);

        const titleDOM = document.createElement('h3')
        titleDOM.textContent = `My Trip to ${res.location.city}, ${res.location.country}`

        const div = document.createElement('div')
        const dateDOM = document.createElement('template')
        dateDOM.innerHTML = `<div id="date_res" > Departing on ${date}</div>`

        const weatherDOM = document.createElement('template')
        if(res.weather != null){
            console.log("weather not null")
            weatherDOM.innerHTML = ` <div id="weather_desc">Typical weather for ${date} is <span> High: ${res.weather.app_max_temp} °C</span>
            <span> Low: ${res.weather.app_min_temp} °C</span> <span> Description: ${res.weather.weather.description} </span></div>`
        }
        div.appendChild(dateDOM)
        div.appendChild(weatherDOM)
        console.log('weather dom ', weatherDOM)
        //remove if there is a previous
        document.querySelector('#weather').innerHTML = '';
        document.querySelector('#image').innerHTML = '';

        //append newly added image and data
        document.querySelector('#weather').appendChild(titleDOM);
        document.querySelector('#weather').appendChild(dateDOM.content);
        document.querySelector('#weather').appendChild(weatherDOM.content);
        document.querySelector('#image').appendChild(imageDOM);
    }

    //chaining promises
    post_location_name(location)
        .then((res) => {
            console.log('Travel details obtained successfully', res)
            updateUI(res, date)

        })
        .catch((error) => {
            console.log('Error while obtaining travel details', error)
        })

}

export { app };