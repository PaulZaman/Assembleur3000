import memory from "./memory.mjs";

export function memoryGetAllVariables() {
	// Find all variables and return them
	let variables = {};
	for (const vars of Object.entries(memory.variables)) {
		variables[vars[0]] = getVariable(vars[0]);
	}
	return variables;
}

function isAdressUsed(address) {
	// Check if address is used
	for (const vars of Object.entries(memory.variables)) {
		if (vars[1] === address) {
			return true;
		}
	}
	return false;
}

export function createVariable(name, value) {
	// Create a variable

	// Check if variable already exists
	for (let i = 0; i < memory.variables.length; i++) {
		if (memory.variables[i].name === name) {
			throw new Error("Can't declare variable " + name + " because it already exists");
		}
	}

	// If it doesn't, create it
	// Find a free random address in memeory
	let address = String(Math.floor(Math.random() * 15)) + 'x' + String(Math.floor(Math.random() * 7));
	while (isAdressUsed(address)) {
		address = String(Math.floor(Math.random() * 15)) + 'x' + String(Math.floor(Math.random() * 7));
	}

	// Create variable
	memory.variables[name] = address;
	address = address.split('x');
	memory.mem[address[0]][address[1]] = parseInt(value);
}

function getAddressFromName(name) {
	// Get address from name
	if (name in memory.variables) {
		return memory.variables[name];
	}
	return -1;
}

export function setVariable(name, value) {
	// Set variable
	let address = getAddressFromName(name);
	if (address === -1) {
		throw new Error("Can't set variable " + name + " because it doesn't exist");
	}
	address = address.split('x');
	memory.mem[address[0]][address[1]] = value;
}

export function getVariable(name) {
	// Get a variable
	let address = getAddressFromName(name);
	if (address === -1) {
		throw new Error("Can't find variable " + name);
	}
	address = address.split('x');
	return memory.mem[address[0]][address[1]];
}

export function emptyMemory() {
	// this function empties the memory
	memory.variables = {};
	for (let i = 0; i < 4; i++) {
		memory.registers["T" + i] = 0;
	}
	memory.byteStack = [];
	memory.pc = 0;
	memory.code = [];
	for (let i = 0; i < 16; i++) {
		for (let j = 0; j < 8; j++) {
			memory.mem[i][j] = "00000000";
		}
	}
}

export function incrementAdress(address) {
	// Increment adress
	address = address.split('x');
	address[1]++;
	if (address[1] === 8) {
		address[1] = 0;
		address[0]++;
	}
	if (address[0] === 16) {
		address[0] = 0;
	}
	return address[0] + 'x' + address[1];
}

export function getVariableNameFromAddress(address) {
	// Get variable at address
	for (const vars of Object.entries(memory.variables)) {
		if (vars[1] === address) {
			return vars[0];
		}
	}
	return -1;
}

export function getValueAtAdress(address) {
	// Get value at address
	address = address.split('x');
	return memory.mem[address[0]][address[1]];
}

export function getAdressofVariable(name) {
	// Get adress of variable
	return memory.variables[name];
}

export function createArray(name, size, values) {
	// Create an array in memory
	// Find a free random address in memeory
	let neededSpace = size;
	let address;
	let iteration_cpt = 0;
	while (neededSpace > 0 && iteration_cpt < 1000) {
		// get a random random address in memeory
		address = String(Math.floor(Math.random() * 15)) + 'x' + String(Math.floor(Math.random() * 7));
		// Check if enough available memory behide the address
		let tempAddress = address;
		while (neededSpace > 0) {
			if (isAdressUsed(tempAddress)) {
				break;
			}
			tempAddress = incrementAdress(tempAddress);
			neededSpace--;
		}
		iteration_cpt++;
	}
	if (iteration_cpt >= 1000) {
		throw new Error("Can't create array because there is not enough memory");
	}

	// Initialize array
	let tempAddress = address;
	for (let i = 0; i < size; i++) {
		let tempAddressSplit = tempAddress.split('x');
		memory.mem[tempAddressSplit[0]][tempAddressSplit[1]] = parseInt(values[i]);
		tempAddress = incrementAdress(tempAddress);
	}
	memory.variables[name] = address;
}