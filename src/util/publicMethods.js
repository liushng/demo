import {
  CONSOLE
} from "./publicParams";
/**
 * console.log使用log打印
 * @param  {...any} arg 
 */
export const log = (...arg) => {
  if (CONSOLE) {
    return console.log(...arg)
  } else {
    return false
  }
}