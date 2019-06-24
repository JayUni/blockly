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
#define CHANGE_       (0x23)
#define AND           (0x24)
#define OR            (0x25)
#define PINMODE       (0x26)
#define DREAD         (0x27)
#define DWRITE        (0x28)
#define AREAD         (0x29)
#define AWRITE        (0x2A)
#define DELAY         (0x2B)

// TODO: change the memory size to meet the suitable needs
#define STACK_SIZE    (255)
#define MEMORY_SIZE   (128)
#define CODE_SIZE     (512)

#define GETARG uint16_t(uint16_t(code[ip+1]) | uint16_t(code[ip+2])<<8)
#define stack_underflow if(stack_ptr < 0) {Serial.println("stack underflow");return;}
#define stack_overflow if(stack_ptr >= STACK_SIZE) {Serial.println("stack overflow");return;}

uint8_t code[CODE_SIZE];
size_t ip = 0;

int16_t stack[STACK_SIZE];
size_t stack_ptr = 0;

int16_t memory[MEMORY_SIZE];

void reset_state() 
{
   ip = 0;
   stack_ptr = 0;
   for(int i=0;i<MEMORY_SIZE;i++) {
    memory[i] = 0;
   }
}

void push(int16_t data) {
  stack[stack_ptr++] = data;
}

int16_t pop() {
  return stack[--stack_ptr];
}

boolean readyToRun = false;

void run(void) {
  int16_t op1;
  int16_t op2;
  for(ip=0;ip<CODE_SIZE;ip++) {
    stack_underflow;
    stack_overflow;
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
        // check whether the denominator is 0 or not
        if (op1 == 0) {
          Serial.println("Invalid zero denominator");
          return;
        }
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
        {
        // TODO: to be tested
        op1 = pop();
        op2 = pop();
        int16_t num = random(op2, op1);
        push(num);
       }
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
          Serial.println("Invalid stack element for negate");
          return;
        }
        break;
      case GET:
      // get the variable adress to stack
        {
          size_t addr = GETARG;
          ip += 2;
          push(memory[addr]);
        }
        break;
      case SET:
      // set the variable to a new value
        {
          size_t addr = GETARG;
          int16_t value = pop();
          if (addr >= MEMORY_SIZE) {
            Serial.println("Memery Overflow");
            return;
          }
          memory[addr] = value;
          ip += 2;
        }
        break;
      case JUMPZ:
      // jump when == 0 (true)
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
      // jump when != 0 (not true)
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
          Serial.println(data, DEC);
        }
        break;
      case BOOLEAN:

       ++ip;
        if ((int16_t)code[ip] == TRUE) {
          push(0);
        } else if ((int16_t)code[ip] == FALSE) {
          push(1);
        } else {
          Serial.println("Invalid boolean command");
          return;
        }
        break;
      case STOP:
        // stop the program and ready for next piece of code
        readyToRun = false;
        return;
      case CHANGE_:
      // change command is add the value to the existing variable
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
        
        if (value == 0) {
          pinMode(memory[addr], INPUT); 
        } else if (value == 1) {
          pinMode(memory[addr], OUTPUT); 
        } else {
          Serial.print("Invalid pinMode");
          return;
        }
      }
      break;
     case DREAD:
      {
        size_t addr = GETARG;
        ip += 2;
        
        int val = digitalRead(memory[addr]);

        if (val == HIGH) {
          push(0);
        } else if (val == LOW) {
          push(1);
        } else {
          Serial.println("Invalid digitalRead");
          return;
        }
      }
      break;
     case DWRITE:
      {
        size_t addr = GETARG;
        ip += 2;
        
        int16_t value = pop();

        if (value == 0) {
          digitalWrite(memory[addr], HIGH); 
        } else if (value == 1) {
          digitalWrite(memory[addr], LOW); 
        } else {
          Serial.println("Invalid digitalWrite");
          return;
        }
      }
      break;  
     case AREAD:
      {
        size_t addr = GETARG;
        ip += 2;
        
        int val = analogRead(memory[addr]);

        if (val > -1 && val < 1024) {
          push(val);
        } else {
          Serial.println("Invalid analogRead");
          return;
        }
      }
      break;
     case AWRITE:
      {
        size_t addr = GETARG;
        ip += 2;
        int16_t value = pop();
        // should be check whether value if from the analog read ( read range is 0-1023)
        // mapping for analog write only accept range between 0-255
        value = map(value, 0, 1023, 0, 255);
        
        analogWrite(memory[addr], value); 
      }
      break;  
      
     case DELAY:
      {
        int16_t val = pop();
        delay(val);
      }
      break; 
               
      default:
        Serial.print("Invalid command: ");
        Serial.println(code[ip]);
        return;
    }
  }
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  
  char incomingByte;   // for incoming serial data
  boolean readyToCode = false;
  boolean readyToRead = false;
  boolean readyToLength = false;
  String block_pass = "";
  uint8_t block_code = 0;
  int code_length = 0;

  while (true) {
    
    if (Serial.available() > 0) {
      // read the incoming byte:
      incomingByte = Serial.read();

      // skip reading all the empty space
      if (isSpace(incomingByte)) {
        continue;
      }

      // check read to read the hexadecimal bytecode
      if (readyToRead) {
        block_pass += incomingByte;
        
        // check whether is a hex or not
        if (block_pass.length() == 4) {
          if (!block_pass.charAt(0) == '0' ||
              !block_pass.charAt(0) == 'x' ||
              !isHexadecimalDigit(block_pass.charAt(2)) ||
              !isHexadecimalDigit(block_pass.charAt(3))) {
           Serial.println("not a hex digit");
           break;
          }

          // hex to decimal
          char command = block_pass.charAt(2);
          if (command > 'Z') {
            block_code += (command) - ('a') + 10;
          } else if (command > '9') {
            block_code += (command) - ('A') + 10;
          } else {
            block_code += (command) - ('0');
          }
          block_code *= 16;
          
          command = block_pass.charAt(3);
          if (command > 'Z') {
            block_code += (command) - ('a') + 10;
          } else if (command > '9') {
            block_code += (command) - ('A') + 10;
          } else {
            block_code += (command) - ('0');
          }
         
          code[ip] = block_code;

          // only stop reading when STOP command is received
          if (block_code == STOP) {
            readyToCode = true;
            break;
          }
          
          block_code = 0;
          block_pass = "";
          ip++;
        }
      }

      // start reading the code after recieving the length of the code
      if(readyToLength && !readyToRead) {
        if (!isDigit(incomingByte)) {
           Serial.println("not a digit");
           break;
        }
        block_pass += incomingByte;
        if (block_pass.length() == 3) {
          code_length = block_pass.toInt();

          //compare the size whether fit into arrange program memory size
          if (code_length > CODE_SIZE) {
            Serial.println("Code size too big");
            break;
          }
          readyToRead = true;
          block_pass = "";
        }
      }

      // only received the secret code BLOCKLY
      // then start reading the length of the incoming code
      if (!readyToLength) {
        block_pass += incomingByte;
        if (block_pass.equals("BLOCKLY")) {
          readyToLength = true;
          block_pass = "";
        }
      }
    }   
  }

  // run the program when reading is finished
  if (readyToCode) {
    Serial.println("program start");
    run();
    Serial.println("end");
  }

  // reset memories and pointer
  reset_state();
  //reset all the parameters
  readyToCode = false;
  readyToRead = false;
  readyToLength = false;
  block_pass = "";
  block_code = 0;
  code_length = 0;
}
