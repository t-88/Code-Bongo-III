import { RunTimeVal ,  ValueType , NullVal , NumberVal } from "./value.ts";
import { BinaryExpr, NodeType, NumericLiteral, Program, Stmt } from "../frontend/ast.ts";

export function evaluate_bin_expr(node : BinaryExpr): RunTimeVal {
    let lhs = evaluate(node.lhs);
    let rhs = evaluate(node.rhs);
    let value : number = 0;
    if(lhs.type == "null" || rhs.type == "null") {
        return {type : "null" , value : "null"} as NullVal;
    }
    switch(node.op) {
        case "+": {
            value = (lhs as NumberVal).value + (rhs as NumberVal).value;
            break;
        }
        case "-": {
            value = (lhs as NumberVal).value - (rhs as NumberVal).value;
            break;
        }
        case "*": {
            value = (lhs as NumberVal).value * (rhs as NumberVal).value;
            break;
        }        
        case "/": {
            
            if((rhs as NumberVal).value == 0) {
                console.error("[Error] Div by Zero", lhs , "by", rhs);
                Deno.exit(1);
            }
            value = (lhs as NumberVal).value / (rhs as NumberVal).value;
            break;
        }                
        case "%": 
            value = (lhs as NumberVal).value / (rhs as NumberVal).value;
            break;
    }
    return {type : "number" , value } as NumberVal;
}

export function evaluate_program(node : Program) : RunTimeVal {
    let lastEval : RunTimeVal = {type : "null" , value : "null"} as RunTimeVal;
    for(let i = 0; i < node.body.length; i++) {
        lastEval = evaluate(node.body[i]);
    }

    return lastEval;

}

export function evaluate(node : Stmt ): RunTimeVal {
    switch(node.type) {
        case "NumericLiteral":
            return {type : "number" ,value: (node as NumericLiteral).value} as NumberVal;
        case "NullLiteral":
            return {type : "null" , value: "null"} as NullVal;
        case "BinaryExpr":
            return evaluate_bin_expr(node as BinaryExpr);
        case "Program":
            return evaluate_program(node as Program);
    
        default:
        console.error("[Error] Unreachable, node not implemented");
        Deno.exit(1);
        return {} as RunTimeVal;
        
    }
}