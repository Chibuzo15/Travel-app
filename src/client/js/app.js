
//Add event listener to generate Button
const app = (event) => {
    console.log('App.js present')
    //Get values for input field

    const location = document.querySelector('#location').value;
    const date = document.querySelector('#date').value;

    //alert user to input a zip code
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

    const updateUI = async () => {
        const response = await fetch('/past_entry', {
            method: 'GET'
        })

        let data = await response.json()
        return data;
    }

    //chaining promises
    post_location_name(location)
        .then((res) => {
            console.log('Posted new entry successfully', res)
        })
        .catch((error) => {
            console.log('Error while posting new entry', error)
        })

}

export { app };