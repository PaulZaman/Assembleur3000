// functions to call stack functions

//LDA function
function LDA(location, value){
    stackLDA(location, value);
};

// STR function
function STR(location, value){
    stackSTR(location, value);
}

//PUSH function
function PUSH(value){
    stackPUSH(value);
}

//POP function
function POP(){
    stackPOP();
}

//AND function
function AND(){
    stackAND();
}

//OR function
function OR(){
    stackOR();
}

//NOT function
function NOT(){
    stackNOT();
}

//ADD function
function ADD(string){
    // string = "ADD t0, A"

    stackADD();
}

//SUB function
function SUB(){
    stackSUB();
}

//DIV function
function DIV(){
    stackDIV();
}

//MUL function
function MUL(){
    stackMUL();
}

//MOD function
function MOD(){
    stackMOD();
}

//CMP function
function CMP(){
    stackCMP();
}

//MOD function
function MOD(){
    stackMOD();
}

//INC function
function INC(){
    stackINC();
}

//DEC function
function DEC(){
    stackDEC();
}

//BEQ function
function BEQ(){
    stackBEQ();
}

//BNE function
function BNE(){
    stackBNE();
}

//BGG function
function BGG(){
    stackBGG();
}

//BSM function
function BSM(){
    stackBSM();
}


//JMP function
function JMP(){
    stackJMP();
}


//HLT function
function HLT(){
    stackHLT();
}