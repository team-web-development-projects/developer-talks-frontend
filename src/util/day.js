import React from 'react'
import dayjs from "dayjs";

const day = (date) => {
  return dayjs(date).format("YY-MM-DD HH:mm:ss");
}

export default day