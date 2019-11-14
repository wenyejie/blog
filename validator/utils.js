/**
 * 判断一个值是否为空值
 * @param value {*}
 * @return {boolean}
 */
export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    Number.isNaN(value) ||
    (Array.isArray(value) && value.length === 0)
  );
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 判断是否拥有该属性
 * @param object {Object}
 * @param property {string}
 * @return {boolean}
 */
export const hasOwn = (object, property) => {
  if (object === undefined || object === null) {
    return false;
  }
  return hasOwnProperty.call(object, property);
};

/**
 * 是否为数字
 * @param value {*} 值
 * @return {boolean}
 */
export const isNumber = value => {
  return typeof value === "number" && !Number.isNaN(value);
};
