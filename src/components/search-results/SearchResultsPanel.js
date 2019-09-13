import React from "react";
import "./SearchResultsPanel.css";
import SearchResults from "./SearchResults";

function SearchResultsPanel (props) {
     return <div className="search-results-panel">
            <h1>Search results</h1>
            <SearchResults  searchWord={props.searchWord}/>
          </div>
}

export default SearchResultsPanel;
