export interface TEvents {
  data: TEvent[];
}
export interface TEvent {
  id: string;
  date: string;
  name: string;
  start: string | null;
  end: string | null;
  notificationTime: number;
  isShowed: boolean;
}
