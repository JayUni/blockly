#include <iostream>
#include <stack>
#include <string>
#include <string.h>
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
#define JUMPNZ        (0x22)
#define CHANGE        (0x23)
#define AND           (0x24)
#define OR            (0x25)
#define PINMODE       (0x26)
#define DREAD         (0x27)
#define DWRITE        (0x28)
#define AREAD         (0x29)
#define AWRITE        (0x2A)
#define DELAY         (0x2B)

#define STACK_SIZE    (512)
#define MEMORY_SIZE   (1024)
#define CODE_SIZE     (1024)

#define GETARG uint32_t(uint32_t(code[ip+1]) | uint32_t(code[ip+2])<<8)

uint8_t code[CODE_SIZE];
size_t ip = 0;

int16_t stack[STACK_SIZE];
size_t stack_ptr = 0;

int16_t memory[MEMORY_SIZE];

void push(int16_t data) {

  assert(stack_ptr < STACK_SIZE && "stack overflow");
  // std::cout<<"push: "<<stack_ptr<<std::endl;
  stack[stack_ptr++] = data;
}

int16_t pop() {
  assert(stack_ptr >= 0 && "stack underflow");
  // std::cout<<"pop: "<<stack_ptr<<std::endl;
  return stack[--stack_ptr];
}

