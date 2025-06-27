import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer"; 



export default function CountriesList({ query, filter }) {
  const[CountriesData,setCountriesData]= useState([]);
  useEffect(()=>{
    fetch("https://restcountries.com/v3.1/all?fields=name,population,region,subregion,tld,currencies,languages,flags,borders,capital")
    .then((res) => res.json())
    .then((data) => {
      
       setCountriesData(data);
    });
  }, [])
  let filteredCountriesData = CountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );
  let regionfilteredCountriesData= filteredCountriesData.filter((country) =>
    country.region.toLowerCase().includes(filter.toLowerCase())
  );
  let array = regionfilteredCountriesData.map((country) => {
    return (
      <CountryCard
        key={country.name.common}
        name={country.name}
        population={country.population.toLocaleString("en-IN")}
        region={country.region}
        image={country.flags.svg}
        capital={country.capital}
        data= {country}
      />
    );
  });
 
  return(
    <>
     { CountriesData.length === 0? <CountriesListShimmer/>: <div className="countries-container">{array}</div>}
     </>
    );
}
