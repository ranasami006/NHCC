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
    CheckBox,
} from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
const DEMO_OPTIONS_1 = ['Doddles', 'Aussies Doddles', 'Aussies',];
const DEMO_OPTIONS_2 = [
    { "name": "Vaccine", "uri": require("../../assets/Injection.png") },
    { "name": "Supply Chain", "uri": require("../../assets/Frame.png") },
    { "name": "Regional Lab", "uri": require("../../assets/Pen.png") },
];
import {LogIn } from '../../Screens/backend/api'
export default class selectorganization extends Component {
    state = {
        email: '',
        password: '',
        loader: false,
        secured: true,
        lat: '',
        lng: '',
        facebookFile: '',
        googleFile: '',
        isSelected: false,
        org: "Select Organisation",
        team: "Select Teams",
        region: 'Region/Clusters',
    };

    async componentDidMount() {
      
      let res= await LogIn("mustafa.gul@ascend.com.sa",'Ascend@2020')
      console.log(res)
      
        //     let { status } = await Location.requestPermissionsAsync();
        //     if (status !== 'granted') {
        //       this.setState({ errorMsg: 'Permission to access location was denied' });
        //       return;
        //   }

        //   let location = await Location.getCurrentPositionAsync({});

        //   this.setState({ location: location });
        //   let text = 'Waiting..';
        //   if (this.state.errorMsg) {
        //       text = this.state.errorMsg;
        //   } else if (location) {
        //       text = JSON.stringify(location);
        //   }

        //   this.setState
        //   ({
        //     lat:location.coords.latitude, 
        //     lng:location.coords.longitude
        //   })
        //    await  AsyncStorage.setItem('lat', JSON.stringify(location.coords.latitude));
        //   await AsyncStorage.setItem('lng', JSON.stringify(location.coords.longitude));

    }
    _dropdown_2_renderButtonText(rowData) {
        const { name, uri } = rowData;
        return `${name}`;

    }

    _dropdown_2_renderRow(rowData, rowID, highlighted) {
        return (
            <TouchableOpacity
                onPress={() => this.setState({ org: rowData.name })}
            >
                <View style={styles.dropdown_2_row}>
                    <Image style={styles.dropdown_2_image}
                        mode='contain'
                        source={rowData.uri}
                    />
                    <Text style={styles.dropdown_2_row_text}>
                        {`${rowData.name}`}
                    </Text>


                </View>
            </TouchableOpacity>
        );
    }
    _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID == DEMO_OPTIONS_1.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.dropdown_2_separator}
            key={key}
        />);
    }
    async LoginFn() {
        let success = await
            signIn(this.state.email, this.state.password, this.state.lat, this.state.lng);
        if (success) {

            this.props.navigation.navigate('TabBar', { screen: 'Home' });
        }
        else {
            await this.setState({ loader: false })
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
            console.log('Email is Not Correct');
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
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
                <View style={styles.container}>

                    <ImageBackground source={require('../../assets/Background.png')} style={{ height: '100%', width: '100%' }}>

                        <TouchableOpacity style={{
                        }}
                            onPress={() => { this.props.navigation.goBack(); }}
                        >
                            <Image
                                style={styles.arrowLeft}
                                source={require('../../assets/ArrowLeftSquare.png')}>
                            </Image>
                        </TouchableOpacity>
                        <Text style={{
                             marginLeft: responsiveHeight(3),
                            marginTop: responsiveHeight(5),
                            alignSelf: 'flex-start',
                            color: '#F2F3FD',
                            fontWeight: '700',
                            fontSize: 30, lineHeight: 45
                        }}>
                            Reset Password

                        </Text>
                        <Text style={{
                            marginLeft: responsiveHeight(3),
                            marginTop: responsiveHeight(-2),
                            alignSelf: 'flex-start', color: '#F2F3FD',
                            fontWeight: '400', fontSize: 12, lineHeight: 45
                        }}>

                            Enter your email to reset your password

                        </Text>

                        <View style={styles.emailView}>
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
                                            placeholder={'jane.doe@gmail.com'}
                                            placeholderTextColor={'grey'}
                                            onSubmitEditing={() => this._password.focus()}
                                            returnKeyType="next"
                                            returnKeyLabel="next"
                                            value={this.state.email}
                                            onChangeText={(text) => {
                                                this.setState({ email: text });
                                            }}
                                        />

                                    </View>
                                </View>



                        <TouchableOpacity style={styles.loginBtn} onPress={() => { this.props.navigation.navigate('Home') }}>
                            <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '600', fontSize: 16, lineHeight: 28 }}>
                            Reset Password
                            </Text>
                        </TouchableOpacity>



                    </ImageBackground>


                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    arrowLeft: {
        marginTop: responsiveHeight(7),
        marginLeft: responsiveHeight(3),
        width: 36,
        height: 36,
    },
    emailView: {
        width: windowWidth - 40,
        height: 64,
        backgroundColor: '#F2F3FD',
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: windowHeight/7,
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
    loginBtn: {
        width: windowWidth - 40,
        height: responsiveHeight(9),
        backgroundColor: '#9B945F',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        position: 'absolute',
        bottom: 15,
    },

});
