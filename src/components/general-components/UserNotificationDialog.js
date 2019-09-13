import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function UserNotificationDialog (props) {
        return (
            <Dialog open={props.show}>
                 <DialogTitle>
                    {props.header}
                </DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">Ok</Button>
                </DialogActions>
            </Dialog>
            );
}

export default UserNotificationDialog;
