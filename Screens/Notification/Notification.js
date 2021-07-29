import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions,
    CheckBox,
    Modal,
    TouchableHighlight,
}
    from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
const _editor = React.createRef();
export default class Notification extends Component {
    state = {
        email: '',
    };
    async componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="light-content" />
                {/* <StatusBar backgroundColor="transparent" barStyle="light-content" translucent /> */}
                <View style={styles.container}>
                    <View style={styles.innerMainView} >
                        <ScrollView>
                            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                            <Image
                                style={styles.arrowLeft} source={require('../../assets/ArrowLeftSquare.jpg')}>
                            </Image>
                            </TouchableOpacity>
                            <Text style={{
                                color: '#2D3134',
                                fontSize: 24,
                                fontWeight: "700",
                                marginTop: responsiveHeight(2)
                                , marginLeft: -5
                            }}> Notifications</Text>

                            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2), }}>

                                <Image source={require('../../assets/placeholderNotification.png')}>
                                </Image>
                                <View style={{ marginLeft: responsiveHeight(1), marginTop: responsiveHeight(0.5), width: '100%' }}>
                                    <Text style={{ fontSize: 15, }} >
                                        Saleem comment on Ticket # 78959
                                    </Text>
                                    <Text style={{
                                        color: '#333333',
                                        fontSize: 12,
                                        opacity: 0.8
                                    }}>

                                        Lorem ipsum dolor sit ametumen iope
                                    </Text>

                                    <Text style={{
                                        color: '#AEBFC2', fontSize: 12,
                                        opacity: 0.8, textAlign: 'right',
                                        marginRight: responsiveHeight(5)
                                    }}>
                                        02:00 PM 27/06/2021
                                    </Text>

                                </View>
                            </View>
                            <View
                                style={{
                                    borderTopWidth: 1,
                                    borderTopColor: '#E5E5E5',
                                    width: windowWidth,
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(1)
                                }}
                            >
                            </View>


                            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2), }}>

                                <Image source={require('../../assets/placeholderNotificatin1.png')}>
                                </Image>
                                <View style={{ marginLeft: responsiveHeight(1), marginTop: responsiveHeight(0.5), width: '100%' }}>
                                    <Text style={{ fontSize: 15, }} >
                                        Saleem comment on Ticket # 78959
                                    </Text>
                                    <Text style={{
                                        color: '#333333',
                                        fontSize: 12,
                                        opacity: 0.8
                                    }}>

                                        Lorem ipsum dolor sit ametumen iope
                                    </Text>

                                    <Text style={{
                                        color: '#AEBFC2', fontSize: 12,
                                        opacity: 0.8, textAlign: 'right',
                                        marginRight: responsiveHeight(5)
                                    }}>
                                        02:00 PM 27/06/2021
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderTopWidth: 1,
                                    borderTopColor: '#E5E5E5',
                                    width: windowWidth,
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(1)
                                }}
                            >
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2), }}>
                                <Image source={require('../../assets/placeholder1.png')}>
                                </Image>
                                <View style={{ marginLeft: responsiveHeight(1), 
                                    marginTop: responsiveHeight(0.5), width: '100%' }}>
                                    <Text style={{ fontSize: 15, }} >
                                        Saleem comment on Ticket # 78959
                                    </Text>
                                    <Text style={{
                                        color: '#333333',
                                        fontSize: 12,
                                        opacity: 0.8
                                    }}>

                                        Lorem ipsum dolor sit ametumen iope
                                    </Text>

                                    <Text style={{
                                        color: '#AEBFC2', fontSize: 12,
                                        opacity: 0.8, textAlign: 'right',
                                        marginRight: responsiveHeight(5)
                                    }}>
                                        02:00 PM 27/06/2021
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderTopWidth: 1,
                                    borderTopColor: '#E5E5E5',
                                    width: windowWidth,
                                    alignSelf: 'center',
                                    marginTop: responsiveHeight(1)
                                }}
                            >
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerMainView: {
        backgroundColor: 'white',
        width: windowWidth - 40,
        alignSelf: 'center',
    },
    arrowLeft: {
        marginTop: responsiveHeight(5),
        //marginLeft: responsiveHeight(2),     
    },
    emailView: {
        width: "100%",
        height: 50,
        backgroundColor: '#F2F3FD',
        opacity: 0.5,
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: responsiveHeight(8),
        flexDirection: 'row',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#D0D3E8',
        alignContent: 'center',
        flexDirection: 'row',
    },
    textinput: {
        paddingLeft: responsiveHeight(1.5),
        width: '100%',
        height: '100%',
    },
    editor: {
        borderColor: '#6E7191',
        borderWidth: 0.5,
        width: '100%',
        height: windowHeight / 3,
        alignSelf: 'center',
        backgroundColor: '#F2F3FD',
        opacity: 0.5,
    },
    FileUpload: {
        width: windowWidth - 40,
        height: windowHeight / 6.5,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: responsiveHeight(3),
        borderStyle: 'dashed',
        borderColor: '#6E7191',
        justifyContent: 'center',
    },
    loginBtn: {
        width: windowWidth - 40,
        height: responsiveHeight(6.5),
        backgroundColor: '#9B945F',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(3),
        borderRadius: 15,
    },

});
