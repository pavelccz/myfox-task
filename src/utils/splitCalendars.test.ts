import { splitCalendars } from './splitCalendars';
import { CalendarState, type Calendar } from '../graphql/calendars';

const c = (id: string, state: Calendar['state']): Calendar => ({
  id,
  state,
  from: null,
  shop: null,
  subject: null,
  carts: [],
});

test('splits calendars into current and again buckets', () => {
  const calendars: Calendar[] = [
    c('1', CalendarState.Open),
    c('2', CalendarState.Paid),
    c('3', CalendarState.Canceled),
    c('4', CalendarState.Storno),
  ];

  const { current, again } = splitCalendars(calendars);

  expect(current.map((x) => x.id)).toEqual(['1']);
  expect(again.map((x) => x.id)).toEqual(['2', '4']);
});
