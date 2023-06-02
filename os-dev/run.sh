#!/bin/bash

file=boot_sect
echo nasm -f bin $file.asm -o $file.bin  
nasm -f bin $file.asm -o $file.bin
echo qemu-system-x86_64 -drive $file.bin,format=raw  
qemu-system-x86_64 -drive file=$file.bin,format=raw