import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import { getDiaries } from "../../Features/Diary/diarySlice";
import DiaryList from "../Diary/diary";
import DiaryModal from "../DiaryModal/diaryModal";

// eslint-disable-next-line
const Home: FC = () => {

    const {user} = useSelector((state: RootState) => state.auth);
    const diaries = useSelector((state: RootState) => state.diary.diaries);
    const dispatch = useAppDispatch();

    useEffect(() => {
            user && user?.id && dispatch(getDiaries(user?.id));
            // eslint-disable-next-line
        }, [dispatch]);
        
        // console.log(diaries);
        // console.log(user?.id);

    return(
        <>
            <div>
                <div className="d-flex justify-content-around pt-3">
                    <h3>Diaries</h3>
                    <DiaryModal btnTitle={'Create Diary'} title={'Create Diary'} id={""} mode={'add'} editInfo={{title:"", type:"private"}} />
                </div>
                <hr />
                <div className="container" >
                    <div className="row justify-content-center">
                    {
                        diaries && diaries.length > 0 &&
                        diaries.map(diary => (
                            <DiaryList title={diary?.title} id={diary?.id} key={diary?.id} type={diary?.type}/>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
