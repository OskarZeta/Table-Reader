export default function sortData(type, dir, array) {
  let arrayCopy = array.slice(0);
  function compare(a, b) {
    a = a[type];
    b = b[type];
    if (typeof a === 'string') {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
    if (dir === 'asc') {
      return a > b ? 1 : a < b ? -1 : 0;
    } else if (dir === 'desc') {
      return a > b ? -1 : a < b ? 1 : 0;
    }
    return 0;
  }
  arrayCopy.sort((a, b) => compare(a, b));
  return arrayCopy;
}
