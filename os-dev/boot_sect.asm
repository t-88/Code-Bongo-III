org 0x7c00 

mov ah,  0x00
mov al , 0x13
int 0x10

mov bx , msg
call print_string
jmp $

%include "utils.asm"   


msg db "May The Fun Begin!!", 0

times 510 - ($ - $$) db 0
dw 0xaa55 ; magic number