import { parse, Args } from "https://deno.land/std/flags/mod.ts";
import Ask from "https://deno.land/x/ask@1.0.6/mod.ts";
import { red, green, bold, cyan, yellow, magenta } from "https://deno.land/std/fmt/colors.ts";

// ****************
// Global variables
// ****************

const version = "1.0";
const ask = new Ask();
const parsedArgs = parse(Deno.args);



// *********
// Functions
// *********

function printBanner() {
	console.log(`
╔══════════════════════════╗
║  ${bold(red("Password"))} ${bold(cyan("Generator"))} v${version} ║
║    ${cyan("by")} ${bold(green("@WilliamRagstad"))}    ║
╚══════════════════════════╝

Use ${bold(yellow("--help"))} to see a list of available options.
Generate a new safe password with the following options:
`);
}

function printHelp() {
	console.log(`
${bold(cyan("Usage"))}: password (options)

${bold(cyan("Options"))}:
  ${yellow("--help")}, ${yellow("-h")}    Print this help message
  ${yellow("--version")}, ${yellow("-v")} Print the version number

  ${yellow("--length")}=${yellow("[n]")}, ${yellow("-l")}=${yellow("[n]")}  Length of the password
  ${yellow("--numbers")}, ${yellow("-n")} Include numbers in the password.
  ${yellow("--specials")}, ${yellow("-s")} Include special characters in the password.
  ${yellow("--no-prefix")}, ${yellow("-p")} Do not print the prefix.`);
}

function printError(message: string) {
	console.log(`\n${red("Error")}: ${yellow(message)}`);
}


/**
 * Generate a new function that validates an input string and checks if it is a number and if it is within the range of the min and max (if given any).
 * @param min Minimum value
 * @param max Maximum value
 * @returns A function that validates an input string and checks if it is a number and if it is within the range of the min and max (if given any).
 */
function validateNumber(min?: number, max?: number): (input?: string | number) => boolean {
	return (input?: string | number) => {
		if (input === undefined) {
			return false;
		}

		let number;
		if (typeof input === "string") {
			number = parseInt(input);
			if (isNaN(number)) {
				return false;
			}
		}
		else if (typeof input === "number") {
			number = input;
		}
		else {
			return false;
		}

		if (min !== undefined && number < min) {
			return false;
		}

		if (max !== undefined && number > max) {
			return false;
		}

		return true;
	}
}

function validateBoolean(input?: string): boolean {
	return ["y", "n"].includes(input?.toLowerCase() ?? "");
}


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




// ***********
// Main method
// ***********

async function main(args: string[]) {
	// console.log(parsedArgs);
	if (args.length === 0) {
		printBanner();
		const { length, numbers, specials } = await ask.prompt([
			{ type: "number", name: "length", "message": "How long do you want your password to be? (8-128)", prefix: green(">"), validate: validateNumber(8, 128) },
			{ type: "confirm", name: "numbers", message: "Do you want numbers in your password?", validate: validateBoolean },
			{ type: "confirm", name: "specials", message: "Do you want special characters in your password?", validate: validateBoolean },
		]);
		const password = generatePassword(length as number, numbers as boolean, specials as boolean);
		console.log(`\n${green("Password")}: ${cyan(password)}`);
	} else if (parsedArgs.h || parsedArgs.help) {
		printHelp();
	} else if (parsedArgs.v || parsedArgs.version) {
		console.log("Password Generator version " + version);
	} else if (parsedArgs.l || parsedArgs.length || parsedArgs.n || parsedArgs.numbers || parsedArgs.s || parsedArgs.specials) {
		const lengthOpt = parsedArgs.l ?? parsedArgs.length;
		const length = parseInt(lengthOpt);
		if (!(typeof lengthOpt === "number") || !validateNumber(8, 128)(length)) {
			printError("--length or -l must pass a number between 8 and 128.");
			return;
		}
		const numbers = parsedArgs.n ?? parsedArgs.numbers ?? false;
		if (!(typeof numbers === "boolean")) {
			printError("--numbers or -n are flags. Don't pass anything.");
			return;
		}
		const specials = parsedArgs.s ?? parsedArgs.specials ?? false;
		if (!(typeof specials === "boolean")) {
			printError("--specials or -s are flags. Don't pass anything.");
			return;
		}
		const noPrefix = parsedArgs.p ?? parsedArgs["no-prefix"] ?? false;
		if (!(typeof specials === "boolean")) {
			printError("--specials or -s are flags. Don't pass anything.");
			return;
		}
		const password = generatePassword(length, numbers, specials);
		if (!noPrefix) {
			console.log(`\n${green("Password")}: ${cyan(password)}`);
		} else {
			console.log(cyan(password));
		}
	} else {
		printError("Unknown option. Use --help to see a list of available options.");
	}
}

// Run the main method with the parsed arguments if the script is run directly.
if (import.meta.main) {
	main(Deno.args);
}