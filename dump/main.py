from frontend.lexer import Lexer

with open("main.dmp","r") as f:
    src = f.read()


lexer = Lexer()
lexed = lexer.lex(src)
print([token.kind for token in lexed])