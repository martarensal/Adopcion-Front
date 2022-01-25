export default class FormManager {
  static instance = null;

  _name = '';

  formFields = {
    name: '',
    age: '',
    sex: 'male',
    image: '',
    size: 'small',
    colour: 'white',
    status: '',
    cityId: '',
    typeId: '',
    value: '',
    username: '',
  };

  static getFormManager() {
    if (this.instance == null) this.instance = new FormManager();

    return this.instance;
  }

  getField(field) {
    return this.formFields[field];
  }
  setField(field, value) {
    this.formFields[field] = value;
  }
  clear() {
    this.formFields = {
      name: '',
      age: '',
      sex: 'male',
      image: '',
      size: 'small',
      colour: 'white',
      status: '',
      cityId: '',
      typeId: '',
      value: '',
      username: '',
    };
  }
}
