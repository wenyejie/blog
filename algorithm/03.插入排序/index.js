/**
 * @author: Storm
 * @date: 1/10/21
 * @email: wenyejie@foxmail.com
 */

/***
 * 插入排序
 * @param data {Array} 数据
 * @return {Array}
 */
const insertSort = (data) => {
  const length = data.length
  // 当长度为1或者0时不需要排序
  if (length <= 1) {
    return data
  }
  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {

    }
  }
  return data
}

const data = [8, 4, 6, 9, 3, 5, 1, 7, 2]

console.log(insertSort(data))
