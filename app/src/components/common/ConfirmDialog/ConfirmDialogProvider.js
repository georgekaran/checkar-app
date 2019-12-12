import React from 'react';
import ConfirmDialogContext from './ConfirmDialogContext';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DialogProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      config: {
        title: '',
        message: '',
        confirmLabel: 'Yes',
        cancelLabel: 'No',
        confirmCallback: null,
        cancelCallback: null
      },
      contextValue: {
        showConfirmDialog: this.showConfirmDialog,
      },
    };
  }

  handleClose = () => {
    const { cancelCallback } = this.state.config;

    if (cancelCallback && typeof cancelCallback === 'function') {
      cancelCallback()
    }

    this.setState({ open: false });
  };

  handleAccept = () => {
    const { confirmCallback } = this.state.config;
    
    if (confirmCallback && typeof confirmCallback === 'function') {
      confirmCallback()
    }

    this.setState({ open: false });
  };

  showConfirmDialog = (config) => {
    const { title, message, confirmLabel, cancelLabel, confirmCallback, cancelCallback } = config;

    this.setState({
      open: true,
      config: {
        title: title ? title : '',
        message: message ? message : '',
        confirmLabel: confirmLabel ? confirmLabel : 'Yes',
        cancelLabel: cancelLabel ? cancelLabel : 'No',
        confirmCallback: confirmCallback ? confirmCallback : null,
        cancelCallback: cancelCallback ? cancelCallback : null
      }
    });
  }

  render() {
    const { contextValue } = this.state;
    const { title, message, confirmLabel, cancelLabel } = this.state.config;


    return (<ConfirmDialogContext.Provider value={contextValue}>
      {this.props.children}

      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleAccept} color="secondary">{confirmLabel}</Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>{cancelLabel}</Button>
        </DialogActions>
      </Dialog>

    </ConfirmDialogContext.Provider>)
  }

}

export default DialogProvider