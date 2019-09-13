import React, { Component } from "react";
import "./SentenceAnnotator.css";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const SpanSlider = withStyles({
    root: {
        color: '#3a8589',
        height: 3,
        padding: '5px 0',
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -10,
        marginLeft: -11,
        boxShadow: '#ebebeb 0px 2px 2px',
        '&:focus,&:hover,&$active': {
            boxShadow: '#ccc 0px 2px 3px 1px',
        },
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 3,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
    },
})(Slider);

class SentenceAnnotator extends Component {
    constructor(props) {
        super(props);
        this.markValueToWordId = {};
        this.marks = this.getSliderMarksByWords();
        this.sentenceWidth = this.getSentenceLengthInPixels();
        this.startOfRange = this.marks[0].value;
        this.endOfRange = this.marks.length > 1? this.marks[1].value: this.marks[0].value;
        this.popupRangeData();
    }

    popupRangeData() {
        this.props.handleSpanSelection(this.props.sentenceId,
            this.markValueToWordId[this.startOfRange],
            this.markValueToWordId[this.endOfRange]);
    }

    getWordLengthInPixels(wordId) {
        const sentence = document.querySelector(`.sentence[id='${this.props.sentenceId}']`);
        const word = sentence.querySelector(`.word[id='${wordId}']`);
        return word.clientWidth;
    }

    getSentenceLengthInPixels() {
        let sentence = document.querySelector(`.sentence[id='${this.props.sentenceId}']`);
        let length = sentence.clientWidth;
        length += 10 * this.props.words.length;
        return length;
    }

    getSliderMarksByWords() {
        let positionFromStartInPixels = 0;
        let prevWordWidth = 0;
        return this.props.words.map((word, index) => {
            const currentWordWidth = this.getWordLengthInPixels(index);
            if(!prevWordWidth) {
                prevWordWidth = currentWordWidth;
            }
            positionFromStartInPixels += ((currentWordWidth + prevWordWidth)/2 + 9);
            let mark =  {value: positionFromStartInPixels, label: word};
            this.markValueToWordId[positionFromStartInPixels] = index;
            prevWordWidth = currentWordWidth;
            return mark;
        });
    }

    onRangeChanged = (event, value) => {
        const markValues = this.marks.map(mark => mark.value);
        if(markValues.includes(value[0]) && markValues.includes(value[1])) {
            this.startOfRange = value[0];
            this.endOfRange = value[1];
            this.popupRangeData();
        }
    }

    render() {
        return <div>
                    <SpanSlider style={{width: this.sentenceWidth + 100}}
                        min={0}
                        max={this.sentenceWidth}
                        defaultValue={[this.startOfRange,
                                      this.endOfRange]}
                        step={null}
                        marks={this.marks}
                        onChangeCommitted={(event, value) => this.onRangeChanged(event, value)}
                    />
                </div>
    }
}

export default SentenceAnnotator;
