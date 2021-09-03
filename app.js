let cityName=document.getElementById("cityName")
let country=document.getElementById("country")
let weatherDescription=document.querySelector(".HomeWeatherDescription")
let weatherPic=document.querySelector(".weatherPic")
let temperature=document.querySelector(".temperature")
let ftemperature=document.querySelector(".fTemp")
let dayInfo=document.querySelector(".presentData")
let humidity=document.getElementById("hdValue")
let speed=document.getElementById("spdValue")
let Direction=document.getElementById("winDir")
let visiblity=document.getElementById("vis")
let searchBox=document.querySelectorAll(".searchBar")
let container=document.querySelector(".container")
let secondScreen=document.querySelector(".secondScreen")
let secInput=document.getElementById("ss")

dirData={1:"N",2:"NNE",3:"NE",4:"ENE",5:"E",6:"ESE",7:"SE",8:"SSE",9:"S",10:"SSW",11:"SW",12:"WSW",13:"W",14:"WNW",15:"NW",16:"NNW",17:"N"}
function dispToggler(){
    document.querySelector(".loader-wrapperMain").style.display="none"
}

function executer(data){
    console.log(data)
    console.log(data["name"])
    cityName.innerHTML=data["name"]
    country.innerHTML=data["sys"]["country"]
    weatherDescription.innerHTML=data["weather"][0]["description"]
    console.log(data["weather"][0]["description"])
    weatherPic.src=`icons/${data["weather"][0]["icon"]}.svg`
    temperature.innerHTML=`${Math.round(data["main"]["temp"])}°C`
    ftemperature.innerHTML=`feels like ${data["main"]["feels_like"]} °C`
     let info=calcTime(data["timezone"]/3600)
     dayInfo.innerHTML=`${info[0]},${info[1]}`
     humidity.innerHTML=`${data["main"]["humidity"]}%`
     console.log(data["wind"]["speed"])
     speed.innerHTML=`${data["wind"]["speed"]}`
     var degData=data["wind"]["deg"]
     let deg=degData%360
     let compDeg=Math.round(deg/22.5)+1
    winDir.innerHTML=`${dirData[compDeg]}`
    visiblity.innerHTML=`${data["visibility"]/1000}`
    
}
function calcTime(offset) {

    
    d = new Date();
   
    
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    
    nd = new Date(utc + (3600000*offset));
    console.log(nd.toLocaleString())
    console.log((nd.getDate()).toString()+"/"+(nd.getMonth()).toString()+"/"+(nd.getYear()).toString())
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
      let dayval= weekdays[nd.getDay()]
      let sp=nd.toLocaleString().split(",")
      let time=sp[1]
      if(time[5]===":"){ 
            let timval=(time.slice(0,5))
            const timeAr = new Array(dayval,timval);
            return timeAr

      }
      else{ 
        let timval=(time.slice(0,6))
        const timeAr = new Array(dayval,timval);
        return timeAr
      }
      
   
    // return time as a string
    //return "The local time in " + city\ + " is " + nd.toLocaleString();

}

window.addEventListener("load",()=>{
    
    if( navigator.geolocation )
        {
           // Call getCurrentPosition with success and failure callbacks
           container.style.display="none"
           navigator.geolocation.getCurrentPosition( success, fail );
        }
        else
        {
           alert("Sorry, your browser does not support geolocation services.");
        }
     

     function success(position)
     {
        container.style.display="block"
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let lat1=lat.toFixed(2)
        let long1=long.toFixed(2)
        console.log(lat1)
        console.log(long1)
        
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${long1}&units=metric&appid=50a7aa80fa492fa92e874d23ad061374`)
    .then(response => response.json())
    .then(data => {
        dispToggler()
        executer(data)
        
        
    
    
    })
    
     }

     function fail()
     {
       
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=coimbatore&units=metric&appid=50a7aa80fa492fa92e874d23ad061374`)
        .then(response => response.json())
        .then(data => {
            container.style.display="block"
            dispToggler()
            executer(data)
        })
     }

    
})

searchBox[0].addEventListener("keydown",(e)=>{
    if(e.keyCode===13){
        container.style.display="block"   
        let inputValue=searchBox[0].value
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=50a7aa80fa492fa92e874d23ad061374`)
       .then(response => response.json())
       .then(data => {
           executer(data)
           searchBox[0].value=""
           window.scrollTo(0,0);
       })
       .catch(err=>{
           container.style.display="none"
           secondScreen.style.display="block"
   
       })
       }
})
secInput.addEventListener("keydown",(e)=>{
    if(e.keyCode===13){  
        let inputValue=secInput.value
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=50a7aa80fa492fa92e874d23ad061374`)
       .then(response => response.json())
       .then(data => {
        container.style.display="block"     
        secondScreen.style.display="none"
           searchBox[0].value=""
           secInput.value=""
           executer(data)
           window.scrollTo(0,0);
       })
       .catch(err=>{
           container.style.display="none"
           secondScreen.style.display="block"
   
       })
       }
})
/*document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector(".loader-wrapper").style.visibility = "visible";
    } else {
        document.querySelector(".loader-wrapper").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};
*/