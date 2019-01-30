import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather.js';

const API_KEY ="08ffbb66cdef30616cc84db349c655aa";

export default class App extends Component {
  state={
    isLoaded:false,
    error:null,
    temperature:null,
    name:null
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position=>{
        this._getWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({
          error:error
      })
    }
  )
  }

  _getWeather=(lat, long)=>{
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature:json.main.temp,
        name:json.weather[0].main,
        isLoaded: true
      })
    })
  }

  render() {
    const {isLoaded, error, temperature, name} = this.state;
    return (
      
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
       {isLoaded ? <Weather weatherName={name} temp={Math.floor(temperature - 273.15)} /> : (<View style={styles.loading}>
         <Text style={styles.loadingText}>Getting the Weather!</Text>
         {error ? <Text style={styles.errorText}>{error}</Text> : null}
         </View>)}
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'space-around',
    // alignItems:'center',
    // flexDirection:'row',
    // flexWrap:'wrap'
  },
  loading:{
    flex:1,
    backgroundColor:'#FDF6AA',
    justifyContent:'flex-end',
    paddingLeft:25
  },
  errorText:{
    color:'red',
    backgroundColor:'transparent',
    marginBottom:40
  },
  loadingText:{
    fontSize:36,
    marginBottom:100
  }
  // redView:{
  //   height:50,
  //   width:50,
  //   backgroundColor: 'red'
  //   //alignSelf:'flex-start'
  // },
  // yellowView:{
  //   height:50,
  //   width:50,
  //   backgroundColor:'yellow'
  //  // alignSelf:'center'
  // }
});