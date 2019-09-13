import React, { Component } from "react";
import Word from "./word/Word";
import "./Sentence.css";

class Sentence extends Component {

  getClassForWord(word, index) {
    let className;
    if (!this.props.annotationMode) {
      className = (this.props.searchWord === word)? "mark": "regular";
    }
    else {
      className = this.wordInCurrentSelectedRange(index)? "annotate": "regular";
    }
    return className;
  }

  wordInCurrentSelectedRange(index) {
    return (this.props.currentAnnotationRange &&
            this.props.currentAnnotationRange.start <= index &&
            this.props.currentAnnotationRange.end >=index);
  }

  render() {
       return <div className = "sentence" id={this.props.sentenceId}>
                  {
                    this.props.words &&
                    this.props.words.map((word, index) => {
                      return <span key={index} className={this.getClassForWord(word, index)}>
                                    <Word
                                      sentenceId={this.props.sentenceId}
                                      wordId={index}
                                      word={word}
                                      annotationMode={this.props.annotationMode}/>
                            </span>
                    })
                  }
                </div>
  }
}

export default Sentence;
