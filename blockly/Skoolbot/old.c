
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <time.h>


//make a map for variable
//assign - pop, map the symbol
//print - pop, print on the screen
//access - get from map and push to stack to do operations

//if - condition push to stack, cond jumpz, no cond jump, global l0 and l1

//use vector of instructions

//testing environment

int stackSize = 255;
int top = -1;
int stack[255];

int overflow() {
  if (top == stackSize) {
    return 0;
  }
  return 1;
}

void push (int num) {
  if (overflow() == 0) {
    fprintf(stderr, "OverFlow\n");
    exit(EXIT_FAILURE);
  }
  top += 1;
  stack[top] = num;
}

int pop () {
  if (top == -1) {
    fprintf(stderr, "UnderFlow\n");
    exit(EXIT_FAILURE);
  }
  int data = stack[top];
  top -= 1;
  return data;
}

void showStack() {
  int num = top;
  while (num > -1) {
    printf("%d\n", stack[num--]);
  }
  printf("\n");
}

int main(int argc, char **argv){
  FILE* fp;
  if (argc <= 1) {
    printf("need to specify a file");
    return -1;
  }

  fp = fopen(argv[1], "r");
  if (!fp) {
    printf("opened file failed %s", argv[1]);
    return -1;
  } else {
    char command[1024];
    fscanf(fp, "%s", command);
    int result = 0;
    while (!feof(fp)) {
      if (strcmp(command, "number") == 0) {
        fscanf(fp, "%s", command);
        int num = 0;
        if (strcmp(command, "PI") == 0) {
          num = 3;
        } else {
          char *endptr;
          num = strtol(command, &endptr, 10); //check errno, no decimal
          if (*endptr != '\0') {
            printf("Invalid number\n");
            return -1;
          }
        }
        push(num);
      } else if (strcmp(command, "add") == 0) {
        result = pop() + pop();
        push(result);
      } else if (strcmp(command, "sub") == 0) {
        int b = pop();
        result = pop() - b;
        push(result);
      } else if (strcmp(command, "mul") == 0) {
        result = pop() * pop();
        push(result);
      } else if (strcmp(command, "div") == 0) {
        int b = pop();
        result = pop() / b; //check denominator is 0 error
        push(result);
      } else if (strcmp(command, "remainder") == 0) {
        int number = pop();
        int divisor = pop();
        result = number % divisor;
        push(result);
      } else if (strcmp(command, "acos") == 0) {
        result = acos(pop());
        push(result); //acos cannot be bigger than 1
      } else if (strcmp(command, "log10") == 0) {
        result = log10(pop());
        push(result);
      } else if (strcmp(command, "pow") == 0) {
        int power = pop();
        result = pow(pop(), power);
        push(result); //check order
      } else if (strcmp(command, "sqrt") == 0) {
        result = pow(pop(), 1/2);
        push(result); //check order
      } else if (strcmp(command, "exp") == 0) {
        result = exp(pop());
        push(result);
      } else if (strcmp(command, "randomInt") == 0) {
        // time_t t;
        // /* Intializes random number generator */
        // srand((unsigned) time(&t)); //should not have random
        // result = rand() % 100;
        // push(result);
        break;
      } else if (strcmp(command, "tan") == 0) {
        result = tan(pop());//cannot be 90 and would be negative if over
        push(result);           //they are radian maybe should do degtorad
      } else if (strcmp(command, "cmpg") == 0) {
        break;
      } else if (strcmp(command, "ln") == 0) {
        result = log(pop());
        push(result);
      }

      else {
        printf("Invalid command: %s\n", command);
        return -1;
      }
      fscanf(fp, "%s", command);
    }
  }

  fclose(fp);
  printf("%d", pop());

  return 0;
}
