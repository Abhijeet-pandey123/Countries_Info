import { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router";
import CountryDetailShimmer from "./CountryDetailShimmer";
export default function CountryDetail() {
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const countryName = useParams().country;
  const { state } = useLocation();

 function updateData(data) {
  setCountryData({
    name: data.name.common,
    nativeName: Object.values(data.name.nativeName || {})[0]?.common || " ",
    population: data.population,
    region: data.region,
    subregion: data.subregion,
    capital: data.capital,
    tld: data.tld,
    currencies: Object.values(data.currencies || {})
      .map((currency) => currency.name)
      .join(", "),
    languages: Object.values(data.languages || {}).join(", "),
    flag: data.flags.svg,
    borders: [],
  });

  console.log(data.borders);

  if (data.borders?.length) {
    // join all border codes
    const codes = data.borders.join(",");
    // fetch all at once
    fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name`)
      .then((res) => res.json())
      .then((countries) => {
        const borderNames = countries.map((c) => c.name.common);
        setCountryData((prev) => ({
          ...prev,
          borders: borderNames,
        }));
      });
  }
}

  useEffect(() => {
    if (state) {
      updateData(state);

      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then((dat) => {
        let data = dat[0];
        updateData(data);
      })
      .catch((err) => {
        setNotFound(true);
      });
  }, [countryName]);
  if (notFound) {
    return (
      <div>
        The Country <b>{countryName}</b> does not exist
      </div>
    );
  }

  return countryData === null ? (
    <CountryDetailShimmer />
  ) : (
    <main>
      <div className="country-details-container">
        <span
          className="back-button"
          onClick={() => {
            history.back();
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt="" />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName || countryData.name} </b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>
                  Total Population: {countryData.population.toLocaleString("en-IN")}{" "}
                </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion || countryData.region} </b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital?.join(" ,")}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld} </b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies} </b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages} </b>
                <span className="languages"></span>
              </p>
            </div>
            {countryData.borders.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border) => {
                  return (
                    <Link key={border} to={`/${border}`}>
                      {" "}
                      {border}{" "}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
