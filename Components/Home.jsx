import { useState } from "react";
import CountriesList from "./CountriesList";
import SearchBar from "./SearchBar";
import SelectFilter from "./SelectFilter";

export default function Home() {
  let [query, setQuery] = useState("");
  let [filter, setFilter] = useState("");

  return (
    <main>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectFilter setFilter={setFilter} /> 
      </div>
      <CountriesList query={query} filter={filter} /> 
    </main>
  );
}
