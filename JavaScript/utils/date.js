/**
 * @author: Storm
 * @date: 2019/5/8
 * @email: wenyejie@foxmail.com
 */

export const monthLength = (date = new Date()) => {
  const val = new Date(date)
  val.setMonth(val.getMonth() + 1, 0)
  return val.getDate()
}

export const isOneDay = (date1, date2 = new Date()) => {
  return date1.toLocaleDateString() === date2.toLocaleDateString()
}

export const isOneMonth = (date1, date2 = new Date()) => {
  return date1.toLocaleDateString().slice(0, 7) === date2.toLocaleDateString().slice(0, 7)
}

export const isOneYear = (date1, date2 = new Date()) => {
  return date1.getFullYear() === date2.getFullYear()
}
