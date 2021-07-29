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

import AsyncStorage from '@react-native-async-storage/async-storage';
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
        item: this.props.route.params.organization,
        flag: false
    };

    async componentDidMount() {
      //  console.log("OK test ORG ", this.state.item[0])

    }
    _dropdown_2_renderButtonText(rowData) {
        const { name, uri } = rowData;
        return `${name}`;
    }

    _dropdown_2_renderRow(rowData, rowID, highlighted) {
        return (
            <TouchableOpacity
                onPress={() =>
                    this.setOrgValue(rowData)
                }
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
    _dropdown_4_willHide() {
       console.log("test ")
        // this.setState({
        //   dropdown_4_options: null,
        //   dropdown_4_defaultValue: 'loading',
        // });
      }
    async setOrgValue(rowData) {
        this.setState({ org: rowData.name, 
            flag: true })
         console.log(rowData._id) 
         await AsyncStorage.setItem('organization_id', rowData._id)    
         this._dropdown_2 && this._dropdown_2.hide();
    }
    _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID == DEMO_OPTIONS_1.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.dropdown_2_separator}
            key={key}
        />);
    }


    selctOrgFunc = async () => {
        if (this.state.flag) {
            this.props.navigation.navigate('Tab', { screen: 'Home' });
        }
        else {
            alert("please select any of one organization")
        }
    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
                <View style={styles.container}>

                    <ImageBackground source={require('../../assets/Background.png')}
                        style={{
                            height: '100%',
                            width: '100%'
                        }}>

                        {/* <TouchableOpacity style={{
                        }}
                            onPress={() => { this.props.navigation.goBack(); }}
                        >
                            <Image
                                style={styles.arrowLeft}
                                source={require('../../assets/ArrowLeftSquare.png')}>
                            </Image>
                        </TouchableOpacity> */}
                        <Text style={{
                            marginLeft: responsiveHeight(3),
                            marginTop: responsiveHeight(12),
                            alignSelf: 'flex-start',
                            color: '#F2F3FD',
                            fontWeight: '700',
                            fontSize: 30,
                            lineHeight: 45
                        }}>
                            Select Organisation

                        </Text>
                        <Text style={{
                            marginLeft: responsiveHeight(3),
                            marginTop: responsiveHeight(-2),
                            alignSelf: 'flex-start',
                            color: '#F2F3FD',
                            fontWeight: '400', fontSize: 12, lineHeight: 45
                        }}>

                            Select your desired organisation to procced
                        </Text>

                        <View style={styles.emailView}>
                            <ModalDropdown ref={el => this._dropdown_2 = el}
                                // onDropdownWillHide={this._dropdown_4_willHide.bind(this)}
                                style={styles.dropDown}
                                textStyle={styles.dropdown_2_text}
                                dropdownStyle={styles.dropdown_2_dropdown}
                                options={this.state.item}
                                renderButtonText={(rowData) => this._dropdown_2_renderButtonText(rowData)}
                                renderRow={this._dropdown_2_renderRow.bind(this)}
                                renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => 
                                    this._dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                            >
                                <View style={styles.dropdownIn}>
                                    <Text style={styles.breedtext}>{this.state.org}</Text>
                                    <Entypo name="chevron-thin-down" size={24} color="#6E7191" style={{marginRight: responsiveHeight(2),}} />
                                    {/* <Image
                                        source={require('../../assets/Stroke1High.png')}
                                        style={{ width: 26, height: 13, alignSelf: "flex-end", marginRight: responsiveHeight(2), }}
                                    /> */}
                                </View>
                            </ModalDropdown>
                            
                        </View>



                        <TouchableOpacity style={styles.loginBtn} onPress={() => { this.selctOrgFunc() }}>
                            <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '600', fontSize: 16, lineHeight: 28 }}>
                                Continue
                            </Text>
                        </TouchableOpacity>



                    </ImageBackground>


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
        width: "88%",
        borderWidth: 0,
        alignSelf: 'center',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        marginTop: responsiveHeight(2),
        marginLeft: responsiveHeight(0.5),
        backgroundColor: '#f2f3fd',
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
        marginTop: responsiveHeight(7),
        marginLeft: responsiveHeight(3),
        width: 36,
        height: 36,
    },
    loginForm: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: windowWidth - 30,
        height: windowHeight - 70,
        borderRadius: responsiveHeight(2),
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(5)
    },
    emailView: {
        width: "90%",
        height: 64,
        backgroundColor: '#f2f3fd',
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#D0D3E8',
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: windowHeight / 6
    },
    textinput: {
        padding: responsiveHeight(3),
        width: '100%'
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
