import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage";
import { EventPage } from "./pages/EventPage/EventPage";

import s from "./App.module.css";
import { useEffect } from "react";
import dayjs from "dayjs";
import { notification } from "antd";
import { getEventsData } from "./store/events/selectors";
import { useSelector } from "react-redux";

function App() {
  const eventsData = useSelector(getEventsData);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = dayjs();
      eventsData.forEach((event) => {
        const { id, date, name, start, end, notificationTime = 0 } = event;
        const eventDateTime = dayjs(`${date} ${start}`);
        const notificationDateTime = eventDateTime.subtract(
          notificationTime,
          "minute"
        );
        // если currentDateTime находится в промежутке между notificationDateTime и eventDateTime
        if (currentDateTime.isBetween(notificationDateTime, eventDateTime)) {
          const notificationKey = `event-notification-${id}`;
          const message = `Событие "${name}" начнется через ${notificationTime} минут`;
          notification.open({
            message: message,
            description: `Начало события: ${start}, окончание: ${end}`,
            key: notificationKey,
            duration: null, // Уведомление не будет автоматически закрыто
          });
        }
      });
    }, 30000); // Проверка каждые 30 секунд

    return () => clearInterval(interval);
  }, [eventsData]);

  return (
    <div className={s.root}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventPage />} />
      </Routes>
    </div>
  );
}

export default App;
