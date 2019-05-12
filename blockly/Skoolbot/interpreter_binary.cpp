#include <iostream>
#include <stack>
#include <string>
#include <map>
#include <cmath>
#include <assert.h>

#define NOP_          (0x00)
#define NUMBER        (0x01)
#define ADD           (0x02)
#define SUB           (0x03)
#define MUL           (0x04)
#define DIV           (0x05)
#define POW           (0x06)
#define ABS           (0x07)
#define NEG           (0x08)
#define ISEVEN        (0x09)
#define ISODD         (0x0A)
#define ISPOSITIVE    (0x0B)
#define ISNEGATIVE    (0x0C)
#define ISDIVISBLEBY  (0x0D)
#define REMAINDER     (0x0E)
#define CONSTRAIN     (0x0F)
#define RANDOMINT     (0x10)
#define CMPE          (0x11)
#define CMPNE         (0x12)
#define CMPL          (0x13)
#define CMPLE         (0x14)
#define CMPG          (0x15)
#define CMPGE         (0x16)
#define TRUE          (0x17)
#define FALSE         (0x18)
#define NEGATE        (0x19)
#define NULL_         (0x1A)
#define GET           (0x1B)
#define SET           (0x1C)
#define JUMPZ         (0x1D)
#define JUMP          (0x1E)
#define PRINT         (0x1F)
#define BOOLEAN       (0x20)
#define STOP          (0x21)

#define STACK_SIZE    (512)
#define MEMORY_SIZE   (1024)
#define CODE_SIZE     (1024)

// need a STOP
// int16_t for memory and stack for negative values
// no vector;
// read in bin file

// using namespace std;


int8_t code[CODE_SIZE];
size_t ip = 0;

int16_t stack[STACK_SIZE];
size_t stack_ptr = 0;

int16_t memory[MEMORY_SIZE];

void push(int16_t data) {
  assert(stack_ptr < STACK_SIZE && "stack overflow");
  stack[stack_ptr++] = data;
}

int16_t pop() {
  assert(stack_ptr >= 0 && "stack underflow");
  return stack[--stack_ptr];
}

// 1 = true, 0 = false
void run() {
  int16_t op1;
  int16_t op2;
  for(;;) {
    switch(code[ip++]) {
      case NOP_:
        break;
      case NUMBER:
        {
          int16_t value = code[ip++];
          value |= (code[ip++] << 8);
          push(value);
        }
        break;
      case ADD:
        {
          op1 = pop();
          op2 = pop();
          push(op1 + op2);
        }
        break;
      case SUB:
        op1 = pop();
        op2 = pop();
        push(op2 - op1);
        break;
      case MUL:
        op1 = pop();
        op2 = pop();
        push(op1 * op2);
        break;
      case DIV:
        op1 = pop();
        assert(op1 != 0 && "Invalid zero denominator");
        op2 = pop();
        push(op2 / op1);
        break;
      case POW:
        op1 = pop();
        op2 = pop();
        push(pow(op2, op1));
        break;
      case ABS:
        op1 = pop();
        if (op1 < 0) {
          op1 = op1*-1;
        }
        push(op1);
        break;
      case NEG:
        op1 = pop();
        push(op1*-1);
        break;
      case ISEVEN:
        op1 = pop();
        if (op1%2 == 0) {
          push(0);
        } else {
          push(1);
        }
        break;
      case ISODD:
        op1 = pop();
        if (op1%2 == 1) {
          push(0);
        } else {
          push(1);
        }
        break;
      case ISPOSITIVE:
        op1 = pop();
        if (op1 >= 0) {
          push(0);
        } else {
          push(1);
        }
        break;
      case ISNEGATIVE:
        op1 = pop();
        if (op1 < 0) {
          push(0);
        } else {
          push(1);
        }
        break;
      case ISDIVISBLEBY:
        op1 = pop();
        op2 = pop();
        if (op2 % op1 == 0) {
          push(0);
        } else {
          push(1);
        }
        break;
      case REMAINDER:
        op1 = pop();
        op2 = pop();
        push(op2 % op1);
        break;
      case CONSTRAIN:
        op1 = pop();
        op2 = pop();
        if (op1 < op2) {
          op1 = op2;
        }

        op2 = pop();
        if (op1 > op2) {
          op1 = op2;
        }
        push(op1);
        break;
      case RANDOMINT:
       std::cout<<"cannot test random integer, default number is 2"<<"\n";
       push(2);
       break;
      case CMPE:
        op1 = pop();
        op2 = pop();
        if (op2 == op1) {
          push(0);
        } else {
          push(1);
        }
        break;
      case CMPNE:
        op1 = pop();
        op2 = pop();
        if (op2 != op1) {
          push(0);
        } else {
          push(1);
        }
        break;
      case CMPL:
        op1 = pop();
        op2 = pop();
        if (op2 < op1) {
          push(0);
        } else {
          push(1);
        }
        break;
      case CMPLE:
        op1 = pop();
        op2 = pop();
        if (op2 <= op1) {
          push(0);
        } else {
          push(1);
        }
        break;
      case CMPG:
        op1 = pop();
        op2 = pop();
        if (op2 > op1) {
          push(0);
        } else {
          push(1);
        }
        break;
      case CMPGE:
        op1 = pop();
        op2 = pop();
        if (op2 >= op1) {
          push(0);
        } else {
          push(1);
        }
        break;
      case NEGATE:
        op1 = pop();
        if (op1 == 0) {
          push(1);
        } else if (op1 == 1) {
          push(0);
        } else {
          assert((op1 == 0 || op1 == 1) && "Invalid stack element for negate");
        }
        break;
      case NULL_:
        push(-1); // need to check this ???
      case GET:
        {
          int16_t addr=pop();
          push(memory[addr]);
        }
        break;
      case SET:
        {
          int16_t addr = code[ip++];
          addr |= (code[ip++]<<8);
          int16_t value = pop();
          memory[addr] = value;
        }
        break;
      case JUMPZ:
        {
          int16_t value=pop();
          int16_t addr = code[ip++];
          addr |= (code[ip++]<<8);
          if (value != 0) {
             ip = addr;
          }
        }
        break;
      case JUMP:
        {
          int16_t addr = code[ip++];
          addr |= (code[ip++]<<8);
          ip = addr;
        }
        break;
      case PRINT:
        {
          int16_t data = pop();
          std::cout << data << std::endl;
        }
        break;
      case BOOLEAN:
        ++ip;
        if (code[ip] == TRUE) {
          push(0);
        } else if (code[ip] == FALSE) {
          push(1);
        } else {
          std::cerr<<"Invalid command: "<<code[ip]<<std::endl;
          return;
        }
        break;
      case STOP:
        return;
      default:
        std::cerr<<"Invalid command: "<<code[ip]<<std::endl;
        return;
      }
  }
}

int main (int argc, char *argv[]) {

  if (argc != 2) {
    std::cout<<"No specified file to open ";
    std::cout<<"or too many arguments"<<std::endl;
    return 1;
  }

  if(FILE *file = fopen(argv[1],"rb")) {
     fread(code, CODE_SIZE, 1, file);
     run();
  } else {
     std::cerr<<"Cannot open file: "<<argv[1]<<std::endl;
  }
}
