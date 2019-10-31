
// 判断一个数据为否为真值
export const isValue = (value) => {
  return value !== null && value !== undefined && value !== '' && (Array.isArray(value) ? value.length !== 0 : true)
}
