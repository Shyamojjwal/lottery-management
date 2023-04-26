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