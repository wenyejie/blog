import { hasOwn } from './utils.js'
import rule from './rule/index.js'

class Validator {
  /**
   * 构造函数
   * @param rules {Object} 校验规则
   * @param options {Object} 选项
   */
  constructor(rules, options) {
    this.rules = rules
    this.options = options
    this.$errors = {}
    this.$validity = {}
  }

  /**
   * 校验属性
   * @param value {*} 属性值
   * @param propRule {Object} 校验规则
   * @return {Object}
   */
  validateProp(value, propRule) {
    const validity = {}
    for (let key in propRule) {
      if (!propRule.hasOwnProperty(key)) {
        continue
      }
      if (typeof propRule[key] === 'function') {
        validity[key] = propRule[key](value, propRule)
      } else if (typeof rule[key] === 'function') {
        validity[key] = rule[key](value, propRule)
      }
    }
    validity.$valid = Object.values(validity).filter((item) => !item).length === 0
    validity.$invalid = !validity.$valid
    return validity
  }

  // 调整验证规则
  setRules(rules) {
    this.rules = rules
  }

  // 触发相关钩子
  trigger(eventName, ...rest) {
    if (typeof this[eventName] !== 'function') {
      return
    }
    this[eventName].apply(this, rest)
  }

  /**
   * 校验
   * @param values {Object} 值
   * @param callback {Function?} 回调
   * @return {boolean|Object|Promise}
   */
  validate(values, callback) {
    if (!values) {
      console.warn('参数values错误')
      return false
    }
    this.trigger('beforeValidate', values)
    const rules = this.rules
    const validity = {}
    for (let key in rules) {
      if (!hasOwn(rules, key)) {
        continue
      }
      validity[key] = this.validateProp(values[key], rules[key])
    }
    validity.$valid = Object.values(validity).filter((item) => item.$invalid).length === 0
    validity.$invalid = !validity.$valid
    validity.$errors = this.$errors
    this.$validity = validity
    this.trigger('afterValidate', this.$validity)
    if (typeof callback === 'function') {
      callback(validity)
      return validity
    }
    return new Promise((resolve) => resolve(validity))
  }
}

export default function(rules, options) {
  return new Validator(rules, options)
}
