// import memory
import { memory } from "./memory.js";

//LDA stack function
function stackLDA(location, value) {
    var location = location;
    var value = value;
    stackLDA.push(location);
    stackLDA.push(value);
    return stackLDA;
}

//STR stack function
function stackSTR(location, value) {
    var location = location;
    var value = value;
    stackSTR.push(location);
    stackSTR.push(value);
    return stackSTR;
}

//PUSH stack function
function stackPUSH(value) {
    var value = value;
    stackPUSH.push(value);
    return stackPUSH;
}

//POP stack function
function stackPOP() {
    stackPOP.pop();
    return stackPOP;
}

//AND stack function
function stackAND() {
    stackAND.pop();
    stackAND.pop();
    return stackAND;
}

//OR stack function
function stackOR() {
    stackOR.pop();
    stackOR.pop();
    return stackOR;
}

//NOT stack function
function stackNOT() {
    stackNOT.pop();
    return stackNOT;
}

//ADD stack function
function stackADD() {
    stackADD.pop();
    stackADD.pop();
    return stackADD;
}

//SUB stack function
function stackSUB() {
    stackSUB.pop();
    stackSUB.pop();
    return stackSUB;
}

//DIV stack function
function stackDIV() {
    stackDIV.pop();
    stackDIV.pop();
    return stackDIV;
}

//MUL stack function
function stackMUL() {
    stackMUL.pop();
    stackMUL.pop();
    return stackMUL;
}

//MOD stack function
function stackMOD() {
    stackMOD.pop();
    stackMOD.pop();
    return stackMOD;
}

//INC stack function
function stackINC() {
    stackINC.pop();
    return stackINC;
}

//DEC stack function
function stackDEC() {
    stackDEC.pop();
    return stackDEC;
}

//BEQ stack function
function stackBEQ() {
    stackBEQ.pop();
    stackBEQ.pop();
    return stackBEQ;
}

//BNE stack function
function stackBNE() {
    stackBNE.pop();
    stackBNE.pop();
    return stackBNE;
}

//BBG stack function
function stackBBG() {
    stackBBG.pop();
    stackBBG.pop();
    return stackBBG;
}

//BSM stack function
function stackBSM() {
    stackBSM.pop();
    stackBSM.pop();
    return stackBSM;
}

//JMP stack function
function stackJMP() {
    stackJMP.pop();
    return stackJMP;
}

//HLT stack function
function stackHLT() {
    stackHLT.pop();
    return stackHLT;
}