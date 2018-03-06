const allBibleVerses = [
'John.3.16','John.1.1', 'John.14.6', 'Matthew.28.19','Romans.3.23','Ephesians.2.8','Genesis.1.1','Acts.1.8','2Timothy.3.16','Romans.10.9','Romans.6.23','Acts.2.38','John.1.12','Romans.8.28','John.1.9','Genesis.1.26','Genesis.001.002','Genesis.001.003','Genesis.001.004','Genesis.001.005','Genesis.001.006','Genesis.001.007','Genesis.001.008','Genesis.001.009','Genesis.001.010','Genesis.001.011','Genesis.001.012','Genesis.001.013','Genesis.001.014','Genesis.001.015','Genesis.001.016','Genesis.001.017','Genesis.001.018','Genesis.001.019','Genesis.001.020', 'Romans.12.1', 'Romans.5.8.', 'Matthew.28.18','John.3.3','Mark.16.15','John.10.10','John.1.14','Acts.4.12', 'Acts.2.42','John.3.1','Galatians.5.22','Proverbs.3.5','Jeremiah.29.11','John.2.1','Titus.3.5','Romans.12.2','John.14.1','John.4.1','Ephesians.4.11','Romans.5.12','Matthew.11.28','Romans.5.1','Genesis.1.27','Romans.1.16','1John.1.9','Acts.2.1','2Corinthians.5.17','Hebrews.11.1','2Timothy.2.15','Romans.8.1','Romans.10.13','John.8.32','Isaiah.9.6','John.14.15','Deuteronomy.6.4','John.13.34','Philippians.4.13','John.4.24','Ephesians.2.1','John.14.16','Hebrews.4.12','James.5.16','Isaiah.7.14','John.1.7','John.3.5','Philippians.2.5','John.1.29','Philippians.4.6','Hebrews.12.1','Acts.17.11','Matthew.16.18']

export function getVerseNames() {
	let randomNumbers = randomizedNumbers(); // array of random numbers
	let randomVerseArray = [];
	for (let i = 0; i < randomNumbers.length; i++) {
		console.log(allBibleVerses[randomNumbers[i]])
		randomVerseArray.push(allBibleVerses[randomNumbers[i]]);
	};
	return randomVerseArray;
};

function randomizedNumbers() {
	const total = allBibleVerses.length;
	let array = [];
	while (array.length < 10) {
		var randomNumber = Math.floor(Math.random() * total) + 1;
		if (array.indexOf(randomNumber) > -1) continue;
		array[array.length] = randomNumber;
	};
	return array.map(number => number - 1);
};


// export function parseCSV() {
// 	// Papa.parse(all_bible_verses)

// };


