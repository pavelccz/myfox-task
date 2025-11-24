import { CalendarStateEnum, type Calendar } from "../graphql/calendars";

export interface SplitCalendarsResult {
  current: Calendar[];
  again: Calendar[];
}

export const splitCalendars = (calendars: Calendar[]): SplitCalendarsResult => {
  const current: Calendar[] = [];
  const again: Calendar[] = [];

  for (const cal of calendars) {
    if (cal.state === CalendarStateEnum.Open) {
      current.push(cal);
    } else if (cal.state !== CalendarStateEnum.Canceled) {
      again.push(cal);
    }
  }

  return { current, again };
};
