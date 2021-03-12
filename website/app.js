/* Global Variables */
const apiKey = '9830bd250e8cc0b039d8bd4a552006d9';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


// EVent Listener and its function

const btn = document.getElementById('generate').addEventListener('click', generateBtn);

function generateBtn() {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getWeatherData(baseURL, apiKey, zipCode)
    .then(function (data) {
        console.log(data)
        postData('/add',{temp : data.main.temp, date :newDate , userResponse : userResponse});
        UpdateUI('/all');
    }) 
};


// Getting web API data 

const getWeatherData = async (baseURL, apiKey, zipCode) => {
    const res = await fetch(`${baseURL}${zipCode}&appid=${apiKey}&units=imperial`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    };
};


// Post method 
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    };
};


//update the UI with data 

const UpdateUI = async (url = '') => {
    const req = await fetch(url);
    try {
        const dataAll = await req.json();
        // console.log(dataAll);
        document.getElementById('date').innerHTML = dataAll.date;
        document.getElementById('temp').innerHTML = dataAll.temp;
        document.getElementById('content').innerHTML = dataAll.userResponse;
    }
    catch (error) { 
        console.log('error', error);
    };
};


