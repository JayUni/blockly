#define number 0x0001
#define add 0x0002
#define sub 0x0003
#define mul 0x0004
#define div 0x0005
#define pow 0x0006
#define abs 0x0007
#define neg 0x0008
#define isEven 0x0009
#define isOdd 0x000a
#define isPositive 0x000b
#define isNegative 0x000c
#define isDivisbleBy 0x000d
#define remainder 0x000e
#define constrain 0x000f
#define randomInt 0x0010
#define compe 0x0011
#define compne 0x0012
#define compl 0x0013
#define comple 0x0014
#define cmpg 0x0015
#define cmpge 0x0016
#define True  0x0017
#define False 0x0018
#define negate 0x0019
#define Null 0x001a
#define get 0x001b
#define set 0x001c
#define JumpZ 0x001d
#define Jump 0x001e
#define print 0x001f
#define boolean 0x0020
#define nop 0x0021

#include <iostream>
#include <fstream>
#include <stack>
#include <string>
#include <vector>
#include <map>
#include <cmath>

using namespace std;

int main (int argc, char *argv[]) {
  if (argc != 2) {
    std::cout<<"No specified file to open ";
    std::cout<<"or too many arguments"<<std::endl;
    return 0;
  }

  // open a file in read mode.
  std::ifstream file;
  file.open(argv[1]);

  if (!file.is_open()) {
    std::cout<<"Cannot open the file"<<std::endl;
    return 0;
  }

  std::hex command;
  std::vector<uni8_t> program;
  std::map<uni8_t, int> jumpPos;
  unsigned int counter = 0;
  while (file>>command) {
    program.push_back(command);
    if ((program[counter].compare(JUMP) == 0) || (program[counter].compare(JUMPZ) == 0)) {
      ++counter;
      file>>command;
      program.push_back(command);
    } else if ((command.at(0) == 'L' && command.at(1) == '0' && command.at(2) == '_') ||
               (command.at(0) == 'L' && command.at(1) == '1' && command.at(2) == '_')) {
      jumpPos[command] = counter;
      program[counter] = "nop";
    }
    ++counter;
  }

  counter = 0;
  while(counter != program.size()) {
    command = program[counter];
    if ((command.at(0) == 'L' && command.at(1) == '0' && command.at(2) == '_') ||
        (command.at(0) == 'L' && command.at(1) == '1' && command.at(2) == '_')) {
      program[counter] = std::to_string(jumpPos[command]);
    }
    ++counter;
  }
}
