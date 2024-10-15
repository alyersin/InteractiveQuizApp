
import bcrypt from 'bcryptjs';

/**
 * 
 * @param {string} enteredPassword 
 * @param {string} hashedPassword 
 * @returns {Promise<boolean>} 
 */
export const verifyPassword = async (enteredPassword, hashedPassword) => {
  const isValid = await bcrypt.compare(enteredPassword, hashedPassword);
  return isValid;
};
