import styles from "./App.module.css"
import Form from "./components/Form/Form"
import WeatherDetail from "./components/Form/WeatherDetail/WeatherDetail"
import useWeather from "./Hooks/useWeather"
function App() {

  const {fetchWeather,weather,hasWeatherData}=useWeather()
  return (
    <>
      <h1 className={styles.title}>clima</h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />
        {hasWeatherData&& <WeatherDetail weather={weather}/>}
        
      </div>
    </>
  )
}

export default App
