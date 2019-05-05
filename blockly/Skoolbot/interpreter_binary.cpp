#define NOP_ 0x00
#define NUMBER 0x01
#define ADD 0x02
#define SUB 0x03
#define MUL 0x04
#define DIV 0x05
#define POW 0x06
#define ABS 0x07
#define NEG 0x08
#define ISEVEN 0x09
#define ISODD 0x0A
#define ISPOSITIVE 0x0B
#define ISNEGATIVE 0x0C
#define ISDIVISBLEBY 0x0D
#define REMAINDER 0x0E
#define CONSTRAIN 0x0F
#define RANDOMINT 0x10
#define CMPE 0x11
#define CMPNE 0x12
#define CMPL 0x13
#define CMPLE 0x14
#define CMPG 0x15
#define CMPGE 0x16
#define TRUE  0x17
#define FALSE 0x18
#define NEGATE 0x19
#define NULL_ 0x1A
#define GET 0x1B
#define SET 0x1C
#define JUMPZ 0x1D
#define JUMP 0x1E
#define PRINT 0x1F
#define BOOLEAN 0x20

#include <iostream>
#include <fstream>
#include <stack>
#include <string>
#include <vector>
#include <map>
#include <cmath>

// #include <stdint.h>

// using namespace std;


int getStack(std::stack <int> s) {
  if (s.empty()) {
    std::cout<<"empty stack, pop is not allowed"<<std::endl;
    return 1;
  }
  int get = s.top();
  s.pop();
  return get;
}

