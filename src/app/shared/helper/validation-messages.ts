export const userSignInValidationMessage = {
  userAuth: {
    required: `User Name can't be blank.`,
    whitespace: `User Name can't be blank.`,
    pattern: `Invalid User Name.`
  },
  userPass: {
    required: `Password can't be blank.`,
    whitespace: `Password can't be blank.`,
    badCredential: `User Name/Password doesn't valid`,
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
  drawTime: {
    required: `Draw Time can't be blank.`,
    whitespace: `Draw Time can't be blank.`
  }
}

export const purchaseValidationMsg = {

  prch: {
    memoNo: {
      required: `Memo Number can't be blank.`,
      whitespace: `Memo Number can't be blank.`
    },
    prchDt: {
      required: `Purchase can't be blank.`,
      whitespace: `Purchase can't be blank.`
    }
  },
  prchDtlsLst: {
    raffleId: {
      required: `Raffle can't be blank.`,
      whitespace: `Raffle can't be blank.`
    },
    draw: {
      required: `Draw can't be blank.`,
      whitespace: `Draw can't be blank.`
    },
    drawDate: {
      required: `Draw Date can't be blank.`,
      whitespace: `Draw Date can't be blank.`
    },
    rflStrFrom: {
      required: `From can't be blank.`,
      whitespace: `From can't be blank.`
    },
    rflEndTo: {
      required: `To can't be blank.`,
      whitespace: `To can't be blank.`
    },
    grpId: {
      required: `Group can't be blank.`,
      whitespace: `Group can't be blank.`
    },
    qty: {
      required: `quantity can't be blank.`,
      whitespace: `quantity can't be blank.`
    },
    rate: {
      required: `Rate can't be blank.`,
      whitespace: `Rate can't be blank.`
    },
  }
}

export const dispatchValidationMsg = {

  dsph: {
    memoNo: {
      required: `Memo Number can't be blank.`,
      whitespace: `Memo Number can't be blank.`
    },
    dsphDt: {
      required: `Dispatch can't be blank.`,
      whitespace: `Dispatch can't be blank.`
    }
  },
  dsphDtlsLst: {
    raffleId: {
      required: `Raffle can't be blank.`,
      whitespace: `Raffle can't be blank.`
    },
    draw: {
      required: `Draw can't be blank.`,
      whitespace: `Draw can't be blank.`
    },
    drawDate: {
      required: `Draw Date can't be blank.`,
      whitespace: `Draw Date can't be blank.`
    },
    rflStrFrom: {
      required: `From can't be blank.`,
      whitespace: `From can't be blank.`
    },
    rflEndTo: {
      required: `To can't be blank.`,
      whitespace: `To can't be blank.`
    },
    grpId: {
      required: `Group can't be blank.`,
      whitespace: `Group can't be blank.`
    },
    qty: {
      required: `quantity can't be blank.`,
      whitespace: `quantity can't be blank.`
    },
    rate: {
      required: `Rate can't be blank.`,
      whitespace: `Rate can't be blank.`
    },
  }
}