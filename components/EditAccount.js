import React, { Component } from 'react';
import {  StyleSheet,Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


class EditAccount extends Component {

    constructor(props){
        super(props);
   
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }
      }


      update= async () => {
       
        let to_send = {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password,


      };

  const ID = await AsyncStorage.getItem('@user_id');
  const token = await AsyncStorage.getItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + ID ,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    body:JSON.stringify(to_send)
  })



  .then((response) => {
    if(response.status === 200){
    Alert.alert("Account updated");
    } else if(response.status === 400){
      Alert.alert("bad request");
    } else if(response.status === 401){
      Alert.alert("Unauthorised");
    } else if(response.status === 403){
      Alert.alert("Forbidden");
    } else if(response.status === 404){
      Alert.alert("not found");
    } else if(response.status === 500){
      Alert.alert("server error");
    }
  })

  
  .catch((error) => {
    console.log(error);
  })



    }

    render(){
        return (
          <View  style={styles.container}>
          <TextInput style={styles.textinput} placeholder='FirstName...' onChangeText={(firstName) => this.setState({firstName})} value={this.state.firstName}/>
          <TextInput style={styles.textinput} placeholder='lastName...' onChangeText={(lastName) => this.setState({lastName})} value={this.state.lastName}/>
          <TextInput style={styles.textinput} placeholder='Email...' onChangeText={(email) => this.setState({email})} value={this.state.email}/>
          <TextInput style={styles.textinput} placeholder='Password...' onChangeText={(password) => this.setState({password})} value={this.state.password}/>
        
              <TouchableOpacity style={styles.button} onPress={() => this.update()}>
                 <Text style={styles.btntext}>Update</Text>
              </TouchableOpacity>
         </View>
        )
      };



}

const styles = StyleSheet.create({

    container: {
         flex: 1,
         backgroundColor: '#ffc0cb',
       
    },

    textinput:{
        backgroundColor: '#db7093',
        borderWidth: 3,
        marginTop: 20,
        width: 350,
        marginLeft: 20

    },

    button:{
    width: 200,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#db7093',
    marginTop: 30,
    marginLeft: 100,
    borderRadius: 3
    
    
    },

    btntext:{
      fontWeight: 'bold'
    }
});



export default EditAccount
