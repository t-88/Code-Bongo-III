

class Stmt:
    def __init__(self,kind = "Stmt"):
        self.kind = kind
        self.value = None
class Expr(Stmt):
    def __init__(self, kind = "Expr"):
        super().__init__(kind)
    
class Program(Expr):
    def __init__(self,kind = "Program"):
        super().__init__(kind)
        self.body = []


class BinaryOp(Expr):
    def __init__(self,lhs,rhs,op,kind = "BinaryOp"):
        super().__init__(kind)
        self.lhs = lhs
        self.rhs = rhs
        self.op = op

class BooleanOp(Expr):
    def __init__(self,lhs,rhs,op,kind="BooleanOp"):
        super().__init__(kind)
        self.lhs = lhs
        self.rhs = rhs        
        self.op = op
        
class FunctionCall(Expr):
    def __init__(self,kind="FunctionCall",**kwds):
        super().__init__(kind)
        self.args = kwds

class Assignement(Stmt):
    def __init__(self,iden,value,kind="Assignement",**kwds):
        super().__init__(kind)
        self.args = kwds        
        self.value = value
        self.iden = iden

class NumberLiteral(Stmt):
    def __init__(self,value,kind="NumberLiteral",**kwds):
        super().__init__(kind)
        self.value = value
class StringLiteral(Stmt):
    def __init__(self,value,kind="StringLiteral",**kwds):
        super().__init__(kind)
        self.value = value   
class Identifier(Stmt):
    def __init__(self,name
                 ,value,kind="Identifier",**kwds):
        super().__init__(kind)
        self.value = value                
        self.name = name                

