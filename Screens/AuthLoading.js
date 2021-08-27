
import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, SafeAreaView,
    ImageBackground, Image, Dimensions, ScrollView,
    TouchableOpacity,
    BackHandler,
    Alert,

} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize }
    from 'react-native-responsive-dimensions';
import { StatusBar } from 'expo-status-bar';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class AuthLoading extends Component {
    static navigationOptions = {
        header: false,
    }
    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };


    componentDidMount = async () => {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    };
    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return (   
                <View style={styles.container}>
                <StatusBar style="light" />
                    <ImageBackground source={require('../assets/Background.png')} 
                    style={{flex:1, }}>
                        <ScrollView>
                            <Image source={require('../assets/Group56.png')} style={{
                                // height: windowHeight/2.8, width: windowWidth/1.5,
                                alignSelf: 'center', marginTop: responsiveHeight(10)
                            }} />

                            <Text style={{ letterSpacing: 2, alignSelf: 'center', color: 'white', fontWeight: '700', fontSize: 24, lineHeight: 36, marginTop: responsiveHeight(5) }}>
                                Digitum LiveAgent
                            </Text>
                            <Text style={{
                                textAlign: 'center', color: 'white', fontWeight: '400', fontSize: 12, lineHeight: 18,
                                marginTop: responsiveHeight(2),
                                width: '70%', alignSelf: 'center',
                            }}>
                                Welcome ! We Provide the quality with quicker
                                response timeQualified agents availble 24/7
                                in order to keep the your querries on top priority
                            </Text>

                            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                                this.backHandler.remove();
                                this.props.navigation.navigate('Login')

                            }}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '600', fontSize: 16, lineHeight: 28 }}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileBtn} onPress={() => {
                                this.backHandler.remove();
                                this.props.navigation.navigate('Profile')
                            }}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '600', fontSize: 16, lineHeight: 28 }}>
                                    Create Profile
                                </Text>
                            </TouchableOpacity>

                        </ScrollView>
                    </ImageBackground>
                </View>         
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    loginBtn: {
        width: responsiveWidth(80),
        height: responsiveHeight(8),
        backgroundColor: '#9B945F',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(5),
        borderRadius: 15,
    },
    profileBtn: {
        width: responsiveWidth(80),
        height: responsiveHeight(8),
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(3),
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: responsiveHeight(3),
    },
});





