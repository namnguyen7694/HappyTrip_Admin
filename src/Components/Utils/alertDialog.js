import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
        {`Xóa ${props.type}`}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Bạn có chắc chắn muốn xóa ${props.type}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Thông tin ${props.type} sẽ bị xóa và không thể khôi phục được`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={() => {
            handleClose ();
            props.deleteAction(props.id)
            }} color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}