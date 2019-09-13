import React, { Component } from "react";
import "./Word.css";

class Word extends Component {
     render() {
        return <span className = "word" id={this.props.wordId}>
            {this.props.word}
        </span>;
    }
}

export default Word;
