import dateformat from 'dateformat';

export function localDatetime(value) {
  return dateformat(value, 'yyyy-mm-dd HH:MM:ss');
}

export function localDate(value) {
  return dateformat(value, 'yyyy-mm-dd');
}

export function previousDate(value) {
  return dateformat(
    new Date(value.getTime() - 24 * 60 * 60 * 1000),
    'yyyy-mm-dd'
  );
}

export function localTime(value) {
  return dateformat(value, 'HH:MM:ss');
}

export function localDateYearMonth(value) {
  return dateformat(value, 'yyyy-mm');
}

export function localDateYear(value) {
  return dateformat(value, 'yyyy');
}
