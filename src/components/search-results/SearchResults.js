import React, { Component } from "react";
import Ai2ApiProxy from "../../ai2-server-proxy/Ai2ApiProxy";
import "./SearchResults.css";
import SearchResultItem from "./search-result-item/SearchResultItem";

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {sentences: undefined,
                  searchStatus: undefined};
  }

  getResultsByWord(searchWord) {
      let promise = Ai2ApiProxy.searchSentencesByWord(searchWord);
      promise.then( results => {
          if(results.status === 200) {
              console.log(JSON.stringify(results.data.list));
              this.setState({sentences: results.data.list, searchStatus: 200});
          }
          else {
              this.setState({sentences: undefined, searchStatus: results.status});
          }
      });
  }

  renderSentencesList() {
      return (
          <ul className="sentences-list">
              {this.state.sentences.map((sentence) => {
                      return <SearchResultItem key={sentence.id}
                              searchWord={this.state.searchWord}
                              sentenceId={sentence.id}
                              words={sentence.words}
                          />;
                    })
              }
          </ul>);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
      if(this.state.searchWord !== nextProps.searchWord) {
          nextState.searchWord = nextProps.searchWord;
          nextState.searchStatus = undefined;
          nextState.sentences = undefined;
          if (nextProps.searchWord) {
              this.getResultsByWord(nextProps.searchWord);
          }
      }
      return true;
  }

    render() {
      if(this.state.searchStatus && this.state.searchStatus !== 200) {
          return <h1 className="error-msg">Data service return error: {this.state.searchStatus}</h1>;
      }

      if (this.state.searchWord){
          if (this.state.searchStatus) {
              if (this.state.sentences && this.state.sentences.length) {
                  return this.renderSentencesList();
              } else {
                  return <h1 className="user-msg">There are no results which match the search pattern</h1>;
              }
          }
          else {
              return <h1 className="user-msg">Data is retrieving...</h1>;
          }
      }
      else {
          return <h1 className="user-msg">Search results will appear here...</h1>;
      }
  }
}

export default SearchResults;
