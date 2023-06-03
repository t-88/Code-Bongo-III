import { RunTimeVal ,  ValueType , NullVal , NumberVal, MK_NUMBER, MK_NULL, MK_BOOL, BoolVal } from "./value.ts";
import { BinaryExpr, BoolExpr, BoolLiteral, Identifier, NodeType, NumericLiteral, Program, Stmt, VarDeclaration } from "../frontend/ast.ts";
import Environment from "./environment.ts";

export function evaluate_bin_expr(node : BinaryExpr, env : Environment): RunTimeVal {
    let lhs = evaluate(node.lhs,env);
    let rhs = evaluate(node.rhs,env);
    let value : number = 0;
    if(lhs.type == "null" || rhs.type == "null") {
        return MK_NULL();
    }
    if(lhs.type != "number" || rhs.type != "number") {
        console.error(`[Error] cant preforme binary ops on ${lhs.type} and ${rhs.type}`);
        Deno.exit(1);
        return MK_NULL();
    }

    let lhsVal = (lhs as NumberVal).value;
    let rhsVal = (rhs as NumberVal).value;
    switch(node.op) {
        case "+": {
            value = lhsVal + rhsVal;
            break;
        }
        case "-": {
            value = lhsVal - rhsVal;
        }
        break;
        case "*": {
            value = lhsVal * rhsVal;
            break;
        }        
        case "/": {
            
            if(rhsVal == 0) {
                console.error("[Error] Div by Zero", lhs , "by", rhs);
                Deno.exit(1);
            }
            value = lhsVal / rhsVal;
            break;
        }                
        case "%": 
            value = lhsVal / rhsVal;
            break;
    }
    return MK_NUMBER(value);
}
export function evaluate_bool_expr(node : BoolExpr, env : Environment): RunTimeVal {
    let lhs  = evaluate(node.lhs,env);
    let rhs  = evaluate(node.rhs,env);

    if(lhs.type == "null" || rhs.type == "null") {
        return MK_NULL();
    }
    if(lhs.type != "bool" || rhs.type != "bool") {
        console.error(`[Error] cant preforme binary ops on ${lhs.type} and ${rhs.type}`);
        Deno.exit(1);
        return MK_NULL();
    }

    let value = false;
    switch(node.op) {
        case "&":
            value = (lhs as BoolVal).value && (rhs as BoolVal).value;
        break;
        case "|":
            value = (lhs as BoolVal).value || (rhs as BoolVal).value;
        break;
    }
    return MK_BOOL(value);
}

export function evaluate_program(node : Program,env : Environment) : RunTimeVal {
    let lastEval : RunTimeVal = MK_NULL();
    for(let i = 0; i < node.body.length; i++) {
        lastEval = evaluate(node.body[i],env);
    }

    return lastEval;

}
export function evaluate_identifier(node : Identifier,env : Environment) : RunTimeVal {
    return env.get_var(node.value) as RunTimeVal;
}
export function evaluate_var_declaration(node : VarDeclaration,env : Environment) : RunTimeVal {
    env.declare_var(node.name,evaluate(node.value,env));
    return node;  
}
export function evaluate(node : Stmt,env : Environment): RunTimeVal {
    switch(node.type) {
        case "NumericLiteral":
            return MK_NUMBER((node as NumericLiteral).value);
        case "NullLiteral":
            return MK_NULL();
        case "BoolLiteral":
            return MK_BOOL((node as BoolLiteral).value);
        case "BinaryExpr":
            return evaluate_bin_expr(node as BinaryExpr,env);
        case "BoolExpr":
            return evaluate_bool_expr(node as BoolExpr,env);
        
            case "Program":
            
            return evaluate_program(node as Program,env);
        case "Identifier":
            return evaluate_identifier(node as Identifier,env);
        case "VarDeclaration":
            return evaluate_var_declaration(node as Identifier,env);
        
        default:
            console.error(`[Error] Unreachable, node not implemented ${node.type}`);
            Deno.exit(1);
            return {} as RunTimeVal;
    }
}