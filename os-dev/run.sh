#!/bin/bash
boot_sect=boot_sect
os_name=os_img.os

echo nasm -f elf asm/kernel_entry.asm -o kernel_entry.o  
nasm -f elf  asm/kernel_entry.asm -o kernel_entry.o
echo nasm -f bin asm/$boot_sect.asm -o $boot_sect.bin  
nasm -f bin asm/$boot_sect.asm -o $boot_sect.bin
echo gcc -ffreestanding -fno-pie -m32  -c kernel/kernel.c -Ikernel/*.h -Idrivers/*.h -o kernel.o
gcc -ffreestanding -fno-pie -m32  -c kernel/kernel.c -Ikernel/*.h  -Idrivers/*.h -o  kernel.o
echo ld -e main -m elf_i386 -s -o kernel.bin -Ttext 0x1000 kernel_entry.o kernel.o --oformat binary
ld -e main -m elf_i386 -s -o kernel.bin -Ttext 0x1000 kernel_entry.o kernel.o --oformat binary
echo cat $boot_sect.bin kernel.bin > $os_name
cat $boot_sect.bin kernel.bin > $os_name

echo qemu-system-x86_64 -drive file=$os_name,index=0,if=floppy
qemu-system-x86_64 -drive file=$os_name,index=0,if=floppy,format=raw

# rm *.os *.bin *.o
