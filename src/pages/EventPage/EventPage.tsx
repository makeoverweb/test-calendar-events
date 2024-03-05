import { Button } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomModal from "../../components/CustomModal/CustomModal";

import s from "./EventPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getEventsData } from "../../store/events/selectors";
import { TaskItem } from "./TaskItem/TaskItem";

const EventPage = () => {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const eventsData = useSelector(getEventsData);
  const filteredData = eventsData.filter((item) => item.date === id);

  const onClickHandler = () => {
    setShowModal(true);
  };
  const goBack = () => {
    navigate("/");
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className={s.root}>
      <div className={s.header}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onClickHandler}>
          Мероприятие
        </Button>
        <div className={s.backBtn}>
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={goBack} />
        </div>
      </div>
      <div className={s.tasks}>
        {filteredData.map((el) => (
          <TaskItem key={el.id} event={el} />
        ))}
      </div>
      {id && (
        <CustomModal isOpen={showModal} onClose={handleClose} eventId={id} />
      )}
    </div>
  );
};

export { EventPage };
