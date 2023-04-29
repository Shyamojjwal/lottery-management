export const appSettings = {
  appTitle: 'Lottery Management System',
  credentialsKey: 'lottery-user_token',
  userInfo: 'lottery-user_info',
  ajaxTimeout: 300000,
  RegExp: {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
    phoneNo: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
    alphabet: /^[A-Za-z]+$/,
    numeric: /^[0-9]*$/,
    alphaNumeric: /^[a-zA-Z0-9]+$/,
  }
};
