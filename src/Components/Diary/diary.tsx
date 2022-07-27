import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/rootReducer";
import { Entry } from "../../Interfaces/entry.interface";
import http from "../../Services/api";
import DiaryModal from "../DiaryModal/diaryModal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

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
  id?: string;
  title: string;
  type: "private" | "public";
}

type EditData = {
  title: string;
  type: "private" | "public";
};

const Diary: FC<Props> = ({ id, title, type }) => {
  const classes = useStyles();
  const [editData, setEditData] = useState<EditData>({
    title: "",
    type: "public",
  });
  const [count, setCount] = useState(0);

  const { diaries } = useSelector((state: RootState) => state.diary);

  useEffect(() => {
    const currentDiary = diaries.filter((diary) => diary?.id === id);
    currentDiary &&
      setEditData({ title: currentDiary[0].title, type: currentDiary[0].type });
    http
      .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
      .then(({ entries }) => {
        setCount(entries.length);
      });
  }, [diaries, id]);

  return (
    <>
      <Card
        className="col-12 col-md-5 col-lg-3 m-2 text-left border border-secondary"
        // sx={{ minwidth: 150 }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {title.toLocaleUpperCase()}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {type}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {count} Enteries
          </Typography>
        </CardContent>
        <CardActions>
          <DiaryModal
            btnTitle={"Edit"}
            title={"Edit Diary"}
            mode={"edit"}
            id={id}
            editInfo={editData}
          />  
          <Link to={`/${id}/entries`}>
            <Button className={classes.modalButton} size="small">
              Enteries
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default Diary;
