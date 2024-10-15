// src/utils/auth.js
import bcrypt from 'bcryptjs';

/**
 * Function to verify a password
 * @param {string} enteredPassword - The password entered by the user
 * @param {string} hashedPassword - The hashed password stored in the database
 * @returns {Promise<boolean>} - True if the password matches, otherwise false
 */
export const verifyPassword = async (enteredPassword, hashedPassword) => {
  const isValid = await bcrypt.compare(enteredPassword, hashedPassword);
  return isValid;
};
