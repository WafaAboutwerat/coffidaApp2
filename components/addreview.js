import React, { Component } from 'react';
import { ScrollView, StyleSheet,Text, Alert, TouchableOpacity, View, TextInput, ToastAndroid } from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class addreview extends Component {

    constructor(props){
        super(props);
    
    this.state = {

        overallRating: 0,
        priceRating: 0,
        qualityRating: 0,
        clenlinessRating: 0,
        reviewBody: "",

      }
    }


    ratingCompleted(rating, name){
        let stateObject = () => {
            let returnObj = {};
            returnObj[name] = rating;
            return returnObj;

        };

        this.setState(stateObject);
    }


    writeReview = async () => {
        let to_send = {
            overall_rating: this.state.overallRating,
            price_rating: this.state.priceRating,
            quality_rating: this.state.qualityRating,
            clenliness_rating: this.state.clenlinessRating,
            review_body: this.state.reviewBody
          };
        const token = await AsyncStorage.getItem('@session_token')
        const locationID = this.props.route.params.locationID;
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+ locationID + '/review', {
            method: 'post',
            'headers':{
                'Content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(to_send),
        })
    
    .then((response) => {
        if(response.status === 201){
            Alert.alert("Your review has been added");
        } else if (response.status === 400){
            Alert.alert("bad request");
        } else if (response.status === 500){
            Alert.alert("server error");
        } else if (response.status === 404){
            Alert.alert("not found");
        } else if (response.status === 401){
            Alert.alert("unauthorised");
        }
    })
    .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
     }


  render(){
    return (
      <View style={styles.container}>  
       <ScrollView>
       <Text> overall rating: </Text>
       <AirbnbRating size={20} reviewSize={20} maxStars={5} defaultRating={0} onFinishRating={(rating) => this.ratingCompleted(rating, "overallRating")}/>

       <Text> price: </Text>
       <AirbnbRating size={20} reviewSize={20} maxStars={5} defaultRating={0} onFinishRating={(rating) => this.ratingCompleted(rating, "priceRating")}/>

       <Text> quality:</Text>
       <AirbnbRating size={20} reviewSize={20} maxStars={5} defaultRating={0} onFinishRating={(rating) => this.ratingCompleted(rating, "qualityRating")}/>

       <Text> clenliness: </Text>
       <AirbnbRating size={20} reviewSize={20} maxStars={5} defaultRating={0} onFinishRating={(rating) => this.ratingCompleted(rating, "clenlinessRating")}/>

       <Text> quote: </Text>
       <TextInput placeholder="quote here .."  style={styles.commentBox} onChangeText={(reviewBody) => this.setState({reviewBody: reviewBody})}/>


      
      <TouchableOpacity onPress={() => this.writeReview()}>
          <Text >Submit</Text>
      </TouchableOpacity>

       </ScrollView>
      </View>
    )
  };
}

const styles = StyleSheet.create({

  container: {
       flex: 1,
       backgroundColor: '#ffc0cb',
  },

});
   




export default addreview