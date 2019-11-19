# 表单验证中的设计原则

## 前言

前段时间在公司进行了关于设计原则的分享, 突然间有点手痒, 想在表单验证中试试手, 也算自己对这次分享得一次总结, 重温一下.

本文中涉及到设计原则, 这里不在详细展开, 这里只对设计原则进行实际应用的讨论

## 目录

- [设计原则](#设计原则)

## 设计原则

- 单一职责: 类发生更改的原因应该只有一个.
- 开闭原则: 软件实体（类，模块，方法等等）应当对扩展开放，对修改关闭，即软件实体应当在不修改的前提下扩展.
- 里氏替换: 派生类型必须可以替换它的基类型.
- 接口隔离: 不应该强迫客户依赖于它们不用的方法.
- 依赖倒置: 高层模块不应该依赖于低层模块，二者都应该依赖于抽象, 抽象不应该依赖于细节，细节应该依赖于抽象.
- 迪米特法则: 又叫作最少知识原则, 一个对象应当对其他对象有尽可能少的了解,不和陌生人说话.

## 设计

### 设计预想

- 自由配置
- 拓展性良好
- 扩展性良好
- 多种数据入口
- 多框架适配

### formValidator.js

```javascript
import FormItemValidator from "./formItemValidator.js";
// 默认配置项 即适应大多数情况的配置
const defaultOptions = {};
// 默认校验规则
const defaultRules = {};

class FormValidator {
  constructor(options = {}) {}

  // 对表单进行校验
  // 当options中有values属性时, 即覆盖式校验, 如果没有则取已经保存的值进行校验
  validate(values = {}, options) {}

  // 设置表单属性的值, 但是暂不做校验, 新值会覆盖旧值
  values() {}

  // 对校验规则进行Validator的实例化
  instance() {}

  // 对当前实例进行扩展
  extend(options = {}) {}

  // 对全局校验规则进行扩展
  static extend(options = {}) {}
}

export default FormValidator;
```

### formItemValidator.js

```javascript
// 默认校验规则
const defaultRules = {};

class FormItemValidator {
  constructor(options) {}

  // 对value rules进行校验
  validate() {}

  // 扩展当前实例校验规则
  extend() {}

  // 扩展全局校验规则
  static extend() {}
}

export default FormItemValidator;
```

### utils.js

```javascript
// 工具类
```

### 设计结果

```javascript
const rules = {
  required: true,
  forms: {
    phone: {
      maxlength: 11,
      minlength: 11,
      pattern: /^1\d{10}$/
    },
    smsCode: {
      minlength: 6,
      maxlength: 6,
      pattern: /^\d{6}$/
    }
  }
};

const values = {
  phone: "12345678910",
  smsCode: "123456"
};

const test = new FormValidator(rules);
const result = test.validate(values);
```
