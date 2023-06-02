[bits 32]
print_string_pm:
pusha
    mov ah , 0x0f
    mov edx , 0xb8000
    print_string_pm_loop:
        mov al , [ebx]
        cmp al , 0
        je print_string_pm_exit

        mov [edx], ax
        inc ebx
        add edx , 2 
    jmp print_string_pm_loop
print_string_pm_exit:
popa
ret