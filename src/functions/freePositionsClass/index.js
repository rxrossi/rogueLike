const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function FreeSpacesHandler(map) {
	this.freeSpaces = (function(map) {
		let freeSpaces = [];
		for (let row = 0; row < map.length ; row++) {
			for (let col = 0; col < map[row].length; col++) {
				if (map[row][col] === "floor") freeSpaces.push([row, col])
			}
		}
		return freeSpaces;
	}(map));
}

FreeSpacesHandler.prototype.get = function get() {

	const index = getRandomInt(0, this.freeSpaces.length);
	const toReturn = {
		row: this.freeSpaces[index][0],
		col: this.freeSpaces[index][1]
	}

	this.freeSpaces = [
		...this.freeSpaces.slice(0, index),
		...this.freeSpaces.slice(index+1)
	]

	return toReturn;
}

export default FreeSpacesHandler;
