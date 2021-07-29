
import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView,
    StatusBar, ImageBackground, Image, Dimensions, ScrollView,
    TouchableOpacity,
} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize }
    from 'react-native-responsive-dimensions';
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

 export default class Authloadingcheck extends Component {
    static navigationOptions = {
        header: false,
    }
    componentDidMount = async () => {
        
        this.loadData();
        
        
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.loadData();
            //Put your Data loading function here instead of my this.loadData()
        });
       
    };

    async loadData(){
        let data= await AsyncStorage.getItem('accessToken')
        if(data){
            this.props.navigation.navigate('Tab', { screen: 'Home' });
        }
        else{
            this.props.navigation.navigate('AuthLoading');
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="transparent" barStyle="light" translucent />
                
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    loginBtn:{
        width:responsiveWidth(80),
        height:responsiveHeight(8),
        backgroundColor:'#9B945F',
        alignSelf:'center',
        justifyContent:'center',
        marginTop:responsiveHeight(5),
        borderRadius:15,
    }, 
    profileBtn:{
        width:responsiveWidth(80),
        height:responsiveHeight(8),
        alignSelf:'center',
        justifyContent:'center',
        marginTop:responsiveHeight(3),
        borderRadius:15,
        borderWidth:1,
        borderColor:'white',
        marginBottom:responsiveHeight(3),
    } ,
});





