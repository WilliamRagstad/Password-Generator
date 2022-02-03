// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function generatePassword(length, numbers, specials) {
    const charset = generateCharset(numbers, specials);
    return [
        ...new Array(length)
    ].map(()=>charset[Math.floor(Math.random() * charset.length)]
    ).join("");
}
function generateCharset(numbers, specials) {
    return "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + (numbers ? "0123456789" : "") + (specials ? "!@#$%^&*()_+" : "");
}
export { generateCharset as generateCharset, generatePassword as generatePassword };
export { generatePassword as default };
