// contains the functions for the ISO
// these function manipulate the stack and calls the functions in the isoFunction.js file to do the actual work
import memory from './memory.mjs';

export function LDA() {
	// check if first argument is a register
	const isARegister = instruction.substring(4, 6) == "T0" || instruction.substring(4, 6) == 'T1' || instruction.substring(4, 6) == 'T2' || instruction.substring(4, 6) == 'T3'
	if (!isARegister) {
		throw "Error line " + memory.pc + ", first argument ('" + instruction.substring(4, 6) + "') is not a register";
	}

	// ADD to stack

	// perform operations on stack

}