// let x = 45
// [LetToken , IdentifierToken, EqualToken, NumberTokenf]


export enum TokenType {
    Let,
    Null,
    Identifier,
    Equal,
    Number,
    Bool,
    BinaryOp,
    LogicalOp,
    Oparen,
    Cparen,
    EOF,
}
export interface Token {
    value : string;
    type : TokenType;
}

const KEYWORDS = {
    "let" : TokenType.Let,
    "null" : TokenType.Null,
    "true" : TokenType.Bool,
    "false" : TokenType.Bool,
};  

export function isAlpha(src : string) : boolean {
    return ("a" <= src && src <= "z") || ("A" <= src && src <= "Z");
}
export function isNumeric(src : string) : boolean {
    return  "0" <= src && src <= "9";  
}
function isSkipable(src: string) : boolean {
    return (src == " " || src == "\n" || src == "\t");
} 
function token(type : TokenType,value : string): Token {
    return {type  , value} as Token;
} 


export function tokenize(source : string) : Token[] {
    const tokens = new Array<Token>();
    const src = source.split("");
    
    
    while(src.length > 0) {
        let c : string = src.shift() as string;  
        if(c == "+" || c == "-" || c == "*" || c == "/" || c == "%") {
            tokens.push(token(TokenType.BinaryOp,c))
        }
        else if(c == "&" || c == "|") {
            tokens.push(token(TokenType.LogicalOp,c));
        } else if(c == "(") {
            tokens.push(token(TokenType.Oparen,c))
        } else if(c == ")") {
            tokens.push(token(TokenType.Cparen,c))
        } else if(c == "=") {
            tokens.push(token(TokenType.Equal,c))
        } else if(isNumeric(c)) {
            let str : string = c;
            while(src.length > 0 && isNumeric(src[0]))
                str += src.shift();
            tokens.push(token(TokenType.Number,str))
        } else if(isAlpha(c)) {
            let str : string = c;
            while(src.length > 0 && isAlpha(src[0]))
                str += src.shift();
            
            let type : TokenType = TokenType.Identifier;
            if(KEYWORDS[str] != null) {
                type = KEYWORDS[str];
            }
            tokens.push(token(type,str))
        }
        else if(isSkipable(c)) {}
        else {
            console.error("[Error] unkown char in tokenize()",c);
            Deno.exit(1);
        }
    }

    tokens.push(token(TokenType.EOF,"eof"));
    return tokens;
}