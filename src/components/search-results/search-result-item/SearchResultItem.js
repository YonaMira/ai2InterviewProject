import React, { Component } from "react";
import Sentence from "./sentence";
import SentenceAnnotator from "./sentence-annotator";
import "./SearchResultItem.css";
import Slide from '@material-ui/core/Slide'
import Ai2ApiProxy from "../../../ai2-server-proxy/Ai2ApiProxy";
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import UserNotificationDialog from "../../general-components/UserNotificationDialog";
import AddSpanLabelModalDialog from "./add-span-label-dialog/AddSpanLabelModalDialog";
import {ArrowTooltip} from "../../general-components/ArrowTooltip";

class SearchResultItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            annotationMode: false,
            currentAnnotationRange: {start: null, end: null},
            spans: [],
            readyToSendData: false
        }
    }

    switchAnnotationMode(){
        const prevAnnotationMode = this.state.annotationMode;
        this.setState({annotationMode: !prevAnnotationMode})
    }

    handleSpanSelection = (sentenceId, startOfRange, endOfRange) => {
        this.setState({currentAnnotationRange: {start: startOfRange, end: endOfRange}});
    }

    onAddAnnotationClick(event) {
        this.setState({addAnnotationLabelMode: true});
    }

    addAnnotation(label) {
        let prevSpans = this.state.spans;
        const newSpan = {
            label: label,
            start: this.state.currentAnnotationRange.start,
            end: this.state.currentAnnotationRange.end
        }
        prevSpans.push(newSpan);
        this.setState({spans: prevSpans.map(span => span), readyToSendData: true});// to force state update
     }

    sendAnnotation(event) {
        this.setState({dataSending: true});
        let promise = Ai2ApiProxy.annotateSentence(this.props.sentenceId, this.state.spans);

        promise
            .then(response => {
                setTimeout(() => {
                    this.setState({spans: []});
                    this.switchAnnotationMode();
                    this.setState({readyToSendData: false});
                }, 1000);
            })
            .catch(error => {
                console.error(error);
                this.setState({error: error});
            })
            .finally(() => {
                setTimeout(() => {
                    this.setState({dataSending: false});
                }, 1000);
            });
    }

    getIconByAnnotationMode(annotationMode) {
        let iconHtml;
        if (!annotationMode)
        {
            iconHtml = <ArrowTooltip title="Enter annotation mode" placement="top">
                            <EditIcon className="edit-button" onClick={(event) => this.switchAnnotationMode(event)}/>
                        </ArrowTooltip>
        }
        else {
            iconHtml =  <div className="icons-block">
                            <ArrowTooltip title="Cancel annotation" placement="top" >
                                <CancelIcon className="annotation-button" onClick={(event) => this.switchAnnotationMode(event)}/>
                            </ArrowTooltip>
                            <ArrowTooltip title="Add selected span" placement="top">
                                <AddIcon className="annotation-button" onClick={(event) => this.onAddAnnotationClick(event)}/>
                            </ArrowTooltip>
                        </div>
        }
        return iconHtml;
    }

    onLabelSelected(label) {
        this.setState({addAnnotationLabelMode: false});
        this.addAnnotation(label);
    }

    render() {
        return (
            <li key={this.props.sentenceId} className="result-item-panel">
                {
                    this.state.addAnnotationLabelMode &&
                    <AddSpanLabelModalDialog show={this.state.addAnnotationLabelMode}
                                             onLabelSelected = {label => this.onLabelSelected(label)}/>
                }
                {
                    this.state.error &&
                    <UserNotificationDialog show={(this.state.error)}
                                            onClose = {() => {this.setState({error: null})}}
                                            header={this.state.error.message}>
                        <p>{JSON.stringify(this.state.error)}</p>
                    </UserNotificationDialog>
                }
                {
                    this.state.readyToSendData &&
                    <ArrowTooltip title="Send spans" placement="top">
                    <Slide direction="right"
                           in={this.state.readyToSendData}>

                            <IconButton className="send-icon-button" onClick={(event) => this.sendAnnotation(event)}>
                                <SendIcon  className={this.state.dataSending? "sendIcon2" : "sendIcon"}/>
                            </IconButton>

                    </Slide>
                    </ArrowTooltip>
                }
                <div className="result-item">
                    {
                        this.getIconByAnnotationMode(this.state.annotationMode)
                    }
                    <Sentence
                        sentenceId={this.props.sentenceId}
                        words={this.props.words}
                        annotationMode={this.state.annotationMode}
                        currentAnnotationRange = {this.state.currentAnnotationRange}
                        searchWord={this.props.searchWord}
                    />
                </div>
                {this.state.annotationMode &&
                    <SentenceAnnotator
                        sentenceId={this.props.sentenceId}
                        words={this.props.words}
                        handleSpanSelection={this.handleSpanSelection}
                    />
                }
            </li>
        );
    }
}

export default SearchResultItem;
