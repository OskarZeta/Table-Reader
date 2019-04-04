export default function searchData(str, array) {
  const props = ['id', 'firstName', 'lastName', 'email', 'phone'];
  return array.filter(row =>
    Object.entries(row).some(entry => {
      const [key, prop] = entry;
      if (props.indexOf(key) !== -1) {
        return prop.toString().toLowerCase().indexOf(str.toLowerCase()) > -1 ? true : false
      }
      return false;
    })
  );
}
