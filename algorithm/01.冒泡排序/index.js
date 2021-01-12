/**
 * @author: Storm
 * @date: 1/10/21
 * @email: wenyejie@foxmail.com
 */

/***
 * 冒泡排序
 * @param data {Array} 数据
 * @return {Array}
 */
const bubbleSort = (data) => {
  const length = data.length
  // 当长度为1或者0时不需要排序
  if (length <= 1) {
    return data
  }
  for (let i = 0; i < length; i++) {
    for (let j = length - 2; j >= i; j--) {
      // 当前者大于后者时, 交换两者位置
      if (data[j] > data[j + 1]) {
        const temp = data[j]
        data[j] = data[j + 1]
        data[j + 1] = temp
      }
    }
  }
  return data
}

const data = [8, 4, 6, 9, 3, 5, 1, 7, 2]

console.log(bubbleSort(data))
