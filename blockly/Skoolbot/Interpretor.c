#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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
  printf("Stack: \n");
  while (num > -1) {
    printf("%d\n", stack[num--]);
  }
  printf("End of Stack\n\n");
}

int main(){

  FILE* fp;

  fp = fopen("bytecode.txt", "r");
  if (!fp) {
    return -1;
  } else {
    char command[1024];
    fscanf(fp, "%s", command);

    while (!feof(fp)) {
      printf("Command: %s ", command);
      if (strcmp(command, "number") == 0) {
        fscanf(fp, "%s", command);
        printf("%s\n", command);
        char *endptr;
        int num = strtol(command, &endptr, 10); //check errno
        if (*endptr != '\0') {
          printf("Invalid number\n");
          return -1;
        }
        push(num);
      } else if (strcmp(command, "add") == 0) {
        printf("\n");
        int result = pop() + pop();
        printf("Result: %d\n", result);
        push(result);
      } else if (strcmp(command, "minus") == 0) {
        printf("\n");
        int b = pop();
        printf("Result: %d\n", pop() - b);
      } else if (strcmp(command, "mul") == 0) {
        printf("\n");
        printf("Result: %d\n", pop() * pop());
      } else if (strcmp(command, "divide") == 0) {
        printf("\n");
        int b = pop();
        printf("Result: %d\n", pop() / b); //check denominator is 0 error
      } else if (strcmp(command, "pow") == 0) {
        continue;
      } else if (strcmp(command, "divide") == 0) {
        continue;
      } else if (strcmp(command, "divide") == 0) {
        continue;
      } else if (strcmp(command, "divide") == 0) {
        continue;
      } else if (strcmp(command, "divide") == 0) {
        continue;
      } else if (strcmp(command, "divide") == 0) {
        continue;
      } else if (strcmp(command, "divide") == 0) {
        continue;
      } else if (strcmp(command, "divide") == 0) {
        continue;
      } else if (strcmp(command, "divide") == 0) {
        continue;
      } else if (strcmp(command, "divide") == 0) {
        continue;
      }


      else {
        printf("Invalid command\n");
        return -1;
      }
      showStack();
      fscanf(fp, "%s", command);
    }
  }

  fclose(fp);

  return 0;
}
