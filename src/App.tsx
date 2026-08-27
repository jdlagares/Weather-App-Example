import styles from "./App.module.css"
import Alert from "./components/Form/Alert/Alert"
import Form from "./components/Form/Form"
import Spinner from "./components/Form/load/Spinner"
import WeatherDetail from "./components/Form/WeatherDetail/WeatherDetail"
import useWeather from "./Hooks/useWeather"
function App() {

  const {fetchWeather,weather,loading,notFound,hasWeatherData}=useWeather()
  return (
    <>
      <h1 className={styles.title}>clima</h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />
        {loading&&<Spinner/>}
        {hasWeatherData&& <WeatherDetail weather={weather}/>}
        {notFound&& <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  )
}

export default App
