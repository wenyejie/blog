# Javascript - 限制非法的金额输入

今天闲来无事(项目有用到), 琢磨了一个正则用以限制金额的非法输入

## 先上本体:

```javascript
const limitAmount = /([^0-9.])|((?<=\d+\.\d{2})\d+)|((?<=^0)0+)|(^0(?=[1-9]))|((?<=\.\d*)\.)|(^\.)/g

// 主要用法, 把非法的金额字符输入替换为''
let amount = '001.11'
amount = amount.replace(limitAmount, '') // 1.11
```

## 实例代码:

```html
<input type="text" id="amount" />
<script>
  const rLimitAmount = /([^0-9.])|((?<=\d+\.\d{2})\d+)|((?<=^0)0+)|(^0(?=[1-9]))|((?<=\.\d*)\.)|(^\.)/g
  const $amount = document.querySelector('#amount')

  $amount.addEventListener('input', () => {
    $amount.value = $amount.value.replace(rLimitAmount, '')
  })
</script>
```

详细请见: [CodePen - javascript 限制非法的金额输入](https://codepen.io/wenyejie/pen/oNXRXwo)

> 这里要说明一下为什么不用 `<input type="number" />` `type="number"`的输入框, 这样不就可以省略很多非
> 法校验了嘛?

这个主要是因为 `<input type="number" />` 的输入框, 当用户输入非法的`number`字符时, 获取到的`value`为
空字符串

## 正则说明:

> 接下来看看这段正则.

正则是通过多个'|'来组成

- `([^0-9.])` // 限制非数字和小数点的输入
- `((?<=\d+\.\d{2})\d+)` // 限制小数点后两位之后的其它数字输入
- `((?<=^0)0+)` // 限制开始的多个 0 的输入
- `(^0(?=[1-9]))` // 限制开头为 0 但并不是作为整数 0 的输入
- `((?<=\.\d*)\.)` // 限制多个'.'点的输入
- `(^\.)` // 限制开头的'.'号输入

并把按照容易触发的先后顺序排列

## 总结:

总的来说就是正则的运用, 包括: `正向肯定`, `逆向肯定`
