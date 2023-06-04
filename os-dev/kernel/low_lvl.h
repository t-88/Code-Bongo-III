#ifndef LOW_LVL_H_
#define LOW_LVL_H_

unsigned char port_byte_in(unsigned char port) {
    unsigned char result;
    __asm__("in %%dx, %%al" :  "=a" (result) : "d" (port));
    return result;
}

void port_byte_out(unsigned short port, unsigned char data) {
    __asm__( 
            "out %%al, (%%dx) \n"
            :
            : "a" (data)
            , "d" (port)
            );
}

unsigned char port_word_in(unsigned short port) {
    unsigned short result;
    __asm__( 
            "in (%%dx) , %%ax   \n"
            : "=a" (result)
            : "d" (port)
            );
    return result;
}

void port_word_out(unsigned char port, unsigned short data) {
    __asm__("out %%ax, %%dx" :  "=a" (data) : "d" (port));
}


#endif // LOW_LVL_H_