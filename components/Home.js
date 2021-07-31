import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet,Text, View, TouchableOpacity, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import Header from './Header';

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      location: '',
      locationID: null
    }
  }

  componentDidMount(){
    this.getLocation()
}


  getLocation = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/find" , {
      'headers': {
        'Content-type': 'application/json',
        'X-Authorization': token
      }
    })

  .then((response) => {
    if(response.status === 200){
      return response.json()
    } else if(response.status === 400){
      throw 'bad request';
    }
    else if(response.status === 401){
    throw 'unautharised';
  }  else if(response.status === 500){
    throw 'server error';
  }
  })

  .then((responseJson) => {
    this.setState({
      location: responseJson
    });
  })
  .catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
  })
}

  render(){


    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>  
      <Header />
      <TouchableOpacity onPress={() => navigation.navigate('Account')} >
        <Text style={styles.Button}>My Account</Text>
      </TouchableOpacity>

      <FlatList
      data={this.state.location}
      renderItem={({item}) => (
     <TouchableOpacity onPress={() => navigation.navigate('shopinfo', {locationID: item.location_id})}>
     <Text style={styles.shopsNames}>{item.location_name}</Text>
     </TouchableOpacity>
      )}
      
     keyExtractor={(item) => item.location_id.toString()}
      />


      </View>
    )
  };
}

const styles = StyleSheet.create({

  container: {
       flex: 1,
       backgroundColor: '#ffc0cb'
  },

  Button:{
    
    padding: 30,
    fontSize: 20,
    textDecorationLine: 'underline'

  },

  shopsNames: {
    fontSize: 24,
    padding: 5,
    marginLeft: 30
  }
  

});
   




export default Home