from frontend.exprs import * 

class Interpreter:
    def __init__(self):
        self.ast = None

    def set_ast(self,ast):
        self.ast = ast


    def eval_program(self,ast):
        lastEvaluated = None
        for expr in ast.body:
            lastEvaluated = self.eval(expr)
        return lastEvaluated
    def eval_binary_expr(self,ast):
        lhs = self.eval(ast.lhs)
        rhs = self.eval(ast.rhs)
        if ast.op == "+":
            return lhs + rhs
        elif ast.op == "-":
            return lhs - rhs
        elif ast.op == "*":
            return lhs * rhs
        elif ast.op == "/":
            return lhs / rhs
        else:
            print("[ERROR] Unreachable in eval_binary_expr")
            exit(1)
    def eval_boolean_expr(self,ast):
        lhs = self.eval(ast.lhs)
        rhs = self.eval(ast.rhs)
        if ast.op == "->":
            return lhs == rhs
        else:
            print("[ERROR] Unreachable in eval_boolean_expr")
            exit(1)
    def eval_ternary_expr(self,ast):
        cond = self.eval(ast.cond)
        if cond:
            return self.eval(ast.lhs)
        else:
            return self.eval(ast.rhs)

    def eval_unary_expr(self,ast):
        rhs = self.eval(ast.rhs)
        if ast.op == "!":
            return not rhs
        else:
            print("[ERROR] Unreachable in eval_unary_expr")
            exit(1)


    def eval(self,ast):
        if ast.kind == "Program":
            return self.eval_program(ast)
        elif ast.kind == "BinaryOp":
            return self.eval_binary_expr(ast)
        elif ast.kind == "BooleanOp":
            return self.eval_boolean_expr(ast)
        elif ast.kind == "Ternary":
            return self.eval_ternary_expr(ast)
        elif ast.kind == "UnaryOp":
            return self.eval_unary_expr(ast)
        elif ast.kind == "NumberLiteral":
            return ast.value
        elif ast.kind == "Identifier":
            return ast.value
        else:
            print("[ERROR] Unreachable in eval")
            exit(1)
