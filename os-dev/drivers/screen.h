#ifndef SCREEN_H_
#define SCREEN_H_
#include "../kernel/low_lvl.h"
#include <stdint.h>

#define VIDEO_ADDR 0xb8000 
#define MAX_COLS 80 // indexing starts from 0
#define MAX_ROWS 25

#define WHITE_ON_BLACK 0x0f

// screen drivce I/O ports
#define REG_SCREEN_CTRL 0x3D4
#define REG_SCREEN_DATA 0x3D5



int get_cell_pos(int row, int col) {
    return (col * MAX_COLS + row) * 2;
}

uint16_t get_cursor() {
    port_byte_out(REG_SCREEN_CTRL,0x0E);
    uint16_t offset = port_word_in(REG_SCREEN_DATA) << 8;
    port_byte_out(REG_SCREEN_CTRL,0x0F);
    offset += port_word_in(REG_SCREEN_DATA);

    return offset * 2;
}
void set_cursor(uint16_t offset) {
    offset /= 2;
    port_byte_out(REG_SCREEN_CTRL,0x0F);
    port_byte_out(REG_SCREEN_DATA,(uint8_t)offset & 0xFF);
    port_byte_out(REG_SCREEN_CTRL,0x0E);
    port_byte_out(REG_SCREEN_DATA,(uint8_t)(offset >> 8) & 0xFF);


}
void set_cursor_rc(int row , int col) {
    uint16_t offset =  col * MAX_COLS + row;
    port_byte_out(REG_SCREEN_CTRL,0x0F);
    port_byte_out(REG_SCREEN_DATA,(uint8_t) offset & 0xFF);
    port_byte_out(REG_SCREEN_CTRL,0x0E);
    port_byte_out(REG_SCREEN_DATA,(uint8_t) (offset >> 8) & 0xFF);

}


void print_char(char chr ,  int row , int col , char attrib) {
    if(chr == '\n') {
        set_cursor_rc(0,get_cursor() / MAX_COLS / 2 + 1);
        return;
    }


    uint8_t* vidmem = (uint8_t *) VIDEO_ADDR;

    if(!attrib) {
        attrib = WHITE_ON_BLACK;
    }
    uint16_t offset = 0; 
    if(col >= 0 && row >= 0) {
        offset = get_cell_pos(row ,col );
    } else {
        offset = get_cursor();
    }




    vidmem[offset] = chr;
    vidmem[offset + 1] = attrib;

    offset += 2;
    set_cursor(offset);
}
void print_str(char* str, int row, int col, char attrib) {
    int i = 0;
    while(str[i] != 0) {
        print_char(str[i],row,col,attrib);
        i++;
    }  
}

void cls() {
    set_cursor_rc(0,0);
    uint8_t* video =  (uint8_t*)VIDEO_ADDR;
    for(int x = 0 ; x < MAX_ROWS * 4; x++) {
        for(int y = 0 ; y < MAX_COLS * 4; y++) {
            video[get_cell_pos(x,y)] = ' ';
        }
    }
}

void print(char* str) { 
    print_str( str, -1, -1, 0);
}



#endif // SCREEN_H_

