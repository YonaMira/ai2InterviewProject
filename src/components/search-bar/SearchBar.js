import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import "./SearchBar.css";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {searchWord: '',
                      onWordChanged: props.searchByWordHandler};
    }

    handleChange = (e) => {
        this.setState({ searchWord: e.target.value});
    }

    handleSearch = () => {
        this.state.onWordChanged(this.state.searchWord);
    }

    handleCancel = () => {
        this.setState({ searchWord: ''});
        this.state.onWordChanged('');
    }

    render() {
      return (
        <Paper className="search-bar">
            <InputBase
                className="input"
                placeholder = "Enter search pattern..."
                onChange = { this.handleChange }
                value = {this.state.searchWord}
            />
            <CancelIcon  className="cancel-button" aria-label="search" onClick={this.handleCancel}/>
            <Divider className="divider" orientation="vertical" />
            <IconButton className="search-button" aria-label="search" onClick={this.handleSearch}>
                <SearchIcon />
            </IconButton>
        </Paper>
          );
  }
}

export default SearchBar;
