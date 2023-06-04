[bits 16]
[org 0x7c00]

KERNAL_OFFSET equ 0x1000

; clear screen
mov ah,  0
mov al , 3
int 0x10


load_kernal:
    mov bx , KERNAL_OFFSET
    mov dh , 15
    call read_disk

cli
lgdt [gdt_descriptor]
mov eax , cr0
or eax , 1
mov cr0 , eax
jmp CODE_SEG:init_pm



gdt_start:
    gdt_null:
        dd 0 , 0
    gdt_code:
        ; base 0 32bit
        ; limit 0xfffff 16bit
        ; 1st flags 1001 present 1,privilge 00,discriptor type 1
        ; type flags 1010 code 1, conforming 0, readable 1, accessed 0
        ; 2nd flags 1100 granularity 1, 32bit 1, 64bit 0, AVL 0 
        
        dw 0xffff ; limit
        dw 0 ; base 
        db 0 ; base

        db 10011010b ;1st flgs , type flags
        db 11001111b ;2nd flags, limit
        db 0 ; base
    gdt_data:
        ; same exept for type flags
        ; type flags 0010 code 0, expaend down 0, writable 1, accessed 0
        dw 0xffff
        dw 0 ; base 
        db 0 ; base
        db 10010010b ;1st flgs , type flags
        db 11001111b ;2nd flags, limit
        db 0 ; base        
    gdt_end:

    gdt_descriptor:
        dw gdt_end - gdt_start - 1
        dd gdt_start

    CODE_SEG equ gdt_code - gdt_start
    DATA_SEG equ gdt_data - gdt_start

%include "asm/utils_pm.asm"
%include "asm/utils.asm"

[bits 32]
init_pm:
    mov ax , DATA_SEG
    mov ds , ax
    mov ss , ax
    mov es , ax
    mov fs , ax
    mov gs , ax

    mov ebp , 0x90000
    mov esp , ebp


    call KERNAL_OFFSET


    jmp $

times 510-($-$$) db 0
d dw 0xaa55 ; magic number