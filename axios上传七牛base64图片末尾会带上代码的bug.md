# axios上传七牛base64图片末尾会带上代码的bug

场景: 某些手机的某些浏览器中, 会导致, 方法报错

如题, 原因是因为:

实例化中有个transformRequest的方法, 有个from params serialize 编译的方法中导致, 编译错误, 会带上某段代码,
导致上传到七牛的时候, 报非法base64位编码

具体原因还在排查中...
