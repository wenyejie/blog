# 常见Web安全攻防

- [XSS](#一-xss)
- [CSRF](#二-csrf)
- [点击劫持](#三-clickjacking)
- [URL跳转漏洞](#四-url跳转漏洞)
- [SQL注入](#五-sql注入)
- [OS命令注入](#六-os命令注入攻击)

## 一. XSS

> XSS(Cross-Site Scripting 跨站脚本攻击)
- web页面的内容来自服务端
- 不要从url, `document.referrer`, `document.forms`等DOM API重获取数据
- 不要使用`eval`, `new Function`, `document.write`, `document.writeln`, `setInterval`, `setTimeout`, `innerHTML`, `document.createElement`等可执行字符串的方法
- 对字符串参数进行`escape`转义处理
- 开启CSP; 即在headers上设置`Content-Security-Policy`
- 对用户输入进行转义
- 对一些cookie进行**HttpOnly**设置

## 二. CSRF

> CSRF(Cross Site Request Forgery 跨站请求伪造)
- Get请求不对数据进行修改
- 不让第三方站点访问到用户cookie
- 阻止第三方网站请求
- 请求时附带验证信息, 验证码|Token
- referrer check

## 三. clickjacking

> clickjacking点击劫持 即iframe 劫持
- 设置`X-FRAME-OPTIONS`

## 四. URL跳转漏洞

> 通过站点一些跳转规则, 跳转过去
- referer限制
- 加入Token验证

## 五. SQL注入

> 通过用户输入, 利用一些SQL规则, 非法获取数据
- 严格限制web应用的数据库操作权限
- 后端检测用户输入代码是否合理
- 对特殊字符进行转义
- 使用数据库提供的接口进行查询


## 六. OS命令注入攻击

> 原理与SQL注入类似
- 省略
