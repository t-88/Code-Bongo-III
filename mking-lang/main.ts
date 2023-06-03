import Parser from "./parser.ts";


function Repl() {
    const parser : Parser = new Parser();
    console.log("Repl:")
    while(true) {
        const input = prompt("> ") || "";
        if(input.includes("exit")) {
            break;
        }

        const program = parser.make_ast(input);
        console.log(program);
    }
}

Repl();