export const userSignInValidationMessage = {
  userAuth: {
    required: `Email Address can't be blank.`,
    whitespace: `Email Address can't be blank.`,
    pattern: `Invalid Email Address.`
  },
  userPass: {
    required: `Password can't be blank.`,
    whitespace: `Password can't be blank.`,
    badCredential: `Email/Password doesn't valid`,
  }
}

export const modifyUserValidationMsg = {
  username: {
    required: `Username can't be blank.`,
    whitespace: `Username can't be blank.`
  },
  firstName: {
    required: `First Name can't be blank.`,
    whitespace: `First Name can't be blank.`,
    pattern: `Accept only [A-Za-z] characters`
  },
  lastName: {
    required: `Last Name can't be blank.`,
    whitespace: `Last Name can't be blank.`,
    pattern: `Accept only [A-Za-z] characters`
  },
  email: {
    required: `Email Address can't be blank.`,
    whitespace: `Email Address can't be blank.`,
    pattern: `Invalid Email Address.`
  },
  phoneNumber: {
    required: `Phone No can't be blank.`,
    whitespace: `Phone No can't be blank.`,
    pattern: `Accepted characters are 0-9(-).+`
  },
  userCategory: {
    required: `User Category can't be blank.`,
    whitespace: `User Category can't be blank.`,
  },
  address: {
    required: `Address can't be blank.`,
    whitespace: `Address can't be blank.`,
    pattern: `Accepted characters are A-Za-z 0-9,.`
  },
  password: {
    required: `Password can't be blank.`,
    whitespace: `Password can't be blank.`,
  },
  cnfPass: {
    required: `Confirm Password can't be blank.`,
    whitespace: `Confirm Password can't be blank.`,
    passNotMatch: `Password are not match.`,
  }
}