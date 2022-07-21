import React, { ReactElement, useEffect, useState, Fragment } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import { createDiary, updateDiary } from "../../Features/Diary/diarySlice";
import { showAlert } from "../../util";
import { makeStyles } from '@mui/styles';
import { grey } from "@mui/material/colors";
// import Loading from "./Loading.component";

const useStyles = makeStyles({
  modalButton: {
    color: "white",
    backgroundColor: "grey",
    border: '1px solid grey',
    borderRadius: '10px',
    outline: "none",
    "&:hover, &:active": {
      color: "grey",
      border: '1px solid grey',
      borderRadius: '10px',
      outline: "none",
    }
  },
  modalActionButton: {
    color: "grey",
    border: '1px solid grey',
    outline: "none",
    borderRadius: '10px',
    "&:hover, &:active": {
      color: "white",
      border: '1px solid grey',
      borderRadius: '10px',
      backgroundColor: "grey",
      outline: "none",
    }
  },
});

type dataEdit = {
  title: string;
  type: "private" | "public";
};

interface Props {
  btnTitle: string;
  title: string;
  id?: string;
  editInfo: dataEdit;
  mode: string;
}

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & { children?: React.ReactElement<any, any> },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function DiaryModal({
  btnTitle,
  title,
  id,
  editInfo,
  mode,
}: Props): ReactElement {
  const classes = useStyles();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.diary);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<{
    title: string;
    type: "private" | "public";
  }>({
    title: "",
    type: "public",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const submit = () => {
    mode === "add"
      ? user && user?.id && dispatch(createDiary({ ...data, userId: user?.id }))
      : dispatch(updateDiary({ ...data, id: id }));

    setOpen(false);
    showAlert("Saved!", "success");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData(editInfo);
  }, [editInfo]);

  return (
    <Fragment>
      <Button
        className={`${classes.modalButton} mr-1`}
        size="small"
        onClick={handleClickOpen}
      >
        {btnTitle}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="title"
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            onChange={handleChange}
            value={data.title}
          />
          <Radio
            checked={data.type === "public"}
            onChange={handleChange}
            value="public"
            color="default"
            name="type"
            inputProps={{ "aria-label": "Public" }}
          />{" "}
          Public
          <Radio
            checked={data.type === "private"}
            onChange={handleChange}
            value="private"
            name="type"
            color="default"
            inputProps={{ "aria-label": "Private" }}
          />{" "}
          Private
        </DialogContent>
        <DialogActions>
          <Button className={classes.modalActionButton} onClick={handleClose}>
            Close
          </Button>
          {loading ? (
            <Button className={classes.modalActionButton}>
              Loading...
            </Button>
          ) : (
            <Button className={classes.modalButton} onClick={submit}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default DiaryModal;