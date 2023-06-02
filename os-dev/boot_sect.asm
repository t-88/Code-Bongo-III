[bits 16]
[org 0x7c00]

; clear screen
mov ah,  0
mov al , 3
int 0x10


mov dh , 2
mov bx , 0x9000  
call read_disk

mov bx , [0x9000 + 512] 
call print_hex


jmp $

%include "utils.asm"   


times 510-($-$$) db 0
d dw 0xaa55 ; magic number

times 256 dw 0xdada
times 256 dw 0xface