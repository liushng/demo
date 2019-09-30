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
import localforage from "localforage"
// vuex持久化
export function vuexLsPersistent(store) {
  localforage.getItem('vuex').then(res => {
    if (res && typeof res == 'object') {
      store.replaceState(res);
    }
  });
  store.subscribe((mutation, state) => {
    localforage.setItem('vuex', state).then(res => {});
  })
}