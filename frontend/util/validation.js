export const validateSignUpData = (signupData) => {
  const { fullName, email, phoneNumber, password, confirmPassword } =
    signupData;

  const errors = {
    fullName: !fullName.trim() ? "Full name is required" : "",
    phoneNumber: !phoneNumber.trim()
      ? "Phone number is required"
      : phoneNumber.length < 10
        ? "Phone number must be exactly 10 digits"
        : "",
    email: !email.trim()
      ? "Email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Email is required and must be valid"
        : "",
    password: !password.trim()
      ? "Password is required"
      : password.length < 7
        ? "Password length should be more than seven characters"
        : !/[A-Z]/.test(password)
          ? "Password must contain at least one uppercase letter"
          : !/[a-z]/.test(password)
            ? "Password must contain at least one lowercase letter"
            : !/[0-9]/.test(password)
              ? "Password must contain at least one number"
              : !/[\W_]/.test(password)
                ? "Password must contain at least one special character"
                : "",
    confirmPassword: !confirmPassword.trim()
      ? "Confirm password is required"
      : confirmPassword !== password
        ? "Passwords do not match"
        : "",
  };

  return errors;
};

export const validateSignInData = (data) => {
  const { email, password } = data;
  const errors = {
    email: !email.trim() ? "Email is required" : "",
    password: !password.trim() ? "Password is required" : "",
  };
  return errors;
};

export const validateResetPasswordData = (data) => {
  const { newPassword, confirmNewPassword } = data;
  const errors = {
    newPassword: !newPassword.trim()
      ? "Password is required"
      : newPassword.length < 7
        ? "Password length should be more than seven characters"
        : !/[A-Z]/.test(newPassword)
          ? "Password must contain at least one uppercase letter"
          : !/[a-z]/.test(newPassword)
            ? "Password must contain at least one lowercase letter"
            : !/[0-9]/.test(newPassword)
              ? "Password must contain at least one number"
              : !/[\W_]/.test(newPassword)
                ? "Password must contain at least one special character"
                : "",
    confirmNewPassword: !confirmNewPassword.trim()
      ? "Confirm password is required"
      : confirmNewPassword !== newPassword
        ? "Passwords do not match"
        : "",
  };
  return errors;
};

export const validateUpdateProfileData = (upDateProfile) => {
  const { fullName, email, phoneNumber } = upDateProfile;

  const errors = {
    fullName: !fullName.trim() ? "Full name is required" : "",
    phoneNumber: !phoneNumber.trim()
      ? "Phone number is required"
      : phoneNumber.length < 10
        ? "Phone number must be exactly 10 digits"
        : "",
    email: !email.trim()
      ? "Email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Email is required and must be valid"
        : "",
  };

  return errors;
};
