import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../Store/rootReducer";
import { Diary } from "../../Interfaces/diary.interface";
import { getEntries, clearEntries } from "../../Features/Entry/entrySlice";
import EntryItem from "../Entry/entry";
import EntryModal from "../EntryModal/entryModal";
import { ArrowBackIos } from "@mui/icons-material";

// eslint-disable-next-line
const Entries: FC = () => {
  const { diaries } = useSelector((state: RootState) => state.diary);
  const { entries } = useSelector((state: RootState) => state.entry);
  const dispatch = useAppDispatch();

  const [diary, setDiary] = useState<Diary | null>();
  const [notFound, setNotFound] = useState<boolean>(false);

  const { id } = useParams();


useEffect(() => {
    dispatch(clearEntries());
    const filterDiary = diaries.filter((diary) => diary.id === id);
    filterDiary ? setDiary(filterDiary[0]) : setNotFound(true);
    filterDiary &&
      filterDiary[0]?.id &&
      dispatch(getEntries(filterDiary[0]?.id));
      // eslint-disable-next-line
  }, [diary]);

  if (!diary && notFound) return <div>Not Found</div>;
  else if (!diary && !notFound) return <div>Loading ...</div>;

  return (
    <>
      <div>
        <div className="d-flex justify-content-around pt-3">
          <Link to='/'>
            <ArrowBackIos className="text-secondary" />
            <span className="text-secondary">Back to Diaries</span>
          </Link>
          {diary && (
            <EntryModal
              btnTitle={"Add Entry"}
              mode={"add"}
              title={"Add Entry"}
              diary_id={diary?.id}
              id={""}
              editInfo={{ title: "", content: "" }}
            />
          )}
        </div>
        <hr />
        <div className="container">
          <div className="row justify-content-center">
            {entries.length > 0 &&
              entries.map((entry) => (
                <EntryItem entry={entry} key={entry?.id} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Entries;
