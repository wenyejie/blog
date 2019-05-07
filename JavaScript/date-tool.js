/**
 * @author: Storm
 * @date: 2019/5/6
 * @email: wenyejie@foxmail.com
 */

/**
 * 获取月末
 * @param date
 */
const monthLength = (date = new Date()) => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + 1, 0)
  console.log(date.toISOString(), newDate.toISOString())
}

monthLength()
