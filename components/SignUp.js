import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert} from 'react-native';
import 'react-native-gesture-handler';


class SignUp extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      firstName:'',
      lastName: '',
      Email: '',
      Password: '',
   }
  
  }
  
  signUp()
  {
    let to_send = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.Email,
      password: this.state.Password,
  
    };
  

  return fetch("http://10.0.2.2:3333/api/1.0.0/user",{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(to_send)
  })
  


  .then((response) => {
    if(response.status === 201){
    Alert.alert("Account created");
    } else if(response.status === 400){
      Alert.alert("bad request");
    } 
  })

  
  .catch((error) => {
    console.log(error);
  })

  }

  render(){
   
    const navigation = this.props.navigation;

    return (
      <View style={styles.signup}>
      <Text style={styles.header}>SignUp</Text>

     <TextInput style={styles.textinput} placeholder='FirstName...' onChangeText={(firstName) => this.setState({firstName})} value={this.state.firstName}/>
     <TextInput style={styles.textinput} placeholder='LastName...' onChangeText={(lastName) => this.setState({lastName})} value={this.state.lastName}/>
     <TextInput style={styles.textinput} placeholder='Email...' onChangeText={(Email) => this.setState({Email})} value={this.state.Email}/>
     <TextInput style={styles.textinput} placeholder='Password...' secureTextEntry={true} onChangeText={(Password) => this.setState({Password})} value={this.state.Password}/>

      <TouchableOpacity style={styles.button} onPress={() => this.signUp()}>
          <Text style={styles.btntext}>SignUp</Text>
      </TouchableOpacity>

      
          <TouchableOpacity style={styles.button} onPress ={() => navigation.navigate('login')}>
          <Text style={styles.btntext}>login</Text>
          </TouchableOpacity>
          

      </View>
    )
  };
}

const styles = StyleSheet.create({

  signup:{
     alignSelf: 'stretch',
     flex: 1,
     justifyContent: 'center',
     backgroundColor: '#ffc0cb',
     paddingLeft: 60,
     paddingRight: 60,
  },
  
  header:{
    fontSize: 24,
    color: '#db7093',
    marginTop: 40,
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#db7093',
    borderBottomWidth: 3,
  },

  textinput: {
     alignSelf: 'stretch',
     height: 40,
     marginBottom: 10,
     color: '#696969',
     borderBottomColor: '#808080',
     borderBottomWidth: 3,
  },
  
   button:{
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#db7093',
    marginTop: 30,

   },

   btntext: {
   color: '#fff',
   fontWeight: 'bold',
   fontSize: 20
   }
});
   

export default SignUp