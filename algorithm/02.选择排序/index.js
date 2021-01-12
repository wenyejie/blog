/**
 * @author: Storm
 * @date: 1/10/21
 * @email: wenyejie@foxmail.com
 */

/***
 * 选择排序
 * @param data {Array} 数据
 * @return {Array}
 */
const selectSort = (data) => {
  const length = data.length
  // 当长度为1或者0时不需要排序
  if (length <= 1) {
    return data
  }
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i
    // 循环查找最小数
    for (let j = i + 1; j < length; j++) {
      // 判断是否比当前标记的数小, 如果是则标记当前下标
      if (data[j] < data[minIndex]) {
        minIndex = j
      }
    }
    // 交换两者
    if (minIndex !== i) {
      const temp = data[i]
      data[i] = data[minIndex]
      data[minIndex] = temp
    }
  }
  return data
}

const data = [8, 4, 6, 9, 3, 5, 1, 7, 2]

console.log(selectSort(data))
