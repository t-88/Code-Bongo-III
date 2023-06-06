tokens = {
    "<-": "TOKEN_ASSIGN",
    "<": "TOKEN_LESS",
    ">": "TOKEN_LESS",
    "->": "TOKEN_GIVES?",
    "+": "TOKEN_ADD",
    "-": "TOKEN_SUB",
    "*": "TOKEN_MULT",
    "/": "TOKEN_DIV",
    "IDENT": "TOKEN_IDENTIFIER",
    "NUM": "TOKEN_NUMBER",
    "RES" : "TOKEN_RESERVED"
} 
reseverKeyWords = [
    "whats",
]

skipable = [" ","\t","\n","\r"]

class Token:
    def __init__(self,kind,value=""):
        self.kind = kind
        self.value = value
    

