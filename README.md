# Password Generator
A simpel command line utility for generating passwords.<br>
The program is designed to be used in a terminal via manual user input or via a command line interface.

## About
This program was created during an evening of four hours as part of a coding challenge called **Projlett**, which is a hackathon designed as a way to learn and improve programming skills and expand my knowledge of the TypeScript programming language and it's ecosystem.

In **Projlett**, you submit a small set of simpel ideas and concepts that you think are unique and that somebody else might be able to implement.
In return, you get a random idea that you shall implement in the best way you possible can during a limited time.
This is a great way to learn new things and to get a sense of how to implement something in a real world scenario.

## CLI Installation

You can install the CLI tool by running the following command:

```shell
deno install -A -f -n pass https://deno.land/x/pass/cli.ts
```
Or run it without installing it, using `land`:
```shell
land pass
```

## CLI Usage

### Manual User Input

Run the password generator through the interactive user interface by typing `pass` in the terminal.

```shell
> pass

╔═══════════════════════════╗
║ Password Generator v1.2.0 ║
║    by @WilliamRagstad     ║
╚═══════════════════════════╝

Use --help to see a list of available options.
Generate a new safe password with the following options:

> How long do you want your password to be? (8-128) 20
? Do you want numbers in your password? [Y/n] y
? Do you want special characters in your password? [Y/n] n

Password: FI1NqqVAtWsIsKpdS835

```

### Command Line Interface

Or directly pass the options to the CLI tool to instantly generate a password. Type `pass --help` to see a list of available options.

```shell
> pass --help

╔═══════════════════════════╗
║ Password Generator v1.2.0 ║
║    by @WilliamRagstad     ║
╚═══════════════════════════╝

Usage: pass (options)

Options:
  --help, -h    Print this help message
  --version, -v Print the version number

  --length=[n], -l=[n]  Length of the password
  --numbers, -n Include numbers in the password.
  --specials, -s Include special characters in the password.
  --no-prefix, -p Do not print the prefix.

```

The example below will generate a password with a length of 20, numbers and special characters included, and no prefix.

```shell
> pass --length=20 --numbers --specials --no-prefix
PKFlZIZnS5D^nnWP0_jB
```

Or use the short form of the options.

```shell
> pass -l=20 -n -s -p
kA!4hn@uZpZBjEE8U8#s
```

## Library Usage

The library is also designed to be used in a Deno environment. Not only as a command line utility.
Import the password generator library and use it as follows:

```typescript
import { generatePassword } from "https://deno.land/x/pass/mod.ts";

const length = 20;
const numbers = true;
const specials = true;
const password = generatePassword(length, numbers, specials);
console.log(`Generated password: ${password}`);
```

> ### [**View full documentation here**](https://doc.deno.land/https://deno.land/x/pass@1.2.0/mod.ts).

### Use with JavaScript

The library is bundled to a JavaScript file that can be used in a browser. Link to the script file using:
```html
<script src="https://cdn.deno.land/pass/versions/1.2.2/raw/dist/pass.bundle.js"></script>
```
This will load the library and provide global functions called `generatePassword` and `generateCharset`.

<br>

## License
This project is licensed under the MIT license.