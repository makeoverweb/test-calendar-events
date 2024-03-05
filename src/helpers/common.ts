import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function transformDate(originalDate: Dayjs): string {
  return dayjs(originalDate, "ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)").format(
    "M-D-YYYY"
  );
}

export const transformTimeToDate = (timeString: string): dayjs.Dayjs => {
  const [hours, minutes] = timeString.split(":");
  const today = dayjs().startOf("day"); // Установка даты на сегодня и сброс времени
  return today
    .set("hour", parseInt(hours, 10))
    .set("minute", parseInt(minutes, 10));
};

export const extractMonth = (dateString: string): number => {
  const date = dayjs(dateString, "M-D-YYYY");
  return date.month() + 1; // Добавляем 1, потому что месячный индекс начинается с 0
};
