import Parser from "./frontend/parser.ts";
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interperter.ts";
import { NumberVal } from "./runtime/value.ts";


function Repl() {
    const parser : Parser = new Parser();
    console.log("Repl:");
    const env : Environment = new Environment();
    env.declare_var("x",{type : "number", value : 69} as NumberVal) ;
    while(true) {
        const input = prompt("> ") || "";
        if(input.includes("exit")) {
            break;
        }

        const program = parser.make_ast(input);
        console.log(evaluate(program,env));
    }
}

Repl();