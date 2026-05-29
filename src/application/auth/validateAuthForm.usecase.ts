export const validateAuthForm = (
  email: string,
  password: string,
  confirmPassword?: string,
  isRegister = false
): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  if (isRegister && password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return null;
};