int main (int argc, char *argv[]) {
  if (argc != 2) {
    std::cout<<"No specified file to open ";
    std::cout<<"or too many arguments"<<std::endl;
    return 1;
  }

  // open a file in read mode.
  std::ifstream file;
  file.open(argv[1], std::ifstream::binary|std::ifstream::in);

  if (!file.is_open()) {
    std::cout<<"Cannot open the file"<<std::endl;
    return 1;
  }

  std::string command;
  std::vector<int> program;
  // std::map<uni8_t, int> jumpPos;
  int code;
  unsigned int counter = 0;
  while (file >> command) {
    code = std::stoi(command,nullptr,16);
    program.push_back(code);
    // std::cout<<"code type: "<<typeid(code).name()<<" program type: "<<typeid(program[counter]).name();
    std::cout<<" program: "<<program[counter]<<std::endl;
    // if ((program[counter].compare(JUMP) == 0) || (program[counter].compare(JUMPZ) == 0)) {
    //   ++counter;
    //   file>>command;
    //   program.push_back(command);
    // } else if ((command.at(0) == 'L' && command.at(1) == '0' && command.at(2) == '_') ||
    //            (command.at(0) == 'L' && command.at(1) == '1' && command.at(2) == '_')) {
    //   jumpPos[command] = counter;
    //   program[counter] = "nop";
    // }
    ++counter;
  }

  // counter = 0;
  // while(counter != program.size()) {
  //   command = program[counter];
  //   if ((command.at(0) == 'L' && command.at(1) == '0' && command.at(2) == '_') ||
  //       (command.at(0) == 'L' && command.at(1) == '1' && command.at(2) == '_')) {
  //     program[counter] = std::to_string(jumpPos[command]);
  //   }
  //   ++counter;
  // }

  counter = -1;
  std::map<std::string, int> intVar;
  std::stack <int> s;
  int a;
  int b;
  while(counter != program.size()) {
    ++counter;
    switch (program[counter]) {
      case NUMBER:
        ++counter;
        s.push(program[counter]);
        break;
      case ADD:
        a = getStack(s);
        b = getStack(s);
        s.push(a + b);
        break;
      case SUB:
        a = getStack(s);
        b = getStack(s);
        s.push(b - a);
        break;
      case MUL:
        a = getStack(s);
        b = getStack(s);
        s.push(a * b);
        break;
      case DIV:
        a = getStack(s);
        if (a <= 0) {
          std::cout<<"Invalid denominator: "<<a<<std::endl;
          return 1;
        }
        b = getStack(s);
        s.push(b / a);
        break;
      case POW:
        a = getStack(s);
        b = getStack(s);
        s.push(pow(b, a));
        break;
      case ABS:
        a = getStack(s);
        if (a < 0) {
          a = a*-1;
        }
        s.push(a);
        break;
      case NEG:
        a = getStack(s);
        a = a*-1;
        s.push(a);
        break;
      case ISEVEN:
        a = getStack(s);
        s.push(a%2);
        break;
      case ISODD:
        a = getStack(s);
        if (a%2 == 0) {
          s.push(1);
        } else {
          s.push(0);
        }
        break;
      case ISPOSITIVE:
        a = getStack(s);
        if (a >= 0) {
          s.push(0);
        } else {
          s.push(1);
        }
        break;
      case ISNEGATIVE:
        a = getStack(s);
        if (a < 0) {
          s.push(0);
        } else {
          s.push(1);
        }
        break;
      case ISDIVISBLEBY:
        a = getStack(s);
        b = getStack(s);
        if (b % a == 0) {
          s.push(0);
        } else {
          s.push(1);
        }
        break;
      case REMAINDER:
        a = getStack(s);
        b = getStack(s);
        s.push(b % a);
        break;
      case CONSTRAIN:
        a = getStack(s);
        b = getStack(s);
        if (a < b) {
          a = b;
        }

        b = getStack(s);
        if (a > b) {
          a = b;
        }
        s.push(a);
        break;
      case RANDOMINT:
       std::cout<<"cannot test random, default number is 2 "<<program[counter]<<"\n";
       s.push(2);
       break;
      case CMPE:
        a = getStack(s);
        b = getStack(s);
        if (b == a) {
          s.push(0);
        } else {
          s.push(1);
        }
        break;
      case CMPNE:
        a = getStack(s);
        b = getStack(s);
        if (b != a) {
          s.push(0);
        } else {
          s.push(1);
        }
        break;
      case CMPL:
        a = getStack(s);
        b = getStack(s);
        if (b < a) {
          s.push(0);
        } else {
          s.push(1);
        }
        break;
      case CMPLE:
        a = getStack(s);
        b = getStack(s);
        if (b <= a) {
          s.push(0);
        } else {
          s.push(1);
        }
        break;
      case CMPG:
        a = getStack(s);
        b = getStack(s);
        if (b > a) {
          s.push(0);
        } else {
          s.push(1);
        }
        break;
      case CMPGE:
        a = getStack(s);
        b = getStack(s);
        if (b >= a) {
          s.push(0);
        } else {
          s.push(1);
        }
        break;
      case NEGATE:
        a = getStack(s);
        if (a == 0) {
          s.push(1);
        } else if (a == 1) {
          s.push(0);
        } else {
          std::cout<<"Invalid stack element for negate: "<<a<<std::endl;
          return 1;
        }
        break;
      case NULL_:
        s.push(-1); // need to check this ???
      case GET:
        // ++counter;
        // std::string varName = program[counter];
        // result = intVar[varName];
        // s.push(result);
        break;
      case SET:
        // a = getStack(s);
        // ++counter;
        // std::string varName = program[counter];
        // intVar[varName] = a;
        break;
      case JUMPZ:
        // ++counter;
        // int condition = getStack(s);
        // if (condition == 1) {
        //   if (program[counter] >= program[counter].size() || program[counter] < 0) {
        //     std::cout<<"Invalid jump number\n"<<std::endl;
        //     return 1;
        //   }
        // }
        break;
      case JUMP:
        // ++counter;
        // if (program[counter] >= program[counter].size() || program[counter] < 0) {
        //   std::cout<<"Invalid jump number\n"<<std::endl;
        //   return 1;
        // }
        break;
      case PRINT:
        a = getStack(s);
        std::cout<<a<<"\n";
        break;
      case BOOLEAN:
        ++counter;
        if (program[counter] == TRUE) {
          s.push(0);
        } else if (program[counter] == FALSE) {
          s.push(1);
        } else {
          std::cout<<"Invalid command: "<<program[counter]<<std::endl;
          return -1;
        }
        break;
      case NOP_:
        break;
      default:
        std::cout<<"Invalid command: "<<program[counter]<<std::endl;
        return 1;
    }
  }

  if (s.empty()) {
    std::cout<<"empty stack, pop is not allowed"<<std::endl;
    return 0;
  }
  std::cout<<s.top()<<std::endl;
  s.pop();
  file.close();
  return 0;
}
