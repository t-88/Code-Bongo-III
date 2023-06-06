from frontend.token import *
from frontend.exprs import *

class Parser:
    def __init__(self):
        self.tokens = [] 
        self.curr = 0
        self.errorFlag = False
        
    def lookahead(self,dis = 0):
        if self.curr + dis > len(self.tokens): return "\0"
        return  self.tokens[self.curr + dis]

    def next(self):
        if self.eots(): return None 
        tmp = self.tokens[self.curr]
        self.curr += 1
        return tmp
    
    def expect(self,*expected):
        if self.eots():
            print(f"[ERROR] Expected {expected} got {self.tokens[self.curr].kind} {self.tokens[self.curr].col}")
            assert False
        
        notFound = True
        for exp in expected: 
            if self.tokens[self.curr].kind == exp:
                notFound = False
                break
        if notFound:
            print(f"[ERROR] Expected {expected} got {self.tokens[self.curr].kind} {self.tokens[self.curr].col}")
            assert False

        
        tmp = self.tokens[self.curr]
        self.curr += 1
        return tmp
    
    def eots(self):
        return self.tokens[self.curr].kind == LANG_TOKENS["eof"]
    
    def at(self):
        if self.eots(): return
        return self.tokens[self.curr]
    
    def set_tokens(self,tokens):
        self.tokens = tokens

    def parse(self):
        program = Program()
        while(not self.eots()):
            try:
                program.body.append(self.parse_assignment())
            except: 
                self.errorFlag = True
        return program    
    def parse_assignment(self):
        expr = self.parse_comparasion()
        if not self.eots() and self.at().kind == "TOKEN_ASSIGN" :
            self.next()
            rhs = self.parse_assignment()
            self.expect("TOKEN_SIM_COLON","TOKEN_COMMA")
            return Assignement(expr,rhs)

        return expr
    def parse_comparasion(self):
        expr = self.parse_additive()
        while not self.eots() and self.at().kind == "TOKEN_GIVES?":
            op = self.next().value
            rhs = self.parse_additive()
            expr =  BooleanOp(expr,rhs,op)
        return expr
    def parse_additive(self):
        expr = self.parse_multiplicative()
        while not self.eots() and (self.at().kind == "TOKEN_ADD" or self.at().kind == "TOKEN_SUB"):
            op = self.next().value
            rhs = self.parse_multiplicative()
            expr =  BinaryOp(expr,rhs,op)
        return expr
    def parse_multiplicative(self):
        expr = self.parse_primary()
        while not self.eots() and (self.at().value == "*" or self.at().value == "/"):
            op = self.next().value
            rhs = self.parse_primary()
            expr =  BinaryOp(expr,rhs,op)
        return expr
    def parse_primary(self):
        token = self.next()
        if token.kind == "TOKEN_NUMBER":
            return NumberLiteral(token.value)
        elif token.kind == "TOKEN_IDENTIFIER":
            return Identifier(token.value,None)
        else:
            print(f"[ERROR] Unexpected Token {token.kind} {token.col}")
            assert False    