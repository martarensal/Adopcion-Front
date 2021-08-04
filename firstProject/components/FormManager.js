export default class FormManager
{
    static instance = null;

    _name = '';

    formFields = {
      name: '',
      age: '',
      sex: '',
      image: '',
      size: '',
      colour: '',
      status: '',
      city: '',
      types: [],
      test: 0,
      value: ''
    };

    static getFormManager()
    {
        if (this.instance == null)
            this.instance = new FormManager();

        return this.instance;
    }

    validateField(field)
    {
        let value = this.formFields[field] 
        switch (field) {
            case 'name':
                return value != ''
                break;
            case 'age':
                intNumber = parseInt(value)
                return !isNaN(intNumber) && intNumber >= 0 && intNumber <= 344;
        
            default:
                break;
        }
    }

    getField(field) {return this.formFields[field]};
    setField(field, value) {this.formFields[field] = value};


}