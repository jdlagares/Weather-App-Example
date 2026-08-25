
import { useState } from 'react'
import type { SearchType } from '../../types'
import { countries } from '../../data/countries'
import styles from "./Form.module.css"
import Alert from './Alert/Alert'
export default function Form() {

    const [search,setSearch]=useState<SearchType>({
        city:"",
        country:""
    })

    const [alert,SetAlert] =useState("")
    const handleChange =(e:  React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>) =>{
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit =(e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(Object.values(search).includes("")){
            SetAlert("all fields are mandatory")
            return
        }
    }
  return (
    <form 
        className={styles.form}
        onSubmit={handleSubmit}
    >
        {alert &&<Alert>{alert}</Alert>}
        <div className={styles.field}>
            <label htmlFor="city">City:</label>
            <input 
                id="city"
                type="text"
                name="city"
                placeholder="Ciudad" 
                value={search.city}
                onChange={handleChange}
            />
        </div>
        <div className={styles.field}>
            <label htmlFor="country">Country</label>
            <select
                id="country"
                value={search.country}
                name="country"
                onChange={handleChange}
            >
                <option value=""> --- Select a country---</option>
                {countries.map(country=>(
                <option
                key={country.code}
                value={country.name}
                >{country.name}</option>
                ))}
            </select>
           
        </div>
        <input className={styles.submit} type="submit" value="consultar clima" />
    </form>
  )
}
