### Reading Disk
- use int 0x13 for disk ops
- ah => 2 for reading sectors
- dl => select read drive
- ch => select cylinder
- dh => select track starts from 0 !!
- cl => select sector to read starts from 1 !! 
- al => number of sectors to be read