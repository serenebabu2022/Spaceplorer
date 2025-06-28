export interface ApodData {
  title: string;
  url: string;
  explanation: string;
  date: string;
}
export interface Instrument {
  displayName: string;
}
export interface IPSData {
  activityId: string;
  eventTime: string;
  link: string;
  location: string;
  instruments: Instrument[];
}
