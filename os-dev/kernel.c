#define VIDEO_ADDR 0xb8000 
#define MAX_COLS 80
#define MAX_ROWS 25

char* video_addr;
int offset = 0;

void print_char(char c, int color) {
    video_addr[offset] = c;
    video_addr[offset+1] = color;
    offset+=2;
}
void print_str(char* c) {
    int index = 0;
    while (c[index] != 0) {
        print_char(c[index],15);
        index++;
    }
}

void main() {
    video_addr = (char*) VIDEO_ADDR;
    char* str = "hello c!";
    print_str(str);
}