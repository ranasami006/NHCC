import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions,
    ActivityIndicator,

} from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { LogIn, getUserData } from '../backend/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-elements/dist/helpers';

export default class Login extends Component {
    state = {
        loader: false,
        secured: true,
        lat: '',
        lng: '',
        facebookFile: '',
        googleFile: '',
        isSelected: false,
        email: '',
        password: '',
        secureText: true,
        isFocusedEmail: false,
        isFocusedPassword: false,
    };
    async componentDidMount() {

    }
    async LoginFn() {
        let success = await LogIn(this.state.email.toLowerCase(), this.state.password);
       
        if (success.accessToken) {
            try {
                // if (this.state.checked) {
                await AsyncStorage.setItem('accessToken', success.accessToken)
                await AsyncStorage.setItem('refreshToken', success.refreshToken)
            
               // console.log(success.accessToken)
                // }

                let userData = await getUserData(success.accessToken)
                await AsyncStorage.setItem('userData', JSON.stringify(userData.data))
                await this.setState({ loader: false })
                console.log("HERE1",userData.data.user.organizations_relation)
                if (userData.data.user.organizations_relation.length > 1) {
                    console.log("Success")
                    this.props.navigation.replace('selectorganization', { organization: userData.data.user.organizations_relation });
                }
                else {
                   
                    console.log("Success falss",userData.data.user.organizations_relation[0]._id)
                    
                    await AsyncStorage.setItem('organization_id', userData.data.user.organizations_relation[0]._id)
                    this.props.navigation.replace('Tab', { screen: 'Home' });
                    console.log("ÖKKKKK")
                }
               // console.log("Here")

            } catch (e) {
                console.log("catch Here")
            }

        }
        else {
            //alert(success.error)
            await this.setState({ ErrorMessege: success.error, loader: false })
        }

    }
    async ValidationFn() {
        this.setState({ loader: true, ErrorMessege: '' });
        let TempCheck = await this.CheckValidateFn();

        switch (TempCheck) {
            case 0:
                this.LoginFn();
                break;
            case 1:
                this.setState({ loader: false });
                // alert(this.state.ErrorMessege);
                break;
            default:
                break;
        }
    }
    async CheckValidateFn() {
        //EmailCheck
        let reg2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg2.test(this.state.email) === false) {
            this.state.email !== undefined && this.state.email !== ''
                ? this.setState({ ErrorMessege: 'Please enter proper Email Id' })
                : this.setState({ ErrorMessege: 'Email cannot be empty' });
            // this.setState({ email: text })
            return 1;
        }
        return 0;
    }
    setSelection = () => {
        this.setState({ isSelected: !this.state.isSelected })
    }
    render() {
        return (
            // <SafeAreaView style={{ flex: 1 }}>
                 <View style={styles.container}>
                        <StatusBar style="light" />
          
                    <ImageBackground source={require('../../assets/Background.png')}
                        style={{ flex: 1, resizeMode: 'cover' }}>
                        <ScrollView>
                            <TouchableOpacity style={{

                            }}
                                onPress={() => { this.props.navigation.navigate('AuthLoading') }}
                            >
                                <Image
                                    style={styles.arrowLeft}
                                    source={require('../../assets/ArrowLeftSquare.png')}>
                                </Image>
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft: responsiveHeight(2),
                                marginTop: responsiveHeight(5),
                                alignSelf: 'flex-start', color: 'white',
                                fontWeight: '700', fontSize: 30,
                                lineHeight: 45
                            }}>
                                Login
                            </Text>

                            <View style={styles.loginForm}>
                                <Text style={{
                                    marginLeft: responsiveHeight(2),
                                    marginTop: responsiveHeight(5),
                                    alignSelf: 'flex-start',
                                    color: '#6E7191',
                                    fontWeight: '400',
                                    fontSize: 14,
                                    lineHeight: 14,
                                    letterSpacing: 1.5,
                                }}>
                                    Welcome, Please login to your account
                                </Text>
                                <View 
                                style={!this.state.isFocusedEmail?
                                styles.emailView:
                                [styles.PasswordView,{marginTop:responsiveHeight(5)}]}>
                                    <Image style={styles.messageIcon}
                                        source={require('../../assets/Message.png')}>
                                    </Image>
                                    <View
                                        style
                                        ={styles.emailTextView}>
                                        <Text style={{
                                            fontWeight: '500',
                                            fontSize: 11,
                                            lineHeight: 24
                                        }}>Email</Text>

                                        <TextInput
                                            style={styles.textinput}
                                            placeholder={'admin@ascend.com.sa'}
                                            placeholderTextColor={'grey'}
                                            onSubmitEditing={() => {()=> 
                                                this.setState({isFocusedEmail:false})
                                                this.secondTextInput.focus(); }}
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            returnKeyLabel="next"
                                            value={this.state.email}
                                            onBlur={() => {
                                                this.setState({ isFocusedEmail: false })
                                            }}
                                            onChangeText={(text) => {
                                                this.setState({ email: text });
                                            }}
                                            onFocus={() => {
                                                this.setState({ isFocusedEmail: true })
                                            }}
                                        />
                                    </View>

                                </View>

                                <View style={this.state.isFocusedPassword?styles.PasswordView:[styles.emailView,{marginTop:responsiveHeight(2)}]}>
                                    <TouchableOpacity
                                        style={{ alignSelf: 'center' }}
                                        onPress={() => {
                                            this.setState({ secureText: !this.state.secureText });
                                        }}>
                                        {this.state.secureText ?
                                            <Feather name="eye" size={24} color="black" style={styles.messageIcon} />
                                            :
                                            <Feather name="eye-off" size={24} color="black" style={styles.messageIcon} />
                                        }

                                    </TouchableOpacity>
                                    <View style={styles.PasswordSubView}>
                                        <View style={styles.emailTextView}>
                                            <Text style={{
                                                fontWeight: '500',
                                                fontSize: 11,
                                                lineHeight: 24
                                            }}>Password</Text>
                                            <TextInput
                                                ref={(input) => { this.secondTextInput = input; }}
                                                style={styles.textinput}
                                                placeholder={'password'}
                                                placeholderTextColor={'grey'}
                                                secureTextEntry={this.state.secureText}
                                                value={this.state.password}
                                                onChangeText={(text) => {
                                                    this.setState({ password: text });
                                                }}
                                                onFocus={() => {
                                                    this.setState({ isFocusedPassword: true })
                                                }}
                                                onBlur={() => {
                                                    this.setState({ isFocusedPassword: false })
                                                }}
                                                
                                            />
                                        </View>
                                        <TouchableOpacity
                                            style={{ alignSelf: 'center', marginRight: responsiveHeight(1) }}
                                            onPress={() => {
                                                this.setState({ password: '' })
                                            }}>
                                            {this.state.password.length > 0
                                                ?
                                                <Image style={styles.crossIcon} source={require('../../assets/Close.png')}>
                                                </Image>
                                                : null}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                <View style={styles.CheckBoxView}>
                                    <CheckBox
                                        title='Remember Me'
                                        ttitleProps={{

                                        }}
                                        checked={this.state.checked}
                                        checkedColor='#9B945F'
                                        containerStyle={{ backgroundColor: 'white', borderWidth: 0, }}
                                        onPress={() => this.setState({ checked: !this.state.checked })}
                                    />
                                </View>
                                <Text style={{ color: 'red', alignSelf: 'center' }}>{this.state.ErrorMessege}</Text>
                                <TouchableOpacity style={styles.loginBtn}
                                    onPress={() => { this.ValidationFn() }}>
                                    {this.state.loader ?
                                        <ActivityIndicator color={'#0F493C'}
                                            size={'large'}></ActivityIndicator>
                                        :
                                        <Text style={{
                                            alignSelf: 'center', color: 'white',
                                            fontWeight: '600', fontSize: 16, lineHeight: 28
                                        }}>
                                            Login
                                        </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                            <Text style={{
                                marginTop: responsiveHeight(4), alignSelf: 'center',
                                color: '#F2F3FD', fontWeight: '600',
                                fontSize: 14, lineHeight: 28
                            }}>
                                Forget Password?
                            </Text>
                        </ScrollView>
                    </ImageBackground>


                </View>
           
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    arrowLeft: {
        marginTop: responsiveHeight(8),
        marginLeft: responsiveHeight(2),
        width: 36,
        height: 36,
    },
    loginForm: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: windowWidth - 30,
        height: windowHeight / 1.8,
        borderRadius: responsiveHeight(2),
        marginTop: responsiveHeight(5)
    },
    emailView: {
        width: "95%",
        height: 64,
        backgroundColor: '#F2F3FD',
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: responsiveHeight(5),
        flexDirection: 'row',
        alignContent: 'center',


    },
    messageIcon: {
        marginLeft: responsiveHeight(2),
        width: 27,
        height: 25,
        alignSelf: 'center',

    },
    crossIcon: {
        marginLeft: responsiveHeight(2),
        width: 12,
        height: 12,
        alignSelf: 'center',

    },
    emailTextView: {
        marginLeft: responsiveWidth(6),
        alignSelf: 'center',
    },
    PasswordView: {
        width: "95%",
        height: 64,
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: responsiveHeight(2),
        flexDirection: 'row',
        alignContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    PasswordSubView: {
        width: "85%",
        height: 64,
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkbox: {
        //alignSelf: "center",

    },
    CheckBoxView: {
        //flexDirection: 'row',
        marginLeft: responsiveHeight(0),
        marginTop: responsiveHeight(2),


    },
    loginBtn: {
        width: responsiveWidth(80),
        height: responsiveHeight(8),
        backgroundColor: '#9B945F',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(1),
        borderRadius: 15,
    },
});
