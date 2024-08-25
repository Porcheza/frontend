import * as dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
// import plugin
import "dayjs/locale/en"; // import locale

export const registerDayJs = () => {
  dayjs.extend(isLeapYear); // use plugin
  dayjs.locale("en"); // use locale
};
