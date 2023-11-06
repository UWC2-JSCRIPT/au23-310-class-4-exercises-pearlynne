/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function (kind, internalTemp, doneness) {

	// If it's beef, the doneness depends on the temperature
	if (kind == 'beef') {
		// For temps less than 125, doneness should be rare.
		if (internalTemp < 125 && doneness == 'rare') {
			return true;
			// For temps between 125 and 155, doneness should be medium.
		} else if (internalTemp >= 125 && internalTemp < 155 && doneness === 'medium') {
			return true;
			// For temps above 155, doneness should be well.
		} else if (internalTemp > 155 && doneness === 'well') {
			return true;
		}
		// If it's chicken, then temperature has to be above 165
	} else if (kind === 'chicken' && internalTemp > 165) {
		return true;
	}
	return false;
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true - false?