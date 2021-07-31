import React, { Component } from 'react';
import { StyleSheet,Text, View, FlatList} from 'react-native';


class showreviews extends Component {

   constructor(props){
     super(props);

     this.state = {
       locationReviews: null,
       reviewID: null
     }
   }


   componentDidMount(){
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getReviews()
    });
  }

   getReviews = async () => {
    const location_ID = this.props.route.params.locationID;
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + location_ID, {
      'headers': {
        'Content-type': 'application/json',
      }
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
      } else {
        throw 'something went wrong';
      }
    })

    .then((responseJson) => {
      this.setState({
        reviews: responseJson.location_reviews
      })
    })
    
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
   }

   
   
  render(){
    return (
      <View  style={styles.container}>
      
    <Text style={styles.title}>Reviews:</Text>

    <FlatList
      data={this.state.reviews}
      renderItem={({item}) => (
     <View>
     <Text style={styles.title}>overall: {item.overall_rating}</Text>
     <Text style={styles.title}>price: {item.price_rating}</Text>
     <Text style={styles.title}>quality: {item.quality_rating}</Text>
     <Text style={styles.title}>clenliness: {item.clenliness_rating}</Text>
     <Text style={styles.title}>quote: {item.review_body}</Text>
     </View>
      )}
      
     keyExtractor={(item) => item.review_id.toString()}
      />

        

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
  
    title:{
        fontSize: 20,
        marginLeft: 30,
        marginTop: 10,
    }
  
  });

  
export default showreviews