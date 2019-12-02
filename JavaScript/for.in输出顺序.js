const array = [1, 2, 3, 4, 5]
array.demo = 1
array.push(6)
array.b = 'b'
array.a = 'a'

for (let key in array) {
  console.log(key)
}

// 结论, 先循环数字然后按照输入数序展示
