import { Button } from "antd";
import { TEvent } from "../../../store/events/entities";
import s from "./TaskItem.module.css";
import { useDispatch } from "react-redux";
import { deleteEventAction } from "../../../store/events/actions";
import CustomModal from "../../../components/CustomModal/CustomModal";
import { useState } from "react";

interface Props {
  event: TEvent;
}

const TaskItem = ({ event }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const onDeleteHandler = (id: string) => {
    dispatch(deleteEventAction(id));
  };

  return (
    <div className={s.root}>
      <div className={s.left}>
        <div className={s.title}>{event.name}</div>
        <div className={s.timeWrapper}>
          {event.start} {event.end && `до ${event.end}`}
        </div>
      </div>
      <div className={s.right}>
        <Button type="link" className={s.btn} onClick={onClickHandler}>
          Редактировать
        </Button>
        <span className={s.separator}></span>
        <Button type="link" onClick={() => onDeleteHandler(event.id)}>
          Удалить
        </Button>
      </div>
      {event && (
        <CustomModal
          isOpen={showModal}
          onClose={handleClose}
          eventId={event.id}
          event={event}
        />
      )}
    </div>
  );
};

export { TaskItem };
