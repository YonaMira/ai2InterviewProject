import React, {Component} from 'react';
import './App.css';
import './components/search-bar';
import './components/search-results';
import SearchBar from "./components/search-bar/SearchBar";
import SearchResultsPanel from "./components/search-results";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {searchWord: ''};
    }

    searchByWord = (word) => {
        this.setState({searchWord: word})
    }
    render() {
        return (
            <div className="App">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <SearchBar searchByWordHandler={this.searchByWord}
                           searchWord={this.state.searchWord}/>
                <SearchResultsPanel searchWord={this.state.searchWord}/>
            </div>
        );
    }
}

export default App;
