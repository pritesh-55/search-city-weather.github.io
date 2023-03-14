

//Defining all variables which will be used

// submit button ko get krne ke liye
const submit_button = document.getElementById('submitbtn')

//user search krne pr jo city name likhega uski value
const search_city_name = document.getElementById('cityName')

//after search wo city name middle layer mei dikhegi uski value
const show_city_name = document.getElementById('city_name')

//temp last layer mei dikhegi uski value
const show_temperature = document.getElementById('temp')

//temp ka status last layer mei dikhegi uski value
const show_temp_status = document.getElementById('status')

// data hiding ki class kab add krni hai kab remove krni hai uske liye
const data_hide = document.querySelector('.middle_layer')




// Promise when event passed

const getinfo = async (event) => {
  // form tag output bhej ke wapis reload ke normal state mei aa jata hai usko rokne ke liye we use preventDefault() 
  event.preventDefault()

  let city_value = search_city_name.value;

  //agar user ne bina city name dale hi submit button click kr diya tb kya show hoga
  if (city_value == "") {
    show_city_name.innerText = "Enter the city name before search"

    // jb empty search hoga tab data hide ki class applied rahegi
    data_hide.classList.add('data_hide')
  }

  else {

    // url mei koi error aaye issliye try & catch mein sara code likhenge
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_value}&units=metric&appid=7d607d16f477b77f0a41d146014a5b98`

      let response = await fetch(url)
      // this response is coming in json form, to show data on console we need to convert json into JS Object
      let data = await response.json()

      // converting the obejct into array of objects
      let array_of_data = [data]

      // accessing showing city name in middle layer
      show_city_name.innerText = `${array_of_data[0].name},${array_of_data[0].sys.country}`

      // accessing and shwoing the temperature
      show_temperature.innerHTML = `${array_of_data[0].main.temp}<sup>o</sup>C`



      // Stored temperature status data in temperature mood variable
      let temperature_mood = array_of_data[0].weather[0].main;

      // Now checking temperature mood is sunny or cloud according to conditions and uske respective images dikha dega
      if (temperature_mood == "Clear") {
        show_temp_status.innerHTML = ' <i class="fas fa-sun" style=" color: #eccc68;" ></i> '
      }
      else if (temperature_mood == "Cloud") {
        show_temp_status.innerHTML = ' <i class="fas fa-cloud" style=" color: #f1f2f6;" ></i> '
      }
      else if (temperature_mood == "Rain") {
        show_temp_status.innerHTML = ' <i class="fas fa-cloud-rain" style=" color: #a4b0be;" ></i> '
      }
      else {
        show_temp_status.innerHTML = ' <i class="fas fa-cloud" style=" color: #eccc68;" ></i> '
      }

      //jb right city search hoga tab data show krna hai issliye data_hide ki class remove krni hogi
      data_hide.classList.remove('data_hide')
    }



    catch {
      // city name galat write krne pr error handle
      show_city_name.innerText = "Enter the valid city name"

      //jb wrong city search hoga tab data hide ki class applied rahegi
      data_hide.classList.add('data_hide')
    }

  }
}




//submit button click krne ke baad kya hoga usko ek event mei daal diya
submit_button.addEventListener('click', getinfo);
