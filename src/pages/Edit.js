import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log(id);

  const mode = searchParams.get("mode");
  console.log(mode);

  return (
    <>
      <div>Edit</div>
      <p>이곳은 Edit 입니다.</p>
      <button onClick={() => setSearchParams({ who: "test" })}>
        QS 바꾸기
      </button>
      <button onClick={() => navigate("/home")}>Home으로 가기</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </>
  );
};
