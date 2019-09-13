import React, { Component } from "react";
import "./AddSpanLabelModalDialog.css";
import UserNotificationDialog from "../../../general-components/UserNotificationDialog";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";

class AddSpanLabelModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLabel: null
        }
    }

    onLabelChanged(event) {
        this.setState({currentLabel: event.target.value});
    }

    responseLabel() {
        this.props.onLabelSelected(this.state.currentLabel);
    }

    render() {
        return <UserNotificationDialog show={this.props.show}
                                       onClose = {() => this.responseLabel()}
                                       header="Input span label:">
                    <Paper className="input-bar">
                            <InputBase
                                className="input"
                                onChange = { event => this.onLabelChanged(event) }
                            />
                    </Paper>
                </UserNotificationDialog>
    }
}

export default AddSpanLabelModalDialog;