void run() {
  int16_t op1;
  int16_t op2;
  for(ip=0;ip<CODE_SIZE;ip++) {
    switch(code[ip]) {
      case NOP_:
        break;
      case NUMBER:
        {
          int16_t value = (int16_t)GETARG;
          ip += 2;
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
      {
        op1 = pop();
        op2 = pop();
        int16_t num = pop();
        if (num > op1) {
          num = op1;
        } else if (num < op2) {
          num = op2;
        }
        push(num);
      }
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
          size_t addr = GETARG;
          ip += 2;
          push(memory[addr]);
        }
        break;
      case SET:
        {
          size_t addr = GETARG;
          int16_t value = pop();
          if (addr >= MEMORY_SIZE) {
            std::cout<<"Memery Overflow"<<std::endl;
            return;
          }
          memory[addr] = value;
          ip += 2;
        }
        break;
      case JUMPZ:
        {
          int16_t value = pop();
          size_t addr = GETARG;
          ip += 2;
          if (value == 0) {
             ip = addr;
          }
        }
        break;
      case JUMPNZ:
          {
            int16_t value = pop();
            size_t addr = GETARG;
            ip += 2;
            if (value != 0) {
               ip = addr;
            }
          }
          break;
      case JUMP:
        {
          size_t addr = GETARG;
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
        if ((int16_t)code[ip] == TRUE) {
          push(0);
        } else if ((int16_t)code[ip] == FALSE) {
          push(1);
        } else {
          std::cerr<<"Invalid BOOLEAN command: "<<std::hex<<(int16_t)code[ip]<<std::endl;
          return;
        }
        break;
      case STOP:
        return;
      case CHANGE:
        {
          size_t addr = GETARG;
          ip += 2;
          int16_t value = pop();
          memory[addr] += value;
        }
        break;
      case AND:
        {
          int16_t val1 = pop();
          int16_t val2 = pop();
          if (val1 == 0 && val2 == 0) {
            push(0);
          } else {
            push(1);
          }
        }
        break;
      case OR:
        {
          int16_t val1 = pop();
          int16_t val2 = pop();
          if (val1 == 0 || val2 == 0) {
            push(0);
          } else {
            push(1);
          }
        }
        break;
        case PINMODE:
        {
          size_t addr = GETARG;
          ip += 2;
          size_t value = pop();

         std::cout<<"pinMode: "<<value<<" "<<memory[addr]<<std::endl;

        }
        break;
       case DREAD:
        {
          size_t addr = GETARG;
          ip += 2;

          std::cout<<"DREAD: "<<memory[addr]<<std::endl;

        }
        break;
       case DWRITE:
        {
          size_t addr = GETARG;
          ip += 2;

          int16_t value = pop();
          std::cout<<"DWRITE: "<<value<<" "<<memory[addr]<<std::endl;

        }
        break;
       case AREAD:
        {
          size_t addr = GETARG;
          ip += 2;

          // int val = analogRead(memory[addr]);
          std::cout<<"AREAD: "<<memory[addr]<<std::endl;

        }
        break;
       case AWRITE:
        {
          size_t addr = GETARG;
          ip += 2;
          int16_t value = pop();
          std::cout<<"DWRITE: "<<value<<" "<<memory[addr]<<std::endl;

        }
        break;
       case DELAY:
        {
          int16_t val = pop();
          std::cout<<"Delay: "<<val<<std::endl;
        }
        break;
      default:
        std::cerr<<"Invalid command: "<<std::hex<<(int16_t)code[ip]<<std::endl;
        return;
    }
  }
}

// 1 = true, 0 = false
void run_symbol() {
  for(ip=0;ip<CODE_SIZE;ip++) {
    std::cout<<"ip: "<< ip <<" ";
    switch(code[ip]) {
      case NOP_:
        std::cout << "NOP"<<std::endl;
        break;
      case NUMBER:
        {
          // int16_t value = code[ip++];
          // value |= (code[ip++] << 8);
          std::cout << "Number "; //<< (int16_t)value << std::endl;
          std::cout << (int16_t)GETARG << std::endl;
          ip+=2;
        }
        break;
      case ADD:
        std::cout << "ADD" << std::endl;
        break;
      case SUB:
        std::cout << "SUB" << std::endl;
        break;
      case MUL:
        std::cout << "MUL" << std::endl;
        break;
      case DIV:
        std::cout << "DIV" << std::endl;
        break;
      case POW:
        std::cout << "POW" << std::endl;
        break;
      case ABS:
        std::cout << "ABS" << std::endl;
        break;
      case NEG:
        std::cout << "NEG" << std::endl;
        break;
      case ISEVEN:
        std::cout << "ISEVEN" << std::endl;
        break;
      case ISODD:
        std::cout << "ISODD" << std::endl;
        break;
      case ISPOSITIVE:
        std::cout << "ISPOSITIVE" << std::endl;
        break;
      case ISNEGATIVE:
        std::cout << "ISNEGATIVE" << std::endl;
        break;
      case ISDIVISBLEBY:
        std::cout << "ISDIVISBLEBY" << std::endl;
        break;
      case REMAINDER:
        std::cout << "REMAINDER" << std::endl;
        break;
      case CONSTRAIN:
        std::cout << "CONSTRAIN" << std::endl;
        break;
      case RANDOMINT:
       std::cout << "RANDOMINT" << std::endl;
       break;
      case CMPE:
        std::cout << "CMPE" << std::endl;
        break;
      case CMPNE:
        std::cout << "CMPNE" << std::endl;
        break;
      case CMPL:
        std::cout << "CMPL" << std::endl;
        break;
      case CMPLE:
        std::cout << "CMPLE" << std::endl;
        break;
      case CMPG:
        std::cout << "CMPG" << std::endl;
        break;
      case CMPGE:
        std::cout << "CMPGE" << std::endl;
        break;
      case NEGATE:
        std::cout << "NEGATE" << std::endl;
        break;
      case NULL_:
        std::cout << "NULL_" << std::endl;
      case GET:
        {
          // int16_t addr = code[ip++];
          // addr |= (code[ip++]<<8);
          std::cout << "GET ";
          std::cout << (size_t)GETARG << std::endl;
          ip+=2;
        }

        break;
      case SET:
        {
          // int16_t addr = code[ip++];
          // addr |= (code[ip++]<<8);
          size_t addr = GETARG;
          if (addr >= MEMORY_SIZE) {
            std::cout<<"Memery Overflow"<<std::endl;
            return;
          }
          std::cout << "SET ";
          std::cout << (size_t)GETARG << std::endl;

          ip+=2;
        }
        break;
      case JUMPZ:
        {
          // int16_t addr = code[ip+1];
          // addr |= (code[ip+2]<<8);

          std::cout << "JUMPZ ";
          std::cout << (size_t)GETARG << std::endl;
          ip+=2;

        }
        break;
      case JUMPNZ:
          {
            // int16_t addr = code[ip++];
            // addr |= (code[ip++]<<8);
            // std::cout<<(uint16_t)code[ip+1]<<std::endl;
            // std::cout<<(uint16_t)code[ip+2]<<std::endl;
            // std::cout<<uint16_t(uint16_t(code[ip+1]) | uint16_t(code[ip+2]<<8))<<std::endl;
            std::cout << "JUMPNZ ";
            std::cout << (size_t)GETARG << std::endl;
            ip+=2;
          }
          break;
      case JUMP:
        {
          // int16_t addr = code[ip++];
          // addr |= (code[ip++]<<8);
          std::cout << "JUMP ";
          std::cout << (size_t)GETARG << std::endl;
          ip+=2;
        }
        break;
      case PRINT:
        {
          std::cout << "PRINT" << std::endl;
        }
        break;
      case BOOLEAN:
        ++ip;
        std::cout << "BOOLEAN " << std::hex<<(int16_t)code[ip] << std::endl;
        break;
      case STOP:
        std::cout << "STOP" << std::endl;
        return;
      case CHANGE:
          std::cout << "CHANGE ";
          std::cout << (size_t)GETARG << std::endl;
          ip+=2;
        break;
      case AND:
        {
          std::cout << "AND" << std::endl;
        }
        break;
      case OR:
        {
          std::cout << "OR" << std::endl;
        }
        break;
        case PINMODE:
        {
          size_t addr = GETARG;
          ip += 2;
          size_t value = pop();

         std::cout<<"pinMode: "<<value<<" "<<memory[addr]<<std::endl;

        }
        break;
       case DREAD:
        {
          size_t addr = GETARG;
          ip += 2;

          std::cout<<"DREAD: "<<memory[addr]<<std::endl;

        }
        break;
       case DWRITE:
        {
          size_t addr = GETARG;
          ip += 2;

          int16_t value = pop();
          std::cout<<"DWRITE: "<<value<<" "<<memory[addr]<<std::endl;

        }
        break;
       case AREAD:
        {
          size_t addr = GETARG;
          ip += 2;

          // int val = analogRead(memory[addr]);
          std::cout<<"AREAD: "<<memory[addr]<<std::endl;

        }
        break;
       case AWRITE:
        {
          size_t addr = GETARG;
          ip += 2;
          int16_t value = pop();
          std::cout<<"DWRITE: "<<value<<" "<<memory[addr]<<std::endl;

        }
        break;
       case DELAY:
        {
          int16_t val = pop();
          std::cout<<"Delay: "<<val<<std::endl;
        }
        break;
      default:
        std::cerr<<"Invalid command: "<<std::hex<<(int16_t)code[ip]<<std::endl;
        return;
    }
  }
}

// 1 = true, 0 = false
void run_both() {
  int16_t op1;
  int16_t op2;
  int16_t value;
  size_t addr;
  for(ip=0;ip<CODE_SIZE;ip++) {
    std::cout<<"ip: "<< ip <<" ";
    switch(code[ip]) {
      case NOP_:
        std::cout << "NOP"<<std::endl;
        break;
      case NUMBER:

          std::cout << "NUMBER "; //<< (int16_t)value << std::endl;
          // std::cout << (int16_t)(code[ip+1] + (code[ip+2]  << 8)) << std::endl;
          value = (int16_t)GETARG;
          std::cout<< (int16_t)GETARG << std::endl;
          push(value);
          ip += 2;

        break;
      case ADD:

          op1 = pop();
          op2 = pop();
          push(op1 + op2);
          std::cout << "ADD" << std::endl;

        break;
      case SUB:
        op1 = pop();
        op2 = pop();
        push(op2 - op1);
        std::cout << "SUB" << std::endl;
        break;
      case MUL:
        op1 = pop();
        op2 = pop();
        push(op1 * op2);
        std::cout << "MUL" << std::endl;
        break;
      case DIV:
        op1 = pop();
        assert(op1 != 0 && "Invalid zero denominator");
        op2 = pop();
        push(op2 / op1);
        std::cout << "DIV" << std::endl;
        break;
      case POW:
        op1 = pop();
        op2 = pop();
        push(pow(op2, op1));
        std::cout << "POW" << std::endl;
        break;
      case ABS:
        op1 = pop();
        if (op1 < 0) {
          op1 = op1*-1;
        }
        push(op1);
        std::cout << "ABS" << std::endl;
        break;
      case NEG:
        op1 = pop();
        push(op1*-1);
        std::cout << "NEG" << std::endl;
        break;
      case ISEVEN:
        op1 = pop();
        if (op1%2 == 0) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "ISEVEN " <<op1%2<< std::endl;
        break;
      case ISODD:
        op1 = pop();
        if (op1%2 == 1) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "ISODD " <<op1%2<< std::endl;
        break;
      case ISPOSITIVE:
        op1 = pop();
        if (op1 >= 0) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "ISPOSITIVE" << std::endl;
        break;
      case ISNEGATIVE:
        op1 = pop();
        if (op1 < 0) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "ISNEGATIVE" << std::endl;
        break;
      case ISDIVISBLEBY:
        op1 = pop();
        op2 = pop();
        if (op2 % op1 == 0) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "ISDIVISBLEBY" << std::endl;
        break;
      case REMAINDER:
        op1 = pop();
        op2 = pop();
        push(op2 % op1);
        std::cout << "REMAINDER" << std::endl;
        break;
      case CONSTRAIN:
      {
        op1 = pop();
        op2 = pop();
        int16_t num = pop();
        std::cout<<"CONSTRAIN" <<op1 << " " << op2 << " to num: " <<num<<std::endl;
        if (num > op1) {
          num = op1;
        } else if (num < op2) {
          num = op2;
        }
        push(num);
      }
        break;
      case RANDOMINT:
       std::cout<<"cannot test random integer, default number is 2"<<"\n";
       push(2);
       std::cout << "RANDOMINT" << std::endl;
       break;
      case CMPE:
        op1 = pop();
        op2 = pop();
        if (op2 == op1) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "CMPE" << std::endl;
        break;
      case CMPNE:
        op1 = pop();
        op2 = pop();
        if (op2 != op1) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "CMPNE" << std::endl;
        break;
      case CMPL:
        op1 = pop();
        op2 = pop();
        if (op2 < op1) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "CMPL" << std::endl;
        break;
      case CMPLE:
        op1 = pop();
        op2 = pop();
        if (op2 <= op1) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "CMPLE" << std::endl;
        break;
      case CMPG:
        op1 = pop();
        op2 = pop();
        if (op2 > op1) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "CMPG" << std::endl;
        break;
      case CMPGE:
        op1 = pop();
        op2 = pop();
        if (op2 >= op1) {
          push(0);
        } else {
          push(1);
        }
        std::cout << "CMPGE" << std::endl;
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
        std::cout << "NEGATE" << std::endl;
        break;
      case NULL_:
        push(-1); // need to check this ???
        std::cout << "NULL_" << std::endl;
      case GET:

          addr = GETARG;
          ip += 2;
          push(memory[addr]);
          std::cout << "GET " << addr<<std::endl;

        break;
      case SET:

          if (addr >= MEMORY_SIZE) {
            std::cout<<"Memery Overflow"<<std::endl;
            return;
          }

          addr = GETARG;
          ip += 2;
          value = pop();
          memory[addr] = value;
          std::cout << "SET " << addr<<std::endl;

        break;
      case JUMPZ:

          value = pop();
          addr = GETARG;
          ip += 2;
          if (value == 0) {
             ip = addr;
             std::cout<<"JUMPZ "<<ip<<std::endl;
          }
        break;
      case JUMPNZ:
            value = pop();
            addr = GETARG;
            // std::cout<<"JUMPNZ "<<addr<<std::endl;
            ip += 2;
            if (value != 0) {
               ip = addr;
               std::cout<<"JUMPNZ "<<ip<<std::endl;
            }
          break;
      case JUMP:
          //addr<<std::endl;
          // std::cout << (int16_t)(code[ip+1] + (code[ip+2]  << 8)) << std::endl;
          // //
          addr = GETARG;
          ip = addr;
          std::cout<<"JUMP "<< ip <<std::endl;
        break;
      case PRINT:

        std::cout << "PRINT ";
        // int16_t data = pop();
        std::cout << pop() << std::endl;

        break;
      case BOOLEAN:
        ++ip;
        if (code[ip] == TRUE) {
          push(0);
        } else if (code[ip] == FALSE) {
          push(1);
        } else {
          std::cerr<<"Invalid BOOLEAN command: "<<std::hex<<(int16_t)code[ip]<<std::endl;
          return;
        }
        std::cout << "BOOLEAN "<<std::hex<<(int16_t)code[ip] << std::endl;
        break;
      case STOP:
        std::cout << "STOP" << std::endl;
        return;
      case CHANGE:

        addr = GETARG;
        ip += 2;
        value = pop();
        memory[addr] += value;
        std::cout << "CHANGE " << addr <<std::endl;

        break;
      case AND:
        {
          int16_t val1 = pop();
          int16_t val2 = pop();
          if (val1 == 0 && val2 == 0) {
            push(0);
          } else {
            push(1);
          }
          std::cout << "AND " << (val1 == 0 && val2 == 0) <<std::endl;
        }
        break;
      case OR:
        {
          int16_t val1 = pop();
          int16_t val2 = pop();
          if (val1 == 0 || val2 == 0) {
            push(0);
          } else {
            push(1);
          }
          std::cout << "OR " << (val1 == 0 || val2 == 0) <<std::endl;
        }
        break;
        case PINMODE:
        {
          size_t addr = GETARG;
          ip += 2;
          size_t value = pop();

         std::cout<<"pinMode: "<<value<<" "<<memory[addr]<<std::endl;

        }
        break;
       case DREAD:
        {
          size_t addr = GETARG;
          ip += 2;

          std::cout<<"DREAD: "<<memory[addr]<<std::endl;

        }
        break;
       case DWRITE:
        {
          size_t addr = GETARG;
          ip += 2;

          int16_t value = pop();
          std::cout<<"DWRITE: "<<value<<" "<<memory[addr]<<std::endl;

        }
        break;
       case AREAD:
        {
          size_t addr = GETARG;
          ip += 2;

          // int val = analogRead(memory[addr]);
          std::cout<<"AREAD: "<<memory[addr]<<std::endl;

        }
        break;
       case AWRITE:
        {
          size_t addr = GETARG;
          ip += 2;
          int16_t value = pop();
          std::cout<<"DWRITE: "<<value<<" "<<memory[addr]<<std::endl;

        }
        break;
       case DELAY:
        {
          int16_t val = pop();
          std::cout<<"Delay: "<<val<<std::endl;
        }
        break;
      default:
        std::cerr<<"Invalid reading command: "<<std::hex<<(int16_t)code[ip]<<std::endl;
        return;
    }
  }
}

int main (int argc, char *argv[]) {
  int debug = 0;

  if (argc < 2) {
    std::cout<<"No specified file to open ";
    return 1;
  }

//1 if true and 0 if false
//debug mode

  if (argc == 3) {
    if (strcmp(argv[2],"-d") == 0) {
      debug = 1;
    } else if (strcmp(argv[2], "-db") == 0) {
      debug = 2;
    }
  }

  if(FILE *file = fopen(argv[1],"rb")) {
     fread(code, CODE_SIZE, 1, file);
     if (debug == 1) {
       run_symbol();
     } else if (debug == 2) {
       run_both();
     } else {
       run();
     }
  } else {
     std::cerr<<"Cannot open file: "<<argv[1]<<std::endl;
  }
}
