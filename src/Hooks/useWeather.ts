import axios from "axios"
import {z} from "zod"
//import {object,string,number,type InferOutput, parse} from "valibot"
import type { SearchType} from "../types"
import { useMemo, useState } from "react"

//type guard assetion
// function isWeatherResponse(weather: unknown): weather is Weather {

//     return (
//         Boolean(weather) &&
//         typeof weather === "object" &&
//         typeof (weather as Weather).name === "string" &&
//         typeof (weather as Weather).main.temp === "number" &&
//         typeof (weather as Weather).main.temp_max === "number" &&
//         typeof (weather as Weather).main.temp_min === "number"
//     )
// }

//zod
const Weather =z.object({
    name:z.string(),
    main:z.object({
        temp:z.number(),
        temp_max:z.number(),
        temp_min:z.number()
    })
})
export type Weather=z.infer< typeof Weather>

//valibot
// const weatherSchema =object({
//     name:string(),
//     main:object({
//         temp:number(),
//         temp_max:number(),
//         temp_min:number()
//     })
// })
// type weather = InferOutput<typeof weatherSchema>

export default function useWeather() {
    const [weather,SetWeather] = useState<Weather>({
        name:"",
        main:{
            temp:0,
            temp_max:0,
            temp_min:0
        }
    })
    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY
        try {

            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoUrl)
            //console.log(data)
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            //castear con un type
            //const {data:weatherResults}=await axios<weather>(weatherUrl)

            //type guard assetion
            // const { data: weatherResults } = await axios(weatherUrl)
            // const results = isWeatherResponse(data)
            // if (results) {
            //     console.log(weatherResults.name)
            // } else {
            //     console.log("error")
            // }

            //zod
            const { data: weatherResults } = await axios(weatherUrl)
            const result= Weather.safeParse(weatherResults)
            if(result.success){
                SetWeather(result.data)
            }

            //valibot
            //  const { data: weatherResults } = await axios(weatherUrl)
            //  const result= parse(weatherSchema,weatherResults)
            //  console.log(result)

        } catch (error) {
            console.log(error)
        }
    }
    const hasWeatherData =useMemo(()=>weather.name,[weather])
    return {
        weather,
        fetchWeather,
        hasWeatherData
    }
}
