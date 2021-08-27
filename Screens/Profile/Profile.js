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
export default class Profile extends Component {  
    constructor(props) {
        super(props);     
        this.state = {
       // item: this.props.route.params.data,
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
        team:"Select Teams",
        region:'Region/Clusters',
    };
}
    async componentDidMount() {
     // console.log(this.state.item)

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

                   <Image source={require('../../assets/commingSoon.png')} style={{ height: windowHeight/3.5 , width: windowWidth-150,alignSelf:'center', marginTop:windowHeight/3 }}>
                       
                    </Image> 

            <Text style={{alignSelf:'center',marginTop:responsiveHeight(8),
            fontSize:24,fontWeight:'700',color:'#6E7191',letterSpacing:5}}>Coming Soon</Text>
                    {/* <ImageBackground source={require('../../assets/Background.png')} style={{ height: '100%', width: '100%' }}>
                        <ScrollView>
                            <TouchableOpacity style={{
                            }}
                                onPress={() => { this.props.navigation.goBack(); }}
                            >
                                <Image
                                    style={styles.arrowLeft} source={require('../../assets/ArrowLeftSquare.png')}>
                                </Image>
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft: responsiveHeight(2),
                                marginTop: responsiveHeight(2),
                                alignSelf: 'flex-start', color: 'white', fontWeight: '700', fontSize: 30, lineHeight: 45
                            }}>
                                Create Profile
                    </Text>

                            <View style={styles.loginForm}>



                                <View style={styles.emailView}>
                                    <ModalDropdown ref="dropdown_2"
                                        style={styles.dropDown}
                                        textStyle={styles.dropdown_2_text}
                                        dropdownStyle={styles.dropdown_2_dropdown}
                                        options={DEMO_OPTIONS_2}
                                        renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                                        renderRow={this._dropdown_2_renderRow.bind(this)}
                                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                                    >
                                        <View style={styles.dropdownIn}>
                                            <Text style={styles.breedtext}>{this.state.org}</Text>
                                            <Image
                                                source={require('../../assets/Stroke1.png')}
                                                style={{ width: 18, height: 18, alignSelf: "flex-end", marginRight: responsiveHeight(2), }}
                                            />
                                        </View>
                                    </ModalDropdown>
                                </View>
                                <View style={styles.emailView}>
                                    <TextInput
                                        style={styles.textinput}
                                        placeholder={'Name'}
                                        placeholderTextColor={'grey'}
                                        onSubmitEditing={() => this._password.focus()}
                                        returnKeyType="next"
                                        returnKeyLabel="next"
                                        value={this.state.name}
                                        onChangeText={(text) => {
                                            this.setState({ name: text });
                                        }}
                                    />
                                </View>

                                <View style={styles.emailView}>
                                    <TextInput
                                        style={styles.textinput}
                                        placeholder={'Email'}
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

                                <View style={styles.emailView}>
                                    <TextInput
                                        style={styles.textinput}
                                        placeholder={'Password'}
                                        placeholderTextColor={'grey'}
                                        secureTextEntry={true}
                                        onSubmitEditing={() => this._password.focus()}
                                        returnKeyType="next"
                                        returnKeyLabel="next"
                                        value={this.state.password}
                                        onChangeText={(text) => {
                                            this.setState({ password: text });
                                        }}
                                    />
                                </View>

                                <View style={styles.emailView}>
                                    <ModalDropdown ref="dropdown_2"
                                        style={styles.dropDown}
                                        textStyle={styles.dropdown_2_text}
                                        dropdownStyle={styles.dropdown_2_dropdown}
                                        options={DEMO_OPTIONS_2}
                                        renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                                        renderRow={this._dropdown_2_renderRow.bind(this)}
                                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                                    >
                                        <View style={styles.dropdownIn}>
                                            <Text style={styles.breedtext}>{this.state.team}</Text>
                                            <Image
                                                source={require('../../assets/Stroke1.png')}
                                                style={{ width: 18, height: 18, alignSelf: "flex-end", marginRight: responsiveHeight(2), }}
                                            />
                                        </View>
                                    </ModalDropdown>
                                </View>
                                <View style={styles.emailView}>
                                    <ModalDropdown ref="dropdown_2"
                                        style={styles.dropDown}
                                        textStyle={styles.dropdown_2_text}
                                        dropdownStyle={styles.dropdown_2_dropdown}
                                        options={DEMO_OPTIONS_2}
                                        renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                                        renderRow={this._dropdown_2_renderRow.bind(this)}
                                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                                    >
                                        <View style={styles.dropdownIn}>
                                            <Text style={styles.breedtext}>{this.state.region}</Text>
                                            <Image
                                                source={require('../../assets/Stroke1.png')}
                                                style={{ width: 18, height: 18, alignSelf: "flex-end", marginRight: responsiveHeight(2), }}
                                            />
                                        </View>
                                    </ModalDropdown>
                                </View>


                                <TouchableOpacity style={styles.loginBtn} onPress={() => { this.props.navigation.navigate('Home') }}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '600', fontSize: 16, lineHeight: 28 }}>
                                    Submit
                          </Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </ImageBackground>
 */}

                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    breedtext: {
        color: '#6E7191',
        alignSelf: 'center',
        // marginLeft:responsiveHeight(1.5),
        paddingLeft: responsiveHeight(2),
        fontSize: responsiveHeight(2.1)
    },
    dropdown_2: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    dropdownIn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dropdown_3_dropdownTextStyle: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: responsiveFontSize(2),
    },

    dropDown: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'flex-end',

    },
    dropdown_2_image: {
        marginRight: responsiveHeight(2),
        marginLeft: responsiveHeight(2),
        // width: 20,
        // height: 21,
    },
    dropdown_2_row_text: {
        marginLeft: responsiveHeight(2),
        fontSize: 16,
        color: 'black',
        textAlignVertical: 'center',

    },
    dropdown_2_separator: {
        //height: 1,
        backgroundColor: '#959595',
    },

    dropdown_2_text: {
        // marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_2_dropdown: {
        width: "90%",
        borderWidth: 0,
    },
    dropdown_2_row: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        marginLeft: responsiveHeight(1),
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    arrowLeft: {
        marginTop: responsiveHeight(5),
        marginLeft: responsiveHeight(2),
        width: 36,
        height: 36,
    },
    loginForm: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: windowWidth - 30,
        //height: windowHeight - 70,
        borderRadius: responsiveHeight(2),
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(5)
    },
    emailView: {
        width: "95%",
        height: 64,
        //backgroundColor: '#F2F3FD',
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: responsiveHeight(3),
        flexDirection: 'row',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#D0D3E8',
        alignContent: 'center',
        flexDirection: 'row',
    },
    textinput: {
        padding: responsiveHeight(2),
        width:'100%'
    },

    loginBtn: {
        width: responsiveWidth(80),
        height: responsiveHeight(8),
        backgroundColor: '#9B945F',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
        borderRadius: 15,
    },

});
