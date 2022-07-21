import { FC } from "react";
import '../../App.css';
import { Entry } from "../../Interfaces/entry.interface";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EntryModal from "../EntryModal/entryModal";

interface Props {
  entry: Entry;
}

const EntryItem: FC<Props> = ({ entry }) => {
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
