const eth = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('This field is required'));
  } else if (!value.match(/\b0x[a-fA-F0-9]{40}\b/)) {
    callback(new Error('Ethereum wallet is not valid'));
  } else {
    callback();
  }
};

const chkbox = (rule, value, callback) => {
  if (!value || value === false) {
    callback(new Error('You need to comply with the terms to proceed'));
  } else {
    callback();
  }
};

const phoneNumber = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('This field is required'));
  } else if (value.match(/[^\d\)\(]/)) {
    callback(new Error('Phone is not valid'));
  } else {
    callback();
  }
};

const email = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('This field is required'));
  } else if (!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    callback(new Error('Email is not valid'));
  } else {
    callback();
  }
};

const numbers = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('This field is required'));
  } else if (!value.match(/[\d\.]*/)) {
    callback(new Error('The field must be a number'));
  } else if (parseInt(value) <= 0) {
    callback(new Error('Can not be less than zero'));
  } else {
    callback();
  }
};

export default {
  eth,
  chkbox,
  phoneNumber,
  email,
  numbers
}
