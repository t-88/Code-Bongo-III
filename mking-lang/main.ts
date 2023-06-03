import Parser from "./frontend/parser.ts";
import { evaluate } from "./runtime/interperter.ts";


function Repl() {
    const parser : Parser = new Parser();
    console.log("Repl:")
    while(true) {
        const input = prompt("> ") || "";
        if(input.includes("exit")) {
            break;
        }

        const program = parser.make_ast(input);
        console.log(evaluate(program));
    }
}

Repl();