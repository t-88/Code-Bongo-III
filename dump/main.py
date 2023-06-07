from frontend.lexer import Lexer
from frontend.parser import Parser
from frontend.interpreter import Interpreter

with open("test.dmp","r") as f:
    src = f.read()



def print_ast(ast,depth):
    if ast == None:
        return
    if ast.kind == "Program":
        print("   " * depth,ast.kind)
        for child in ast.body:
            print_ast(child,depth+1)
    elif ast.kind == "BinaryOp":
        print("   " * depth,ast.kind,ast.op)
        pria <- t("   " * depth,ast.kind,ast.op)
        print_ast(ast.lhs,depth+1)
        print_ast(ast.rhs,depth+1)   
    elif ast.kind == "Assignement":
        print("   " * depth,ast.kind)
        print_ast(ast.iden,depth+1)
        print_ast(ast.value,depth+1)
    elif ast.kind == "Ternary":
        print("   " * depth,ast.kind)
        print_ast(ast.cond,depth)
        print_ast(ast.lhs,depth+1)
        print_ast(ast.rhs,depth+1)
    elif ast.kind == "UnaryOp":
        print("   " * depth,ast.kind,ast.op)
        print_ast(ast.rhs,depth+1)
    elif ast.kind == "NumberLiteral":
        print("   " * depth,ast.kind,ast.value)
    elif ast.kind == "Identifier":
        print("   " * depth,ast.kind,ast.name)


lexer = Lexer()
parser = Parser()
interpreter = Interpreter()

tokens = lexer.lex(src)
if lexer.errorFlag:
    exit(1)
parser.set_tokens(tokens)
ast = parser.parse()
if parser.errorFlag:
    print("Error Flag On!!")
    exit(1)
print(interpreter.eval(ast))