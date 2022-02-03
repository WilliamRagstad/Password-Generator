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

## CLI Usage

Under construction.

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

## License
This project is licensed under the MIT license.