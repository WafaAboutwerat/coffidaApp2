import React, { Component } from 'react';
import { StyleSheet,View,Text} from 'react-native';
import 'react-native-gesture-handler';


class Header extends Component {


  render(){
    return (
      <View style={styles.header}>

        <Text style={styles.appName}>Coffee Shops</Text>
      </View>
    )
  };
}

const styles = StyleSheet.create({

  header: {
       width: '100%',
       height: '15%',
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: '#db7093',
       
  },


 appName:{
     color: 'white',
     fontSize: 30,
     
 }

});




export default Header