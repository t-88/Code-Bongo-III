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


print_number:
    pusha
        mov ah, 0x0e
        mov al , dl
        add al, "0" 
        int 0x10 
    popa
    ret
print_char:
    pusha
        mov ah, 0x0e
        mov al , dl
        int 0x10 
    popa
    ret    



print_hex:
    pusha
        mov ax , bx
        mov bx , 0x10
        xor cx , cx
        print_hex_loop_div:
            xor dx , dx
            div bx
            push dx
            inc cx
        cmp ax, 0
        jne print_hex_loop_div 

        cmp cx, 0
        je print_hex_exit

        mov dl , 0
        call print_number
        mov dl , "x"
        call print_char

        print_hex_loop_print:
            pop dx
            call print_hex_number
            dec cx
        cmp cx, 0
        jne print_hex_loop_print


    print_hex_exit:
    popa
    ret



print_hex_number:
pusha
    mov ah , 0x0e
    cmp dl , 9
    jle print_hex_number_decimal
        add dl , 55
        jmp print_hex_number_print
    print_hex_number_decimal:
        add dl , "0"
    
    print_hex_number_print:
    mov al , dl 
    int 0x10
popa
ret



; set dh nbr of sectors to be read
; set es:bx pos where to save data read

read_disk:
pusha
push dx
    
    mov al , dh ; number of sectors to read
    mov dh , 0 ; head
    mov ch , 0 ; cyilnder
    mov cl , 2 ; sector
    mov ah , 2
    int 0x13

    pop dx
    jnc read_disk_check_al
        mov bx , diskErrorMsg
        call print_string
    jmp $
    read_disk_check_al:
        cmp dh , al
        je read_disk_no_error
        mov bx , diskErrorMsg
        call print_string
    jmp $

read_disk_no_error:
popa
ret

diskErrorMsg db "[Error] Reading Disk Failed", 0
abc db "abc", 0
