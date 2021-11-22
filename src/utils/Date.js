const getFormatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}-${month >= 10 ? month : "0" + month}-${
    day >= 10 ? day : "0" + day
  } ${hour >= 10 ? hour : "0" + hour}:${minute >= 10 ? minute : "0" + minute}`;
};

export { getFormatDate };
