import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from "./MyButton";
import { DiaryItem } from "../components/DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

export const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest"); // 정렬 기준 상태
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return +item.emotion > 3;
      } else {
        return +item.emotion <= 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        // 문자열이 들어올 수 있기 때문에 parseInt를 해준다.
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // 원본 배열을 정렬은 X => 깊복
    const copyList = JSON.parse(JSON.stringify(diaryList)); // 문자열 => 객체

    // all 이면 다 보여주고 아니면  filter()로 걸러줘야 된다. 그러나 1~3은 나쁜감정 4~5는 좋은 감정으로 걸러주는게 어렵다. => filterCallBack함수를 만들어준다.
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    // 정렬하고자 하는 데이터가 객체이면 그냥은 안된다. 비교함수를 만들어준다.
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>

        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => {
        return <DiaryItem key={it.id} {...it} />;
      })}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};
