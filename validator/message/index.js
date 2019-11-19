export const required = "$label不能为空";

export const minlength = "$label不能小于$minlength位";

export const maxlength = "$label不能大于$maxlength位";

export const length = "$label必须为$length位";

export const pattern = "$label格式错误";

export const type = "$label类型错误";

const messages = {
  required,
  minlength,
  maxlength,
  length,
  pattern,
  type
};

export default (label, rules) => {};
