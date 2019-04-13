#include <iostream>
#include <fstream>
#include <stack>
#include <string>
using namespace std;

int main (int argc, char *argv[]) {
  if (argc != 2) {
    std::cout<<"No specified file to open ";
    std::cout<<"or too many arguments"<<std::endl;
    return 0;
  }
  // open a file in read mode.
  ifstream file;
  file.open(argv[1]);

  if (!file.is_open()) {
    std::cout<<"Cannot open the file"<<std::endl;
    return 0;
  }

  std::string command;
  vector<int> instructions;
  stack <int> s;

  while (file>>command) {
    std::cout<<command<<std::endl;


  }

  if (s.empty()) {
    //no pop
  }
  file.close();
  return 0;
}
