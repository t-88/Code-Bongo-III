export type NodeType = 
                    "Program" |
                    "BinaryExpr"|
                    "NumericLiteral"|
                    "Identifier"

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
export interface Identifier extends Expr {
    type : "Identifier",
    value : string,
}

export interface NumericLiteral extends Expr {
    type : "NumericLiteral",
    value : number,
}