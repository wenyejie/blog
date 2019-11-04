import { each, hasOwn, extend } from './utils.js'
import FormItemValidator from './formItemValidator.js'
// 默认配置项 即适应大多数情况的配置
const defaultOptions = {}
// 默认校验规则
const defaultRules = {
  cnName: {
    minlength: 2,
    maxlength: 20,
    pattern: ''
  },
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

class FormValidator {
  constructor (options = {}) {
    const hasElement = hasOwn(options, 'element')
    this.element = hasElement ? options.element : options
    this.rules = Object.assign({}, defaultRules)

    this.instance()

    // 如果没有其它属性则退出
    if (!hasElement) {
      return this
    }
    // 扩展属性
    if (hasOwn(options, 'extend')) {
      this.extend(options.extend)
    }
  }

  // 对表单进行校验
  // 当options中有values属性时, 即覆盖式校验, 如果没有则取已经保存的值进行校验
  // 对全局校验规则进行扩展
  static extend (key, value) {
    extend(defaultRules, key, value)
  }

  // 支持 1: values, options; 2: {values}, 3: values
  validate (values = {}, options) {
    const validity = {}
    each(this.element, (item, key) => {
      validity[key] = item.validator.validate(values[key])
    })
    const keys = Object.keys(validity)
    validity.$valid = !keys.find(item => item.$valid === false)
    validity.$invalid = !validity.$valid
    return validity
  }

  // 对校验规则进行Validator的实例化
  instance () {
    each(this.element, (value, key) => {
      value.validator = new FormItemValidator(value)
    })
  }

  // 对当前实例进行扩展
  extend (key, value) {
    extend(this.rules, key, value)
  }
}

export default FormValidator
