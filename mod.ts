
/**
 * Generates a password from a set of options.
 * @param length Length of the password
 * @param numbers Include numbers in the password
 * @param specials Include special characters in the password
 * @returns A random password
 */
function generatePassword(length: number, numbers: boolean, specials: boolean): string {
	const charset = generateCharset(numbers, specials);
	return [...new Array(length)].map(() => charset[Math.floor(Math.random() * charset.length)]).join("");
}

/**
 * Generates a charset for the password generator.
 * @param numbers Include numbers in the password
 * @param specials Include special characters in the password
 */
function generateCharset(numbers: boolean, specials: boolean): string {
	return "abcdefghijklmnopqrstuvwxyz" +
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		(numbers ? "0123456789" : "") +
		(specials ? "!@#$%^&*()_+" : "");
}

export default generatePassword;
export { generatePassword, generateCharset };