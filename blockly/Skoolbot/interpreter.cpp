#include <iostream>
#include <fstream>
#include <stack>
#include <string>
#include <vector>
#include <map>
#include <cmath>


//if - condition push to stack, cond jumpz, no cond jump, global l0 and l1

//testing environment

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

  std::string command;
  std::vector<std::string> program;
  while (file>>command) {

    program.push_back(command);
  }

  unsigned int counter = 0;
  std::map<std::string, int> intVar;
  std::map<std::string, std::string> strVar;
  std::stack <int> s;
  int result = 0;
  double pi = atan(1)*4;
  while(counter != program.size()) {
    command = program[counter];

    if (command.compare("number") == 0) {
      ++counter;
      command = program[counter];

      std::string::size_type size;
      int num = std::stoi (command, &size); //check errno, no decimal
      if (size != command.size()) {
        std::cout<<"Invalid number\n"<<std::endl;
        return -1;
      }
      s.push(num);
    } else if (command.compare("constant") == 0) {
      ++counter;
      command = program[counter];
      if (command.compare("PI") == 0) {
        s.push(3);
      }
    } else if (command.compare("add") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int b = s.top();
      s.pop();
      result = a + b;
      s.push(result);
    }
    else if (command.compare("sub") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int b = s.top();
      s.pop();
      result = b - a;
      s.push(result);
    } else if (command.compare("mul") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int b = s.top();
      s.pop();
      result = a * b;
      s.push(result);
    } else if (command.compare("div") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int b = s.top();
      s.pop();

      result = b / a; //check denominator is 0 error
      s.push(result);
    } else if (command.compare("remainder") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int b = s.top();
      s.pop();
      result = b % a;
      s.push(result);
    } else if (command.compare("acos") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      a = a * pi/180;
      result = acos(a);
      s.push(result); //acos cannot be bigger than 1
    } else if (command.compare("log10") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      result = log10(a);
      s.push(result);
    } else if (command.compare("pow") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int b = s.top();
      s.pop();
      result = pow(b, a);
      s.push(result); //check order
    } else if (command.compare("sqrt") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      result = pow(a, 1/2);
      s.push(result); //check order
    } else if (command.compare("exp") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      result = exp(a);
      s.push(result);
    } else if (command.compare("randomInt") == 0) {
      // time_t t;
      // /* Intializes random number generator */
      // srand((unsigned) time(&t)); //should not have random
      // result = rand() % 100;
      // s.push(result);
      break;
    } else if (command.compare("tan") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      a = a * pi/180;
      result = tan(a);//cannot be 90 and would be negative if over
      s.push(result);           //they are radian maybe should do degtorad
    } else if (command.compare("atan2") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int b = s.top();
      s.pop();
      result = atan2(b, a);//cannot be 90 and would be negative if over
                          //check order
      s.push(result);           //they are radian maybe should do degtorad
    } else if (command.compare("cmpg") == 0) {
      break;
    } else if (command.compare("ln") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      result = log(a);
      s.push(result);
    } else if (command.compare("print") == 0) {
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      std::cout<<a<<"\n";
    } else if (command.compare("set") == 0) { //does set push to stack
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();
      ++counter;
      std::string varName = program[counter];
      intVar[varName] = a;
    } else if (command.compare("get") == 0) {
      ++counter;
      std::string varName = program[counter];
      result = intVar[varName];
      s.push(result);
    } else if (command.compare("cmpl") == 0) { //less or less equal???
      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int a = s.top();
      s.pop();

      if (s.empty()) {
        std::cout<<"empty stack, pop is not allowed"<<std::endl;
        return 0;
      }
      int b = s.top();
      s.pop();
      if (b < a) {
        s.push(0);
      } else {
        s.push(1);
      }
    } else if (command.compare("JUMPZ") == 0) {

    } else if (command.compare("JUMP") == 0) {

    }

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
  file.close();
  return 0;
}
