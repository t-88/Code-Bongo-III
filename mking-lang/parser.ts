import { Token, tokenize , TokenType } from "./lexer.ts";
import { NodeType, BinaryExpr ,Identifier ,Program , NumericLiteral , Expr , Stmt } from "./ast.ts";

export default class Parser {
    private tokens : Token[];

    private at() : Token {
        return this.tokens[0];
    }
    private eat():  Token {
        return this.tokens.shift() as Token; 
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
        return this.parse_primary_expr();
    }
    private parse_primary_expr() : Expr {
        let tknType = this.at().type;
        switch(tknType) {
            case TokenType.Identifier:
                return {type : "Identifier" , value : this.eat().value} as Identifier;
            case TokenType.Number:
                return {type : "NumericLiteral" , value : parseFloat(this.eat().value)} as NumericLiteral;
            default:
                console.error("[Error] Unexpected Token",this.at());
                Deno.exit(1);
                return {} as Stmt; // trick compiler XD
        }
    }
}


const parser : Parser = new Parser();