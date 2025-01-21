import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

// eslint-disable-next-line no-unused-vars
const confirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
      <Dialog open ={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you Sure to Delete this group?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button color="error" onClick={deleteHandler}>Yes</Button>
        </DialogActions>
      </Dialog>
  );
};

export default confirmDeleteDialog;
