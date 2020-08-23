window.addEventListener('load',()=>//dupa ce ni se incarca pagina fct asta va fii called
{
    
    let temperatureDescription=document.querySelector('.temperature-description');

    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimezone=document.querySelector('.location-timezone');

    let long;
    let lat;//latitude
    let temperatureSection=document.querySelector('.temperature');
    const temperatureSpan=document.querySelector('.temperature span');


    if(navigator.geolocation)
    {
       navigator.geolocation.getCurrentPosition(position=>{

        long=position.coords.longitude;
        lat=position.coords.latitude;
        const proxy='https://cors-anywhere.herokuapp.com/';
        const api=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
       

            /*this below gets the info from the api,and then run response*/ 
            fetch(api).then(response=>{
                return response.json();
            }).then(data=>{
                //console.log(data);
                const{temperature,summary,icon}=data.currently;/*e la fel ca data.currently.temperature */

                //set DOM elements from the API
                temperatureDegree.textContent=temperature;
                temperatureDescription.textContent=summary;
                locationTimezone.textContent=data.timezone;

                //formula for celsius
                let celsius=(temperature-32)*(5/9);

                //setIcon
                setIcons(icon,document.querySelector('.icon'))

                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent==="F")
                    {
                        temperatureSpan.textContent="C";
                        temperatureDegree.textContent=Math.floor(celsius);
                    }
                    else{
                        temperatureSpan.textContent="F";
                        temperatureDegree.textContent=temperature;
                    }
                })

            });
        });
    }

    function setIcons(icon,iconID)
    {

        const skycons=new Skycons({color:"white"});
        const currentIcon=icon.replace(/-/g, "_").toUpperCase();//se va uita pe fiecare linie si cand va gasii - il va inlocui cu _
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);



    }

});










