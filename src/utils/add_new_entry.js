export default function addNewEntry(entry, array) {
  let arrayCopy = array.slice(0);
  arrayCopy.unshift(entry);
  return arrayCopy;
}
