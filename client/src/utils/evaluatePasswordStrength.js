// utils/evaluatePasswordStrength.js
export const evaluatePasswordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { level: "Weak", color: "bg-red-500", score };
  if (score === 3 || score === 4)
    return { level: "Moderate", color: "bg-yellow-400", score };
  return { level: "Strong", color: "bg-green-500", score };
};
