import React, { ReactElement, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import { createEntry, updateEntry } from "../../Features/Entry/entrySlice";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from "@mui/material/TextField";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { showAlert } from "../../util";
import { makeStyles } from "@mui/styles";

// import Loading from "./Loading.component";

// interface Props {
//   btnTitle: string;
//   mode: string;
//   diary_id?: string;
//   id?: string;
//   editInfo: {
//     title: string;
//     content: string;
//   };
// }

// function EntryModal({
//   btnTitle,
//   mode,
//   diary_id,
//   id,
//   editInfo,
// }: Props): ReactElement {
//   const dispatch = useAppDispatch();
//   const { loading } = useSelector((state: RootState) => state.entry);
//   const [open, setOpen] = useState(false);
//   const [entryData, setEntryData] = useState({
//     title: "",
//     content: "",
//   });

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEntryData({
//       ...entryData,
//       title: event.target.value,
//     });
//   };

//   const handleTextAreaChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setEntryData({
//       ...entryData,
//       content: event.target.value,
//     });
//   };

//   const toggleDrawer = (open: boolean) => {
//     setOpen(open);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
//     e.preventDefault();
//     mode === "add"
//       ? dispatch(createEntry({ ...entryData, diaryId: diary_id }))
//       : dispatch(updateEntry({ ...entryData, id: id }));

//     setOpen(false);
//     showAlert("Saved!", "success");
//   };

//   useEffect(() => {
//     setEntryData(editInfo);
//   }, [editInfo]);
//   const handleClose = () => {
//     toggleDrawer(false)
//   }
//   return (
//     <Fragment>
//        <Button  style={{color: " #005ce6"}} onClick={() => toggleDrawer(true)}>
//         Edit Entry
//       </Button>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Add Entry</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Title"
//             type="text"
//             fullWidth
//             onChange={handleInputChange}
//             value={entryData.title}
//           />
//         {/* <TextField
//           id="standard-multiline-flexible"
//           label="What's your Opinion?"
//           multiline
//           rowsMax={4}
//           onChange={handleTextAreaChange}
//           value={entryData.content}
//         /> */}
//         <TextareaAutosize
//         aria-label="minimum height"
//         minRows={3}
//         placeholder="Your Content"
        
//         onChange={handleTextAreaChange}
//         value={entryData.content}
//         />
//         </DialogContent>
//         <DialogActions>
//           <Button  style={{color: " #005ce6"}} size="small" onClick={handleClose} >
//             Cancel
//           </Button>
//           {loading ? (
//                 <Button>
//                   Loading...
//                 </Button>
//               ) : (
//                 <Button  style={{color: " #005ce6"}} size="small" onClick={handleSubmit}>
//                   Save
//                 </Button>
//               )}
//         </DialogActions>
//       </Dialog>
//     </Fragment>
//   );
// }

// export default EntryModal;

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

interface Props {
    btnTitle: string;
    mode: string;
    title: string
    diary_id?: string;
    id?:string;
    editInfo : {
        title: string;
        content: string;
    },
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


function EntryModal({
  btnTitle,
  diary_id,
  title,
  id,
  editInfo,
  mode,
}: Props): ReactElement {
  const classes = useStyles();
  const { loading } = useSelector((state: RootState) => state.diary);
  const dispatch = useAppDispatch();
      const [open, setOpen] = useState(false);
  const [entryData, setEntryData] = useState({
        title: "",
        content: "",
      });
    
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntryData({
          ...entryData,
          title: event.target.value,
        });
      };
    
      const handleTextAreaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        setEntryData({
          ...entryData,
          content: event.target.value,
        });
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        mode === "add"
          ? dispatch(createEntry({ ...entryData, diaryId: diary_id }))
          : dispatch(updateEntry({ ...entryData, id: id }));
    
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
        setEntryData(editInfo);
      }, [editInfo]);

  return (
    <Fragment>
      <Button
        className={classes.modalButton}
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
            onChange={handleInputChange}
            value={entryData.title}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Your Content"
            
            onChange={handleTextAreaChange}
            value={entryData.content}
            />
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
            <Button className={classes.modalButton} onClick={handleSubmit}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EntryModal;