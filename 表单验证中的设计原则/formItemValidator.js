import { hasOwn, isNumber, isUndefined, isValue, extend } from './utils.js'

// 默认校验规则
const defaultValidators = {
 required (value, { required }) {
  return required ? isValue(value) : true
 },
 minlength (value, { minlength }) {
  if (!isNumber(minlength) || minlength < 0) {
   return true
  }
  if (Array.isArray(value)) {
   return value.length >= minlength
  }
  if (isUndefined(value)) {
   return false
  }
  return `${ value }`.length >= minlength
 },
 maxlength (value, { maxlength }) {
  if (!isNumber(maxlength) || maxlength < 0) {
   return true
  }
  if (Array.isArray(value)) {
   return value.length <= maxlength
  }
  if (isUndefined(value)) {
   return false
  }
  return `${ value }`.length <= maxlength
 },
 pattern (value, { pattern }) {
  return pattern.test(value)
 }
}

// 自定义验证, 避免是异步方法, 使用async, await
const customValidator = async (validator, value, rules) => {
 return await validator(value, rules)
}

class FormItemValidator {
 constructor (options) {
  const hasRules = hasOwn(options, 'rules')
  this.rules = hasRules ? options.rules : options
  this.validators = Object.assign({}, defaultValidators, options.validators)
 }

 // 对value rules进行校验
 validate (value) {
  const validity = {}
  const { rules, validators } = this
  for (let key in rules) {
   if (!hasOwn(rules, key) || key === 'validator') {
    continue
   }
   validity[`$${key}`] = typeof rules[key] === 'function' ? customValidator(rules[key], value, rules) : validators[key](value, rules)
  }
  validity.$valid = !Object.keys(validity).find(key => validity[key] === false)
  validity.$invalid = !validity.$valid
  return validity
 }

 // 扩展当前实例校验规则
 extend (key, validator) {
  extend(this.validators, key, validator)
 }

 // 扩展全局校验规则
 static extend (key, validator) {
  extend(defaultValidators, key, validator)
 }
}

export default FormItemValidator
