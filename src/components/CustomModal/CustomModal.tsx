import {
  TimePicker,
  Input,
  Modal,
  ModalProps,
  message,
  InputNumber,
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import {
  createEventAction,
  updateEventAction,
} from "../../store/events/actions";
import s from "./CustomModal.module.css";
import { v4 as uuidv4 } from "uuid";
import { TEvent } from "../../store/events/entities";
import { transformTimeToDate } from "../../helpers/common";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  event?: TEvent;
} & ModalProps;

function CustomModal({ isOpen, onClose, eventId, event, ...rest }: Props) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [notificationTimeInMinutes, setNotificationTimeInMinutes] =
    useState<number>(0);

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: event ? "Событие обновлено!" : "Событие добавлено!",
    });
  };

  const onConfirm = () => {
    if (event) {
      dispatch(
        updateEventAction({
          id: event.id,
          date: event.date,
          name: title,
          start: (startTime && startTime.format("HH:mm")) || null,
          end: (endTime && endTime.format("HH:mm")) || null,
          notificationTime: notificationTimeInMinutes || 0,
          isShowed: event.isShowed,
        })
      );
    } else {
      dispatch(
        createEventAction({
          id: uuidv4(),
          date: eventId,
          name: title,
          start: (startTime && startTime.format("HH:mm")) || null,
          end: (endTime && endTime.format("HH:mm")) || null,
          notificationTime: notificationTimeInMinutes || 0,
          isShowed: false,
        })
      );
    }
    success();
    onClose();
  };

  const onAfterOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTitle("");
      setStartTime(null);
      setEndTime(null);
    } else {
      if (event) {
        setTitle(event.name);
        event.start && setStartTime(transformTimeToDate(event.start) || null);
        event.end && setEndTime(transformTimeToDate(event.end) || null);
        setNotificationTimeInMinutes(event.notificationTime || 0);
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      okButtonProps={{ disabled: !title }}
      onOk={onConfirm}
      afterOpenChange={onAfterOpenChange}
      {...rest}
    >
      <div className={s.content}>
        <Input
          placeholder="Введите название"
          className={s.inputName}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={s.timeWrapper}>
          <TimePicker
            suffixIcon={<ClockCircleOutlined />}
            placeholder="Выберите время"
            value={startTime}
            className={s.timePicker}
            onChange={(time) => setStartTime(time)}
            format="HH:mm"
          />
          <TimePicker
            suffixIcon={<ClockCircleOutlined />}
            placeholder="Выберите время"
            value={endTime}
            className={s.timePicker}
            onChange={(time) => setEndTime(time)}
            format="HH:mm"
            disabled={!startTime}
          />
          <div className={s.notificationTime}>
            <InputNumber
              placeholder="количество"
              value={notificationTimeInMinutes}
              onChange={(value) => setNotificationTimeInMinutes(value || 0)}
              type="number"
              addonAfter="минут"
              addonBefore="Уведомить за"
              disabled={!startTime}
            />
          </div>
        </div>
      </div>
      {contextHolder}
    </Modal>
  );
}

export default CustomModal;
