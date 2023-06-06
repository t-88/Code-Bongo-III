LANG_TOKENS = {
    "<-": "TOKEN_ASSIGN",
    "<": "TOKEN_LESS",
    ">": "TOKEN_LESS",
    "->": "TOKEN_GIVES?",
    "+": "TOKEN_ADD",
    "-": "TOKEN_SUB",
    "*": "TOKEN_MULT",
    "/": "TOKEN_DIV",
    ";": "TOKEN_SIM_COLON",
    "IDENT": "TOKEN_IDENTIFIER",
    "NUM":   "TOKEN_NUMBER",
    "RES" :  "TOKEN_RESERVED",
    "eof" :  "TOKEN_EOF"
} 
LANG_KEYWORDS = [
    "whats",
]

skipable = [" ","\t","\n","\r"]

class Token:
    def __init__(self,col,kind,value=""):
        self.kind = kind
        self.value = value
        self.col = col
    

