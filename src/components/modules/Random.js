export function randomizedNumbers(limit, quantityOfNumbers) {
	var array = [];
	while (array.length < quantityOfNumbers) {
		let randomNumber = Math.floor(Math.random() * limit) + 1;
		if (array.indexOf(randomNumber) > -1) continue;
		array[array.length] = randomNumber;
	}
	return array;
};