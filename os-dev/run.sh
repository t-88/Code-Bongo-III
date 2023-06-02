#!/bin/bash

file=boot_sect
echo nasm -f bin $file.asm -o $file.bin  
nasm -f bin $file.asm -o $file.bin
echo qemu-system-x86_64 -drive file=$file.bin,index=0,if=floppy
qemu-system-x86_64 -drive file=$file.bin,index=0,if=floppy,format=raw