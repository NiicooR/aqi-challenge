import React from "react";
import {
  RequestStatusType,
  useAirQuality,
} from "../contexts/air-quality-context";
import "./search-bar.css";

export const SearchBar = () => {
  const { searchValueHandler, requestStatus } = useAirQuality();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = data.get("city");
    if (value !== null && typeof value === "string" && value !== "") {
      searchValueHandler(value);
    }
  };

  const handleReset = () => {
    searchValueHandler("");
  };

  const getRequestLabel = (requestStatus: RequestStatusType) => {
    if (requestStatus.isLoading) return "Fetching data...";
    if (requestStatus.errorMessage) return "Error fetching new data";
  };

  const requestLabel = getRequestLabel(requestStatus);

  return (
    <header>
      <p className="request-label">{requestLabel}</p>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          className="search-input"
          name="city"
          type="text"
          placeholder="Madrid, Berlin..."
        ></input>
        <div className="search-actions">
          <button type="submit">Search</button>
          <button type="reset" onClick={handleReset}>
            Clear
          </button>
        </div>
      </form>
    </header>
  );
};
