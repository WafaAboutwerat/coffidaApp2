import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';


class login extends Component {
 
    constructor(props){
        super(props);
    
        this.state = {
         email: "",
         password: ""
        }
      }
    login = async () => {
    
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
    
    method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
     })
    
    .then((response) => {
      if(response.status === 200){
        return response.json()
      } else if(response.status === 400) {
        throw 'invalid email or password';
    } else{
      throw 'somthing went wrong';
    }
    
    })
    .then(async (responseJson) => {
      console.log(responseJson);
      await AsyncStorage.setItem('@session_token', responseJson.token);
      await AsyncStorage.setItem('@user_id',JSON.stringify(responseJson.id));
      this.props.navigation.navigate("Home");
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
      
    })
    }

    render(){
    return (

      <View style={styles.login}>
      <Text style={styles.header}>Login</Text>

     
     <TextInput style={styles.textinput}placeholder="Email..." onChangeText={(email) => this.setState({email})} value={this.state.email} />
     <TextInput style={styles.textinput}placeholder="Password..."secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password}/>

      <TouchableOpacity style={styles.button} onPress={() => this.login()}>
          <Text style={styles.btntext}>login</Text>
      </TouchableOpacity>


      </View>
    )
  };
}

const styles = StyleSheet.create({

  login:{
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
   

export default login