export default function validateFormField(type, value) {
  switch (type) {
    case 'id' : {
      return value.match(/^[0-9]+$/) ? true : false;
    }
    case 'firstName' :
    case 'lastName' : {
      return value.match(/^[a-zA-Z]+$/g) ? true : false;
    }
    case 'email' : {
      return value.match(/\S+@\S+\.\S+/) ? true : false;
    }
    case 'phone' : {
      return value.match(/\([0-9]{3}\)[0-9]{3}-[0-9]{4}/) ? true : false;
    }
    default : throw new Error('wrong field type!');
  }
}
