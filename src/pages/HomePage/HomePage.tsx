import { Badge, Calendar, CalendarProps, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { extractMonth, transformDate } from "../../helpers/common";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getEventsData } from "../../store/events/selectors";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

import s from "./HomePage.module.css";

const { Text } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  const eventsData = useSelector(getEventsData);

  const onSelectHandler = (date: Dayjs) => {
    navigate(`/events/${transformDate(date)}`);
  };

  const monthCellRender = (value: Dayjs) => {
    const listData = eventsData.filter((item) => {
      if (extractMonth(item.date) === extractMonth(transformDate(value))) {
        return item;
      }
    });
    return listData.length > 0 ? (
      <div className={s.month}>Количество задач: {listData.length}</div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = eventsData.filter((item) => {
      if (item.date === transformDate(value)) {
        return item;
      }
    });
    return (
      <ul className={s.events}>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={"success"} text={<Text>{item.name}</Text>} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar onSelect={onSelectHandler} cellRender={cellRender} />;
};

export { HomePage };
