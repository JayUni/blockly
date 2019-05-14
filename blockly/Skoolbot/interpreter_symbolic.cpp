#include <iostream>
#include <fstream>
#include <stack>
#include <string>
#include <vector>
#include <map>
#include <cmath>

using namespace std;

int getStack(std::stack <int> s) {
  if (s.empty()) {
    std::cout<<"empty stack, pop is not allowed"<<std::endl;
    return 0;
  }
  int num = s.top();
  s.pop();
  return num;
}

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

  std::string command;
  std::vector<std::string> program;
  std::map<std::string, int> jumpPos;
  unsigned int counter = 0;
  while (file>>command) {
    program.push_back(command);
    if ((program[counter].compare("JUMP") == 0) ||
        (program[counter].compare("JUMPZ") == 0) ||
        (program[counter].compare("JUMPNZ") == 0)) {
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

  // counter = 0;
  // while(counter != program.size()) {
  //   std::cout<<program[counter]<<"  "<<counter<<std::endl;
  //   ++counter;
  // }

  counter = 0;
  std::map<std::string, int> intVar;
  std::map<std::string, std::string> strVar;
  std::stack <int> s;
  int result = 0;

  while(counter != program.size()) {
    command = program[counter];
    //std::cout<<command<<std::endl;
    if (command.compare("number") == 0) {
      ++counter;
      command = program[counter];

      std::string::size_type size;
      int num = std::stoi (command, &size);
      if (size != command.size()) {
        std::cout<<"Invalid number\n"<<std::endl;
        return 0;
      }
      s.push(num);
    } else if (command.compare("add") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      result = a + b;
      s.push(result);
    }
    else if (command.compare("sub") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      result = b - a;
      s.push(result);
    } else if (command.compare("mul") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      result = a * b;
      s.push(result);
    } else if (command.compare("div") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      result = b / a; //check denominator is 0 error
      s.push(result);
    } else if (command.compare("pow") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      result = pow(b, a);
      s.push(result); //check order
    } else if (command.compare("abs") == 0) {
      int num = getStack(s);
      if (num < 0) {
        num = num*-1;
      }
      s.push(num);
    } else if (command.compare("neg") == 0) {
      int num = getStack(s);
      num = num*-1;
      s.push(num);
    } else if (command.compare("isEven") == 0) {
      int num = getStack(s);
      s.push(num%2);
    } else if (command.compare("isOdd") == 0) {
      int num = getStack(s);
      if (num%2 == 0) {
        s.push(1);
      } else {
        s.push(0);
      }
    } else if (command.compare("isPositive") == 0) {
      int num = getStack(s);
      if (num >= 0) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("isNegative") == 0) {
      int num = getStack(s);
      if (num < 0) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("isDivisbleBy") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      result = b % a;
      if (result == 0) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("remainder") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      result = b % a;
      s.push(result);
    } else if (command.compare("constrain") == 0) {
      int num = getStack(s);
      int min = getStack(s);
      int max = getStack(s);
      if (num < min) {
        num = min;
      } else if (num > max) {
        num = max;
      }
      s.push(num);
    } else if (command.compare("randomInt") == 0) {
      // time_t t;
     // /* Intializes random number generator */
     // srand((unsigned) time(&t)); //should not have random
     // result = rand() % 100;
     // s.push(result);
     std::cout<<"cannot test random, default number is 2 "<<command<<"\n";
     s.push(2);
   } else if (command.compare("cmpe") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      if (b == a) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("cmpne") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      if (b != a) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("cmpl") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      if (b < a) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("cmple") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      if (b <= a) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("cmpg") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      if (b > a) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("cmpge") == 0) {
      int a = getStack(s);
      int b = getStack(s);
      if (b >= a) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("negate") == 0) {
      int num = getStack(s);
      if (num == 0) {
        s.push(1);
      } else if (num == 1) {
        s.push(0);
      } else {
        std::cout<<"Invalid stack element for negate: "<<num<<std::endl;
        return -1;
      }
    } else if (command.compare("NULL") == 0) {
      s.push(-1);
    } else if (command.compare("get") == 0) {
      ++counter;
      std::string varName = program[counter];
      result = intVar[varName];
      s.push(result);
    } else if (command.compare("set") == 0) {
      int a = getStack(s);
      ++counter;
      std::string varName = program[counter];
      intVar[varName] = a;
    } else if (command.compare("change") == 0) {
      int a = getStack(s);
      ++counter;
      std::string varName = program[counter];
      intVar[varName] += a;
    } else if (command.compare("JUMPNZ") == 0) {
      ++counter;
      command = program[counter];
      int condition = getStack(s);
      //jump when false
      if (condition == 1) {
        std::string::size_type size;
        counter = std::stoi(command, &size);
        if (size != command.size()) {
          std::cout<<"Invalid number\n"<<std::endl;
          return -1;
        }
      }
    } else if (command.compare("JUMPZ") == 0) {
      ++counter;
      command = program[counter];
      int condition = getStack(s);
      //jump when false
      if (condition == 0) {
        std::string::size_type size;
        counter = std::stoi(command, &size);
        if (size != command.size()) {
          std::cout<<"Invalid number\n"<<std::endl;
          return -1;
        }
      }
    } else if (command.compare("JUMP") == 0) {
      ++counter;
      command = program[counter];
      std::string::size_type size;
      counter = std::stoi(command, &size);
      if (size != command.size()) {
        std::cout<<"Invalid number\n"<<std::endl;
        return -1;
      }
    } else if (command.compare("print") == 0) {
      int a = getStack(s);
      std::cout<<a<<"\n";
    } else if (command.compare("boolean") == 0) {
      ++counter;
      command = program[counter];
      if (command.compare("TRUE") == 0) {
        s.push(0);
      } else if (command.compare("FALSE") == 0) {
        s.push(1);
      } else {
        std::cout<<"Invalid command: "<<command<<std::endl;
        return -1;
      }
    } else if (command.compare("nop") == 0) {
    }

    // else if (command.compare("acos") == 0) {
    //   if (s.empty()) {
    //     std::cout<<"empty stack, pop is not allowed"<<std::endl;
    //     return 0;
    //   }
    //   int a = s.top();
    //   s.pop();
    //   // a = a * pi/180; deg to rad
    //   result = acos(a)  * 180/pi;// rad to deg
    //   s.push(result); //acos cannot be bigger than 1
    // } else if (command.compare("log10") == 0) {
    //   if (s.empty()) {
    //     std::cout<<"empty stack, pop is not allowed"<<std::endl;
    //     return 0;
    //   }
    //   int a = s.top();
    //   s.pop();
    //   result = log10(a);
    //   s.push(result);
    // }
    // else if (command.compare("sqrt") == 0) {
    //   if (s.empty()) {
    //     std::cout<<"empty stack, pop is not allowed"<<std::endl;
    //     return 0;
    //   }
    //   int a = s.top();
    //   s.pop();
    //   result = pow(a, 1/2);
    //   s.push(result); //check order
    // } else if (command.compare("exp") == 0) {
    //   if (s.empty()) {
    //     std::cout<<"empty stack, pop is not allowed"<<std::endl;
    //     return 0;
    //   }
    //   int a = s.top();
    //   s.pop();
    //   result = exp(a);
    //   s.push(result);
    // } else if (command.compare("tan") == 0) {
    //   if (s.empty()) {
    //     std::cout<<"empty stack, pop is not allowed"<<std::endl;
    //     return 0;
    //   }
    //   int a = s.top();
    //   s.pop();
    //   a = a * pi/180; //deg to rad
    //   result = tan(a);//cannot be 90 and would be negative if over
    //   s.push(result);           //they are radian maybe should do degtorad
    // } else if (command.compare("atan2") == 0) {
    //   if (s.empty()) {
    //     std::cout<<"empty stack, pop is not allowed"<<std::endl;
    //     return 0;
    //   }
    //   int a = s.top();
    //   s.pop();
    //   if (s.empty()) {
    //     std::cout<<"empty stack, pop is not allowed"<<std::endl;
    //     return 0;
    //   }
    //   int b = s.top();
    //   s.pop();
    //   result = atan2(b, a);//cannot be 90 and would be negative if over
    //                       //check order
    //   s.push(result);           //they are radian maybe should do degtorad
    // }
    // else if (command.compare("ln") == 0) {
    //   if (s.empty()) {
    //     std::cout<<"empty stack, pop is not allowed"<<std::endl;
    //     return 0;
    //   }
    //   int a = s.top();
    //   s.pop();
    //   result = log(a);
    //   s.push(result);
    // }

    else {
      std::cout<<"Invalid command: "<<command<<std::endl;
      return -1;
    }
    ++counter;
  }

  if (s.empty()) {
    std::cout<<"empty stack, pop is not allowed"<<std::endl;
    return 0;
  }
  std::cout<<s.top()<<std::endl;
  s.pop();
  // while(!s.empty()) {
  //   std::cout<<s.top()<<std::endl;
  //   s.pop();
  // }
  file.close();
  return 0;
}
