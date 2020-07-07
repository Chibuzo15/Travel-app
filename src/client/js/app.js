const app = () => {
    console.log('App.js present')
    // Personal API Key for OpenWeatherMap API
    const api_key = '1a4f5e77fbe903c16a81539d113c0cec'
    //values for api
    const countryCode = 'us';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    //Append to api call to get temperature in Farenheit
    const Fahren = 'units=imperial'

    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + '-' + d.getDate() + '-' + d.getFullYear();


    //Add event listener to generate Button
    document.querySelector('#generate').addEventListener('click', (event) => {

        //Get values for input field
        const feelings = document.querySelector('#feelings').value;
        const zipCode = document.querySelector('#zip').value;

        //alert user to input a zip code
        if (zipCode === '') {
            alert('Please input a Zip Code');
        }
        //alert if feelings is empty
        if (document.querySelector('#feelings').value === '') {
            alert('Please input a value for how you feel');
        }

        const get_weather = async function () {
            const response = await fetch(`${baseUrl}?zip=${zipCode},${countryCode}&appid=${api_key}&${Fahren}`, {
                method: 'GET'
            })

            let data = await response.json()
            return data;
        }

        const post_data = async (data) => {
            const response = await fetch('/add_new_info', {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            let res_data = await response.json()
            return res_data;
        }

        const updateUI = async () => {
            const response = await fetch('/past_entry', {
                method: 'GET'
            })

            let data = await response.json()
            return data;
        }

        //chaining promises
        get_weather()
            .then((res) => {
                const data = {
                    temp: res.main.temp,
                    date: newDate,
                    feelings: feelings
                }
                post_data(data)
                    .then((res) => {
                        console.log('Posted new entry successfully', res)
                    })
                    .catch((error) => {
                        console.log('Error while posting new entry')
                    })
            })
            .then(() => {
                updateUI()
                    .then((res) => {

                        //get the entry div from the DOM
                        const tempDom = document.querySelector('#temp')
                        const dateDom = document.querySelector('#date')
                        const feelingsDom = document.querySelector('#content')

                        //create document fragments to store response values
                        const temp = document.createDocumentFragment()
                        const date = document.createDocumentFragment()
                        const feelings = document.createDocumentFragment()

                        temp.textContent = 'Temperature :' + ' ' + res.temperature + ' F';
                        date.textContent = 'Date :' + ' ' + res.date;
                        feelings.textContent = 'Feelings :' + ' ' + res.userResponse;

                        //Delete existing entry data in html
                        tempDom.textContent = '';
                        dateDom.textContent = '';
                        feelingsDom.textContent = '';

                        //append new values to  html
                        tempDom.appendChild(temp);
                        dateDom.appendChild(date);
                        feelingsDom.appendChild(feelings);

                    })
                    .catch((err) => {
                        console.log('Error in update UI promise')
                    })
            })
    })

}

export { app };