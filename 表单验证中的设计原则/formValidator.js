import FormItemValidator from './formItemValidator.js'
// 默认配置项 即适应大多数情况的配置
const defaultOptions = {}
// 默认校验规则
const defaultRules = {}

class FormValidator {
  constructor (options = {}) {}

  // 对表单进行校验
  // 当options中有values属性时, 即覆盖式校验, 如果没有则取已经保存的值进行校验
  // 支持 1: values, options; 2: {values}, 3: values
  validate(values = {}, options) {}

  // 设置表单属性的值, 但是暂不做校验, 新值会覆盖旧值
  // 支持 1: key, value; 2: {key, value}; 3: [{key,value}, ...]
  values () {}

  // 对校验规则进行Validator的实例化
  instance () {}

  // 对当前实例进行扩展
  extend (options = {}) {}

  // 对全局校验规则进行扩展
  static extend (options = {}) {}
}

export default FormValidator
