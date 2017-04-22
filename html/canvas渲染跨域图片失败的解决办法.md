# canvas渲染跨域图片失败的解决办法

## 报错信息如下

`
Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported. at HTMLImageElement.images.onload (eval at 440 (http://192.168.xx.xxx:8080/38.js:247:1), <anonymous>:158:26)
`

## 解决方法
```javascript
// 生成图片
const images = document.createElement('img');

// 解决canvas渲染跨域图片失败的办法
//可选值：anonymous，*
images.crossOrigin = 'anonymous';
images.src = 'http://www.xxx.com/01.png';
```

或者

```html
<img src="http://www.xxx.com/01.png" crossorigin="anonymous">
```

核心是请求头中包含了 Origin: "anonymous"或"*" 字段，响应头中就会附加上 Access-Control-Allow-Origin: * 字段，问题解决。