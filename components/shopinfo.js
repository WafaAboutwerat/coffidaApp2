import React, { Component } from 'react';
import { StyleSheet,View,Text, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';



class shopinfo extends Component {

    constructor(props){
        super(props);
    
    this.state = {
        location_id: 0,
        location_name: '',
        location_town: '',
        avg_price_rating: '',
        avg_quality_rating: '',
        avg_clenliness_rating: '',

      }
    }

    componentDidMount(){
        this.getInfo()
    }


    getInfo = async () => {
        const location_ID = this.props.route.params.locationID;
        return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_ID, {
            'headers':{
                'Content-type': 'application/json'
            }
        })
    
    .then((response) => {
        if(response.status === 200){
            return response.json()
        } else if(response.status === 404){
            throw 'Not found'
        }
    })



    .then((responseJson) => {
        this.setState({
            location_id:  responseJson.location_id,
            location_name: responseJson.location_name,
            location_town: responseJson.location_town,
            avg_price_rating: responseJson.avg_price_rating,
            avg_quality_rating: responseJson.avg_quality_rating,
            avg_clenliness_rating: responseJson.avg_clenliness_rating,
            
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
          
        <Text style={styles.title}>Shops information:</Text>
        
        <Text style={styles.name}>{this.state.location_name}</Text>
        <Text style={styles.info}>location: {this.state.location_town}</Text>
        <Text style={styles.info}>price rating: {this.state.avg_price_rating}</Text>
        <Text style={styles.info}>quality rating: {this.state.avg_quality_rating}</Text>
        <Text style={styles.info}>cleanliness: {this.state.avg_clenliness_rating}</Text>

     <TouchableOpacity onPress={() => navigation.navigate('showreviews', {locationID: this.state.location_id})}>
     <Text style={styles.addreview}>show reviews</Text>
     </TouchableOpacity>    

     <TouchableOpacity onPress={() => navigation.navigate('addreview', {locationID: this.state.location_id})}>
     <Text style={styles.addreview}>add review</Text>
     </TouchableOpacity>

      </View>
    )
  };
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffc0cb',
       
  },

  title: {
      fontSize: 30,
      marginLeft: 60,
  },

  name: {
    fontSize: 24,
    marginLeft: 130,
    color: '#db7093'
  },

  info: {
    fontSize: 24,
    marginLeft: 110,
  },

  addreview: {
    fontSize: 24,
    marginLeft: 140,
    textDecorationLine: 'underline'
  }

});




export default shopinfo