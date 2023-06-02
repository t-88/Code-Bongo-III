#!/bin/bash
boot_sect=boot_sect
os_name=os_img.os

echo nasm -f elf kernel_entry.asm -o kernel_entry.o  
nasm -f elf  kernel_entry.asm -o kernel_entry.o
echo nasm -f bin $boot_sect.asm -o $boot_sect.bin  
nasm -f bin $boot_sect.asm -o $boot_sect.bin

gcc -ffreestanding -fno-pie -m32 -c kernel.c -o kernel.o

ld -e main -m elf_i386 -s -o kernel.bin -Ttext 0x1000 kernel_entry.o kernel.o --oformat binary
cat $boot_sect.bin kernel.bin > $os_name


echo qemu-system-x86_64 -drive file=$os_name,index=0,if=floppy
qemu-system-x86_64 -drive file=$os_name,index=0,if=floppy,format=raw