import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { DiaryEditor } from "../components/DiaryEditor";

export const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  console.log(diaryList);

  useEffect(() => {
    // 일기 데이터가 1나라도 있을 때 데이터 꺼내기
    if (diaryList.length) {
      // id나 어떤 값을 꺼내올 때는 해당 자료형이 다를 수 있기 때문에 맞춰주기. 여기서는 숫자형이니까 parseInt를 해준다.
      const targetDiary = diaryList.find((it) => +it.id === +id);

      // 잘못된 접근 시 돌려보내는 로직
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기 입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]); // diaryList와 id가 변하면 다른 데이터를 꺼내야 한다.

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};
