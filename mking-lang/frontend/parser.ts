import { Token, tokenize , TokenType } from "./lexer.ts";
import { NodeType, BinaryExpr ,Identifier ,Program , NumericLiteral , Expr , Stmt, NullLiteral, VarDeclaration, BoolLiteral, BoolExpr } from "./ast.ts";
import {MK_NULL, MK_NUMBER} from "../runtime/value.ts"


export default class Parser {
    private tokens : Token[];

    private at() : Token {
        return this.tokens[0];
    }
    private eat():  Token {
        return this.tokens.shift() as Token; 
    }
    private expect(type : TokenType , msg : string):  Token { 
        if(this.at().type != type || this.at() == undefined) {
            console.error(msg);
            Deno.exit(1);
        }
        return this.eat();
    }


    public make_ast(src : string) : Program {
        this.tokens = tokenize(src);
        const program : Program = {
            type : "Program",
            body : []
        };
        while (this.tokens[0].type != TokenType.EOF) {
            program.body.push(this.parse_stmt())
        }

        
        return program;
    }


    private parse_stmt() : Stmt {
        // try catch blocks
        // var declaration
        // while loops 
        
        // skip to parse expretion
        
        return this.parse_expr();
    }

    private parse_expr() : Expr {
        return this.parse_var_declaration();
    }

    private parse_logical_expr() : Expr {
        let lhs = this.parse_additive_expr();
        while(this.at().value == "&" || this.at().value == "|" ) {
            const op = this.eat().value;
            const rhs = this.parse_additive_expr();
            lhs = {
                lhs,
                rhs,
                op,
                type : "BoolExpr"
            } as BoolExpr;
        }

        return lhs;
    }
    private parse_var_declaration() : Expr {
        if(this.at().type == TokenType.Let) {
            this.eat();
            let name = this.eat().value; 
            this.expect(TokenType.Equal,`[Error] Expexted '=' for var declaration`);
            let value = this.parse_additive_expr(); 
            
            return {
                type : "VarDeclaration",
                value,
                name,
            } as VarDeclaration;
        }

        return this.parse_logical_expr();

    }
    private parse_additive_expr(): Expr {
        let lhs  = this.parse_multiplicative_expr();

        while(this.at().value == "+" || this.at().value == "-" ) {
            const op = this.eat().value;
            const rhs = this.parse_multiplicative_expr();

            lhs = {
                type : "BinaryExpr",
                lhs,
                rhs,
                op,
            } as BinaryExpr;
        }
        return lhs;  
    }
    private parse_multiplicative_expr(): Expr {
        let lhs  = this.parse_primary_expr();

        while(this.at().value == "*" || this.at().value == "/"|| this.at().value == "%") {
            const op = this.eat().value;
            const rhs = this.parse_primary_expr();

            lhs = {
                type : "BinaryExpr",
                lhs,
                rhs,
                op,
            } as BinaryExpr;
        }
        return lhs;  
    }    

    private parse_primary_expr() : Expr {
        let tknType = this.at().type;
        switch(tknType) {
            case TokenType.Identifier:
                return {type : "Identifier" , value : this.eat().value} as Identifier;
            case TokenType.Null:
                this.eat();
                return MK_NULL();
            case TokenType.Number:
                return {type : "NumericLiteral" , value : parseFloat(this.eat().value)} as NumericLiteral;
            case TokenType.Bool:
                return {type : "BoolLiteral" , value : this.eat().value == "true"} as BoolLiteral;
            case TokenType.Oparen:
                this.eat();
                const value = this.parse_expr();
                this.expect(TokenType.Cparen,"Expected ')' , found " + this.at().value);
                return value;
            default:
                console.error("[Error] Unexpected Token",this.at());
                Deno.exit(1);
                return {} as Stmt; // trick compiler XD
        }
    }
}


const parser : Parser = new Parser();