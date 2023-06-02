print_string:
    pusha
        mov ah , 0x0e
        print_string_loop:
            mov al , byte[bx]
            cmp al , 0
            je print_string_exit
            int 0x10 
            inc bx
            jmp print_string_loop
    print_string_exit:
    popa
    ret

