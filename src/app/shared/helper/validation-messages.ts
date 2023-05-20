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

export const userForgotPassValidationMessage = {
  userAuth: {
    required: `Username or Email can't be blank.`,
    whitespace: `Username or Email can't be blank.`,
    wrongUserName: `Invalid Username or Email`,
  }
}

export const modifyUserProValidationMsg = {
  userProfile: {
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
  },
  userCredential: {
    oldPassword: {
      required: `Old Password can't be blank.`,
      whitespace: `Old Password can't be blank.`,
      wrongPass: `Old Password doesn't match.`,
    },
    newPassword: {
      required: `New Password can't be blank.`,
      whitespace: `New Password can't be blank.`,
    },
    cnfPassword: {
      required: `Confirm Password can't be blank.`,
      whitespace: `Confirm Password can't be blank.`,
      mustMatch: `Password are not match.`,
    }
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

export const itemObjectArrayFieldValidationMsg = {

  objFieldMsg: {
    memoNo: {
      required: `Memo Number can't be blank.`,
      whitespace: `Memo Number can't be blank.`
    },
    prchDt: {
      required: `Purchase Date can't be blank.`,
      whitespace: `Purchase Date can't be blank.`
    },
    userId: {
      required: `User can't be blank.`,
      whitespace: `User can't be blank.`
    },
    dsphDt: {
      required: `Dispatch Date can't be blank.`,
      whitespace: `Dispatch Date can't be blank.`
    },
    drwDateReturnDate: {
      required: `Return Date can't be blank.`,
      whitespace: `Return Date can't be blank.`
    },
    advReturnDate: {
      required: `Return Date can't be blank.`,
      whitespace: `Return Date can't be blank.`
    },
    schemeName: {
      required: `Scheme Name can't be blank.`,
      whitespace: `Scheme Name can't be blank.`
    },
    drwFrm: {
      required: `Draw From can't be blank.`,
      whitespace: `Draw From can't be blank.`
    },
    drwTo: {
      required: `Draw To can't be blank.`,
      whitespace: `Draw To can't be blank.`
    },
    series: {
      required: `Series can't be blank.`,
      whitespace: `Series can't be blank.`
    },
    state: {
      required: `State can't be blank.`,
      whitespace: `State can't be blank.`
    },
    dop: {
      required: `Date of Purchase can't be blank.`,
      whitespace: `Date of Purchase can't be blank.`
    }
  },
  arrayFieldMsg: {
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
    rank: {
      required: `Rank can't be blank.`,
      whitespace: `Rank can't be blank.`
    },
    pfx: {
      required: `PFX can't be blank.`,
      whitespace: `PFX can't be blank.`
    },
    srs: {
      required: `SRS can't be blank.`,
      whitespace: `SRS can't be blank.`
    },
    numberOfPrize: {
      required: `Number of Prize can't be blank.`,
      whitespace: `Number of Prize can't be blank.`
    },
    przAmount: {
      required: `Prize Amount can't be blank.`,
      whitespace: `Prize Amount can't be blank.`
    },
    supTkt: {
      required: `Super Ticket can't be blank.`,
      whitespace: `Super Ticket can't be blank.`
    },
    splTkt: {
      required: `Special Ticket can't be blank.`,
      whitespace: `Special Ticket can't be blank.`
    },
    stkBon: {
      required: `STK-BON can't be blank.`,
      whitespace: `STK-BON can't be blank.`
    },
    tprz: {
      required: `TPRZ can't be blank.`,
      whitespace: `TPRZ can't be blank.`
    },
    nod: {
      required: `NOD can't be blank.`,
      whitespace: `NOD can't be blank.`
    },
  }
}