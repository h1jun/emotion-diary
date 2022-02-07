import React from "react";
export const EmotionItem = React.memo(
  // 전달받는 요소 중 함수가 있다. onClick 함수는 useCallback으로 묶어 놓아야 한다.
  ({ emotion_id, emotion_img, emotion_descript, onClick, isSelected }) => {
    return (
      <div
        onClick={() => onClick(emotion_id)}
        className={[
          "EmotionItem",
          isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off",
        ].join(" ")}
      >
        <img src={emotion_img} alt="" />
        <span>{emotion_descript}</span>
      </div>
    );
  }
);
