export const formatDate = (date, type) => {
  let day = date.getDate() + '';
  let month = date.getMonth() + 1 + '';
  let year = date.getFullYear() + '';
  let hour = date.getHours() + '';
  let minutes = date.getMinutes() + '';

  const checkZero = (data) => {
    if (data.length === 1) {
      data = '0' + data;
    }
    return data;
  };
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);

  if (type === 'onlyDate') {
    return day + '/' + month + '/' + year + ' ';
  }

  return day + '/' + month + '/' + year + ' ' + hour + ':' + minutes;
};
