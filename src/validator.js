const regexps = {
  num: /^[1-9]+$/,
  month: /^\d{4}-(0[1-9]|1[0-2])$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const createValidator = (type, regexps) => (value) => regexps[type].test(value);

export const isEmpty = (value) =>
  value == null || !(Object.keys(value) || value).length;

export const isEmail = createValidator("email", regexps);

export const isNumber = createValidator("num", regexps);

export const isMonth = createValidator("month", regexps);
