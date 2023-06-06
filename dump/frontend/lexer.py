from frontend.token import *

class Lexer:
    def __init__(self):
        self.curr = 0
        self.col = 1
        self.src = ""
        self.srcTokens = []

        self.errorFlag = False

    def lookahead(self,dis = 0):
        if self.curr + dis > len(self.src): return "\0"
        return  self.src[self.curr + dis]

    def next(self):
        tmp = self.src[self.curr]
        self.curr += 1
        return tmp
    def eof(self):
        return self.curr >= len(self.src)
    def is_alpha(self,char):
        return (char >= "a" and char <= "z") or (char >= "A" and char <= "Z") 
    def is_number(self,char):
        return (char >= "0" and char <= "9") 


    def lex(self,src):
        self.src = src
        self.srcTokens = []

        while not self.eof():
            char =  self.next()
            if char in LANG_TOKENS:
                if char == "-" and self.lookahead() == ">":
                    self.next()
                    self.srcTokens.append(Token(self.col,LANG_TOKENS["->"],"->"))
                elif char == "<" and self.lookahead() == "-":
                    self.next()
                    self.srcTokens.append(Token(self.col,LANG_TOKENS["<-"]))
                else:
                    self.srcTokens.append(Token(self.col,LANG_TOKENS[char],char))
            elif self.is_number(char):
                build = char
                while(not self.eof() and self.is_number(self.src[self.curr])):
                    char = self.next()
                    build += char
                self.srcTokens.append(Token(self.col,LANG_TOKENS["NUM"],value=build))                
            elif self.is_alpha(char):
                build = char
                while(not self.eof() and self.is_alpha(self.src[self.curr])):
                    char = self.next()
                    build += char
                if build in LANG_KEYWORDS:
                    self.srcTokens.append(Token(self.col,LANG_TOKENS["RES"],value=build))                
                else:
                    self.srcTokens.append(Token(self.col,LANG_TOKENS["IDENT"],value=build))                
            elif char in skipable:
                if char == "\n":
                    self.col += 1
            else:
                self.errorFlag = True
                print(f"[Error] Unkown char in col {self.col} '{char}' ")
        self.srcTokens.append(Token(self.col,LANG_TOKENS["eof"]))
        return self.srcTokens
