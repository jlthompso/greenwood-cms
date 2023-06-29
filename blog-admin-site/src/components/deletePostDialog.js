import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function DeletePostDialog(props) {
  const deletePost = async () => {
    await fetch(
      `${process.env.REACT_APP_DATABASE_SERVICE}/${props._id}`,
      {
        method: 'DELETE',
        mode: 'cors',
      }
    ).then(props.onClose());
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will completely remove your post. All associated
            data will be deleted and can not be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} autoFocus>Cancel</Button>
          <Button onClick={deletePost}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}