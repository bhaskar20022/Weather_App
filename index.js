const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const thankyou=document.querySelector(".thankyou");
const apiKey="5728c49229c7d6e1bb3cb5399b0848b3";
let thankyouDisplayed=false;
weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityInput.value;
    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayData(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city!");
    }
})
async function getWeatherData(city){
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response=await fetch(apiURL);
    console.log(response);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}
function displayData(data){
    console.log(data);
    const {name:city, 
           main:{temp,humidity}, 
           weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const logoDisplay=document.createElement("p");
   
    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)} degrees`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent=`${description}`;
    logoDisplay.textContent=emojiDisplay(id);
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    logoDisplay.classList.add("emojiDisplay");
  
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(logoDisplay);
    displayThankYouMessage();
    
   
}
function emojiDisplay(weatherId){
    switch(true){
        case (weatherId>=200 && weatherId<300):
            return "⛈";
        case (weatherId>=300 && weatherId<500):
            return "🌧";
        case (weatherId>=500 && weatherId<600):
            return "🌧";
        case (weatherId>=600 && weatherId<700):
            return "❄";
        case (weatherId>=701 && weatherId<800):
            return "🌫";
        case (weatherId===800):
            return "🌞";
        case (weatherId>=801 && weatherId<809):
            return "☁";
        default:
            return "❓";
    }
}
function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}

function displayThankYouMessage() {
    if (!thankyouDisplayed) {
        const thankYouMessage = document.createElement("p");
        thankYouMessage.textContent = "Thanks for using the app!";
        thankYouMessage.classList.add("thanks");
        thankyou.appendChild(thankYouMessage);
        thankyouDisplayed=true;
    }
}





