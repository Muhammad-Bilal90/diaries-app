import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import { getDiaries } from "../../Features/Diary/diarySlice";
import Diary from "../Diary/diary";
import DiaryModal from "../DiaryModal/diaryModal";

const Home: FC = () => {

    const { diaries } = useSelector((state: RootState) => state.diary);
    const { user } = useSelector((state: RootState) => state.auth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        user && user?.id && dispatch(getDiaries(user?.id))
    }, [dispatch, user]);

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
                        diaries.length > 0 &&
                        diaries.map(diary => (
                            <Diary id={diary?.id} title={diary?.title} type={diary?.type} key={diary?.id}/>
                        ))
                    }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;