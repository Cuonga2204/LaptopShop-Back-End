const ERRORS = {
  // Common errors
  VALIDATION_REQUIRED: {
    status: 400,
    success: false,
    message: "The input is required",
    code: 1001,
  },
  INVALID_EMAIL: {
    status: 400,
    success: false,
    message: "Invalid email format",
    code: 1002,
  },
  INVALID_PASSWORD: {
    status: 400,
    success: false,
    message: "Invalid password format",
    code: 1003,
  },

  PASSWORD_NOT_MATCH: {
    status: 400,
    success: false,
    message: "Passwords do not match",
    code: 1004,
  },
  USER_ID_REQUIRED: {
    status: 400,
    success: false,
    message: "User ID is required",
    code: 1005,
  },
  TOKEN_REQUIRED: {
    status: 401,
    success: false,
    message: "Token is required",
    code: 1006,
  },

  // Auth-related
  USER_NOT_FOUND: {
    status: 404,
    success: false,
    message: "User not found",
    code: 1101,
  },
  ACCOUNT_RECEIVER_NOT_FOUND: {
    status: 404,
    success: false,
    message: "Account receiver not found",
    code: 1125,
  },
  WRONG_PASSWORD: {
    status: 401,
    success: false,
    message: "Incorrect password",
    code: 1102,
  },
  EMAIL_ALREADY_EXISTS: {
    status: 409,
    success: false,
    message: "Email already exists",
    code: 1103,
  },
  USER_ALREADY_EXIST: {
    status: 409,
    success: false,
    message: "User already exists",
    code: 1104,
  },

  // Server errors
  INTERNAL_SERVER_ERROR: {
    status: 500,
    success: false,
    message: "Internal server error",
    code: 1500,
  },

  UNKNOWN_ERROR: {
    status: 500,
    success: false,
    message: "Lỗi không xác định",
    code: 15001,
  },
  INVALID_PARAMETER: {
    status: 400,
    success: false,
    message: "Parameter value is invalid",
    code: 15002,
  },
};

module.exports = {
  ERRORS,
};
