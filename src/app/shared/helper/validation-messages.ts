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
  userCode: {
    required: `userCode can't be blank.`,
    whitespace: `userCode can't be blank.`
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
    mustMatch: `Password are not match.`,
  }
}

export const modifyGroupValidationMsg = {
  groupName: {
    required: `Group Name can't be blank.`,
    whitespace: `Group Name can't be blank.`,
    pattern: `Accepted characters are A-Za-z 0-9,.`
  }
}

export const modifyRaffleValidationMsg = {
  raffleName: {
    required: `Raffle Name can't be blank.`,
    whitespace: `Raffle Name can't be blank.`,
    pattern: `Accepted characters are A-Za-z `
  },
  raffleCode: {
    required: `Raffle Code can't be blank.`,
    whitespace: `Raffle Code can't be blank.`,
    pattern: `Accepted characters are A-Za-z `
  },
  series: {
    required: `Series can't be blank.`,
    whitespace: `Series can't be blank.`,
    pattern: `Accepted characters are 0-9 `
  },
  playDay: {
    required: `Play Day can't be blank.`,
    whitespace: `Play Day can't be blank.`
  },
  playTime: {
    required: `Play Time can't be blank.`,
    whitespace: `Play Time can't be blank.`
  },
  drawsTime: {
    required: `Draw Time can't be blank.`,
    whitespace: `Draw Time can't be blank.`
  }
}