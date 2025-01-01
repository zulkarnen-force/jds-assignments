function incrementString(str: string) {
  let parts = str.split("-");
  if (parts.length === 2) {
    let prefix = parts[0]; // Get the part before the '-'
    let number = parseInt(parts[1]); // Get the part after the '-', convert to integer
    if (!isNaN(number)) {
      number++; // Increment the number
      let incrementedStr = prefix + "-" + number; // Recombine the parts with the incremented number
      return incrementedStr;
    } else {
      return new Error("Invalid format: Number part is not a valid integer.");
    }
  } else {
    return new Error("Invalid format: Expected 'prefix-number'.");
  }
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function calculatePercentageDifference(current: number, previous: number) {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }
  return Math.round(((current - previous) / previous) * 100);
}
export { incrementString, toTitleCase, calculatePercentageDifference };
