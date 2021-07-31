import React, { Component } from 'react';
import { StyleSheet,Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



class Account extends Component {

   constructor(props){
     super(props);

     this.state = {
       first_Name: '',
       last_Name: '',
       email: '',
       password: ''
     }
   }


   componentDidMount(){
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData()
    });
  }

   getData = async () => {
    const ID = await AsyncStorage.getItem('@user_id');
    const token = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + ID, {
      'headers': {
        'Content-type': 'application/json',
        'X-Authorization': token
      }
    })
  
    .then((response) => {
      if(response.status === 200){
        return response.json()
      } else if(response.status === 401){
        throw 'Unauthorised';
      }
    })

    .then((responseJson) => {
      this.setState({
        first_Name: responseJson.first_name,
        last_Name: responseJson.last_name,
        email: responseJson.email,
      })
    })
    
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
   }

  logOut = async () => {
    let token = await AsyncStorage.getItem('@session_token');
    await AsyncStorage.removeItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
      method: 'post',
      headers: {
        "X-Authorization": token
      }
    })
    .then((response) => {
      if(response.status === 200){
        this.props.navigation.navigate("SignUp");
      } else if(response.status === 401){
        throw 'Unauthorised'
      } else if(response.status === 500){
        throw 'server error'
      }
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
  }
   
   
  render(){

    const navigation = this.props.navigation;

    return (
      <View  style={styles.container}>
      
    <Text style={styles.title}>My Information:</Text>

    <Text style={styles.text}>First Name: {this.state.first_Name}</Text>
    <Text style={styles.text}>Last Name: {this.state.last_Name}</Text>
    <Text style={styles.text}>Email: {this.state.email}</Text>

         <TouchableOpacity style={styles.button} onPress={() => this.logOut()}>
          <Text style={styles.btntext}>logout</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.button} onPress ={() => navigation.navigate('EditAccount')}>
          <Text style={styles.btntext}>Edit Account</Text>
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

  title:{
    marginTop: 100,
    marginLeft: 50,
    fontSize: 30,
    color: '#db7093',
    fontWeight: 'bold'
  },

  text:{
    marginTop: 10,
    marginLeft: 50,
    fontSize: 25,

  },

  button:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 100,
    backgroundColor: '#db7093',
    width: 170,
    height: 50,
    borderRadius: 5
  },

  btntext:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22
  },


});
  

export default Account