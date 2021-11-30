import React, { useRef } from 'react';
import {View,
  Text,TextInput,Input, 
 Form, 
} from 'react-native';
import emailjs from 'emailjs-com';
export default class EmailScreen extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            to_name: 'James',
            message: 'Check this out!',
            from_name:'Marta'
        }
        this.sendEmail = this.sendEmail.bind(this)
    }
    
  sendEmail() {
      
    emailjs.send('service_arm8pjk', 'template_3krsrdn', this.state, 'user_eOb7ryBtIDgcOWIsaMCgO')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });      
  }
  componentDidMount(){
      this.sendEmail()
  }
    render(){
        return (     
    <View></View>
    );
    }
};