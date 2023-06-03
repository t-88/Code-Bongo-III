export type NodeType = 
                    "Program" |
                    "BinaryExpr"|
                    "NumericLiteral"|
                    "NullLiteral"|
                    "Identifier"|
                    "VarDeclaration"|
                    "BoolLiteral"

export interface Stmt {
    type : NodeType
}
export interface Program extends Stmt{
    type : "Program",
    body : Stmt[],
}
export interface Expr extends Stmt {} // smth to evalted
export interface BinaryExpr extends Expr {
    lhs : Expr,
    rhs : Expr,
    op : string,
    type : "BinaryExpr"
} 
export interface BoolExpr extends Expr {
    lhs : Expr,
    rhs : Expr,
    op : string,
    type : "BoolExpr"
} 

export interface Identifier extends Expr {
    type : "Identifier",
    value : string,
}

export interface NumericLiteral extends Expr {
    type : "NumericLiteral",
    value : number,
}
export interface NullLiteral extends Expr {
    type : "NumericLiteral",
    value : "null",
}

export interface VarDeclaration extends Expr {
    type : "VarDeclaration",
    name  : string,
    value : Expr,
}

export interface BoolLiteral extends Expr {
    type : "BoolLiteral",
    value : boolean,
}