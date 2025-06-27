import { useState } from "react";
import CountriesList from "./Components/CountriesList";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import SelectFilter from "./Components/SelectFilter";
import { Outlet } from "react-router";

const App = () => {
  
  return (
    <>
      <Header></Header>
      <Outlet />
      
    </>
  );
};

export default App;
