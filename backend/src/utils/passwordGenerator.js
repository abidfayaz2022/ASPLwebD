/**
 * Generates a random password with specified length and complexity
 * @param {number} length - The length of the password to generate
 * @returns {string} - A random password
 */
export const generateRandomPassword = (length = 10) => {
  // Define character sets
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Removed O and I to avoid confusion
  const lowercase = 'abcdefghijkmnopqrstuvwxyz'; // Removed l to avoid confusion
  const numbers = '23456789'; // Removed 0 and 1 to avoid confusion
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // Combine all characters
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  
  // Ensure at least one character from each set for complexity
  password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  
  // Fill the rest of the password with random characters
  for (let i = 4; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }
  
  // Shuffle the password to avoid predictable patterns
  return shuffleString(password);
};

/**
 * Shuffles a string using Fisher-Yates algorithm
 * @param {string} string - The string to shuffle
 * @returns {string} - Shuffled string
 */
const shuffleString = (string) => {
  const array = string.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
};