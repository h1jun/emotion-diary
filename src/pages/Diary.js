import React from "react";
import { useParams } from "react-router-dom";

export const Diary = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <div>Diary</div>
      <p>이곳은 Diary 입니다.</p>
    </>
  );
};
