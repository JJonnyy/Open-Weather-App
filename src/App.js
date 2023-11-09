import {useState, useEffect} from "react";
import logoWeather from './images/weather.svg';
import axios from "axios";

function App() {
  const[data,setData] = useState({});
  const[town,setTown] = useState('Kyiv');
  const key = '97fcb4aaadc92141471251b75df73b19';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&lang=ua&appid=${key}`;

  function searchWeather(event){
    if(event.key === "Enter") {
      if (event.target.value){
        setTown(event.target.value);
        // fetch(url)
        //     .then(response => response.json())
        //     .then(json => setData(json))
        axios.get(url)
            .then(response => {
              console.log(response)
              setData(response.data);
            })
        setTown('');
      }
    }
  }
  // useEffect(()=>{
  //   fetch(url)
  //       .then(response => response.json())
  //       .then(json => setData(json))
  // },[town])

  useEffect(()=>{
    axios.get(url)
        .then(response => {
          console.log(response)
          setData(response.data);
        })
  },[])
  return (
    <div className="app">
      <div className="inp-field">
        <input type="text"
        value={town}
        onChange={(event) => setTown(event.target.value)}
        placeholder="Enter location"
        onKeyDown={searchWeather}/>
        <div className="container">
          <img src={logoWeather} className="logo-weather"/>
          <div className="header">
            <div className="city">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? (
                  // <h1>{Math.floor(data.main.temp) }°C</h1>
                  <h1>{data.main.temp.toFixed()}°C</h1>
              ):null}
            </div>
            <div className="desc">
              {data.weather ? ( <p>{data.weather[0].description}</p> ):null}
            </div>
          </div>
          {data.name !== undefined
              && (
              <div className="footer">
                <div className="feels">
                  <p>Вiдчувається як:</p>
                  {data.main ?( <p className="bold">{data.main.feels_like.toFixed()} °C</p> ):null}
                </div>
                <div className="humidity">
                  <p>Вологість:</p>
                  {data.main ?( <p className="bold">{data.main.humidity} % </p> ):null}
                </div>
                <div className="wind">
                  <p>Вітер:</p>
                  {data.wind ? (<p>{`${data.wind.speed} `}м/c</p>):null}
                </div>
              </div>
              )}
        </div>
      </div>
    </div>
  );
}

export default App;
