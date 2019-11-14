import { isEmpty } from "../utils.js";

/**
 * 判断一个值是否为该类型
 * @param value {*} 值
 * @param type {string} 类型
 * @return {boolean}
 */
export default function(value, { type }) {
  if (isEmpty(value) || isEmpty(type)) {
    return true;
  }
  return typeof value === type;
}
