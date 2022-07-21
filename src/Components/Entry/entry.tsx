import React, { FC } from "react";
import '../../App.css';
import { Entry } from "../../Interfaces/entry.interface";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import EntryModal from "../EntryModal/entryModal";


const useStyles = makeStyles({
  modalButton: {
    color: "grey",
    border: "1px solid grey",
    outline: "none",
    borderRadius: "10px",
    "&:hover, &:active": {
      color: "white",
      border: "1px solid grey",
      borderRadius: "10px",
      backgroundColor: "grey",
      outline: "none",
    },
  },
});

interface Props {
  entry: Entry;
}

const EntryItem: FC<Props> = ({ entry }) => {
  const classes = useStyles();
  return (
    <>
      <Card
        className="m-2 text-left border border-secondary"
        style={{ width: "100%" }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {entry?.title.toLocaleUpperCase()}
          </Typography>
          <div className="text.secondary multi-line-truncate">
            {entry?.content}
          </div>
        </CardContent>
        <CardActions>
          {/* <DiaryModal
            btnTitle={"Edit"}
            title={"Edit Diary"}
            mode={"edit"}
            id={id}
            editInfo={editData}
          /> */}
          <EntryModal
            btnTitle={"Edit Entry"}
            id={entry?.id}
            mode={"edit"}
            title={"Edit Entry"}
            diary_id={entry?.diaryId}
            editInfo={{ title: entry?.title, content: entry?.content }}
          />
        </CardActions>
      </Card>
    </>
  );
};

export default EntryItem;