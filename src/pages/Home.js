import React, { useContext, useEffect, useState } from "react";
import { MyHeader } from "./../components/MyHeader";
import { MyButton } from "./../components/MyButton";
import { DiaryStateContext } from "../App";
import { DiaryList } from "../components/DiaryList";

export const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  // diaryList를 curDate의 날짜에 따라서 가공
  const [data, setData] = useState([]);

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // 달이 바뀔 때마다 작동 되도록
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime(); // 이번 년도 이번 월의 1일

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59 // 그 날의 끝까지를 포함시켜줘야 한다.
      ).getTime(); // 이번 년도 이번 월의 마지막 일

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      ); // 해당 월 1일과 마지막 일에 작성된 일기 filter
    }
  }, [diaryList, curDate]);
  // 왜 diaryList가 바뀔때 동작해야  하는가?
  // diaryList가 바뀌었다는 것은 일기가 새롭게 추가 수정 삭제 변경되었다는 것을 의미한다. 그리새 list를 다시 변경해줘야 되기 때문에!

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </>
  );
};
