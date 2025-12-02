export const ERROR_MESSAGES = {
  BIRTHDATE_IS_MISSING: {
    description: "",
    message: "",
  },
  EMAIL_IS_MISSING: {
    description: "",
    message: "",
  },
  EMAIL_ALREADY_REGISTERED: {
    description:
      "Please, provide a valid email to proceed with user registration.",
    message: `An user with this email is already registered in database.`,
  },
  INTERNAL_SERVER_ERROR: {
    message: "Internal server error.",
  },
  NAME_IS_MISSING: {
    description: "",
    message: "",
  },
  PASSWORD_IS_MISSING: {
    description: "",
    message: "",
  },
  NO_USER_FOUND_WITH_PROVIDED_ID: {
    message: "No user found with provided id.",
  },
} as const;
