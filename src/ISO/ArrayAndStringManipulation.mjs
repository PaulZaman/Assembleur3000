// Transform Code String into Array of Strings
export function fromStringToArray(dataANDcode) {
	// this function takes a string and returns an array of strings
	let data = dataANDcode.split("\n");
	return data;
}

//Split dataANDcode array into data and code arrays
export function splitTo2Arrays(dataANDcode) {
	let data = [];
	let code = [];
	let i = 0;
	while (dataANDcode[i] !== "#CODE") {
		data.push(dataANDcode[i]);
		i++;
	}

	i++;
	while (i < dataANDcode.length) {
		code.push(dataANDcode[i]);
		i++;
	}
	//console.log(code);
	data = data.filter((element) => !element.startsWith("!") && element !== "");
	code = code.filter((element) => !element.startsWith("!") && element !== "");
	return [data, code];
};