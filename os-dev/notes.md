### Reading Disk
- use int 0x13 for disk ops
- ah => 2 for reading sectors
- dl => select read drive
- ch => select cylinder
- dh => select track starts from 0 !!
- cl => select sector to read starts from 1 !! 
- al => number of sectors to be read

### Moving The Cursor
-   moving the stupid currsor tooks years
-   i used objdump to read the asm code and rewrote it in inline gcc and this simple idea took me 2 hours to come up with nice :)