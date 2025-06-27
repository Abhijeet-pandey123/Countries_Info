import { Link } from "react-router";


export default function CountryCard({name,population,region,image,capital,data}) {
  return (
    <Link className="country-card" to= {`${name.common}`} state={data}>
      <div className="flag-container">
      <img src= {image} alt="Grenada flag" />
      </div>
      
      <div className="card-text">
        <h3 className="card-title">{name.common}</h3>
        <p>
          <b>Population: </b> {population}
        </p>
        <p>
          <b>Region: </b> {region}
        </p>
        <p>
          <b>Capital: </b>{capital}
        </p>
      </div>
    </Link>
  );
}
