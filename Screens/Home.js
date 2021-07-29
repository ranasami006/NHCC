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
    FlatList,
    ActivityIndicator,
    BackHandler,
    Alert,

} from 'react-native';
import HTMLView from 'react-native-htmlview';
// import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { getAllTickets } from './backend/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { data } from 'browserslist';
// import * as Font from "expo-font";
// import {
//     Poppins_100Thin,
//     Poppins_100Thin_Italic,
//     Poppins_200ExtraLight,
//     Poppins_200ExtraLight_Italic,
//     Poppins_300Light,
//     Poppins_300Light_Italic,
//     Poppins_400Regular,
//     Poppins_400Regular_Italic,
//     Poppins_500Medium,
//     Poppins_500Medium_Italic,
//     Poppins_600SemiBold,
//     Poppins_600SemiBold_Italic,
//     Poppins_700Bold,
//     Poppins_700Bold_Italic,
//     Poppins_800ExtraBold,
//     Poppins_800ExtraBold_Italic,
//     Poppins_900Black,
//     Poppins_900Black_Italic,
//   } from '@expo-google-fonts/poppins';
  
import Moment from 'moment';
  
export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        loader: false,
        secured: true,
        lat: '',
        lng: '',
        facebookFile: '',
        googleFile: '',
        isSelected: false,
        pageIndex: 0,
        allTickets: [],
       fontsLoaded: false,
    };
    this.arrayholder = [];   
} 

    logOut =()=>{
       console.log("test")
       
       Alert.alert(
        "Log Out",
        "Are you sure you want to Log Out?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.logmeOut() }
        ],
        { cancelable: false }
      );
       
    }
async functionNavigation(item){
    //BackHandler.removeEventListener('hardwareBackPress',)
    this.backHandler.remove();
    this.props.navigation.navigate('ConstTicketDetail',
    {
        screen: 'TicketDetail',
        params:
            { data: item._id,
                page:0,
            }
    })
}

async goToComment(item){
    this.backHandler.remove();
    //BackHandler.removeEventListener('hardwareBackPress' )
    this.props.navigation.navigate('ConstTicketDetail',
    {
        screen: 'TicketComments',
        params:
            { ticket_id: item._id }
    })
}
    async logmeOut(){
        await AsyncStorage.removeItem('accessToken'),
        await AsyncStorage.removeItem('refreshToken')
        await AsyncStorage.removeItem('userData')
         this.props.navigation.navigate('Login')
        
    }

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to close the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      componentWillUnmount() {
        this.backHandler.remove();
      }

    
        // async loadFonts() {
        //     await Font.loadAsync({
        //       // Load a font `Montserrat` from a static resource
        //       'Poppins_500Medium': Poppins_500Medium, 
        //       'Poppins_900Black': Poppins_900Black      
        //     });
        //     this.setState({ fontsLoaded: true });
        //   }       
    async componentDidMount() {
        this.loadData();
       
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.loadData();
            //Put your Data loading function here instead of my this.loadData()
        });
    }
async loadData(){
   // this.loadFonts()
    this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction
      );
    this.setState({ loader: true })
   

    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
        this.setState({displayMessage:'Good Morning !'})
    } else if (curHr < 18) {
        this.setState({displayMessage:'Good Afternoon !'})
    } else {
        this.setState({displayMessage:'Good Evening !'})
    }
 let userdata = await AsyncStorage.getItem('userData')        
    let userdata1= JSON.parse(userdata)
    
    this.setState({
        username:userdata1.user.name,
        pageIndex:0,
    })
    
    let data1 = await getAllTickets(10)
   
    //console.log("Datat", userdata1.user)
   
   if (data1.pagination) {
        await this.setState({
            allTickets: data1.pagination,
            allTicketsData: data1.pagination.data,
            loader: false,
            value: '',
            searchTxt: '',
        })
        this.arrayholder = data1.pagination.data
    }
    else {
        alert(data1.message)
         await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
        this.props.navigation.navigate('AuthLoading')
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

    searchFilterFunction = text => {
        this.setState({
            value: text,
            searchTxt: text,
            suggestions: true
        });
        //console.log(this.arrayholder);
            const newData = this.arrayholder.filter(item => {
            const itemData = item.ticketId.toString();
            const textData = text.toString();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            allTicketsData: newData,
        });
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="light-content" />
                 <View style={styles.container}>
                    <ScrollView style={{ marginBottom: responsiveHeight(0) }}>
                        <View style={styles.uperView}>
                            <ImageBackground source={require('../assets/RectangleHome.png')}
                                style={{ height: '100%', width: '100%' }}>

                               <TouchableOpacity onPress={()=> this.logOut()}>
                                <Image style={{
                                    alignSelf: 'flex-end', marginTop: responsiveHeight(5),
                                    width: 30, height: 30,
                                    marginRight: responsiveHeight(3)
                                }}
                                    source={require('../assets/Category.png')}></Image>
                                    </TouchableOpacity>
                                <View style={styles.topleftView}>
                                    <Text style={{ color: '#D0D3E8', fontWeight: '400', fontSize: 15 }}>{this.state.displayMessage}</Text>
                                    <Text style={{ color: '#F2F3FD', fontWeight: '700', fontSize: responsiveFontSize(3) }}>{this.state.username}</Text>
                                </View>

                                <View style={styles.searchView}>
                                    <View style={styles.serchViewinside}>
                                        <TextInput
                                            style={styles.textinput}
                                            placeholder={'Search ticket from ticket number'}
                                            placeholderTextColor={'#D0D3E8'}
                                            //onSubmitEditing={() => this._password.focus()}
                                            returnKeyType="next"
                                            returnKeyLabel="next"
                                            keyboardType="numeric"
                                            value={this.state.value}
                                            onChangeText={text => this.searchFilterFunction(text)}
                                        />
                                        <View style={{
                                            width: 40, height: 40,
                                            backgroundColor: '#438170', borderRadius: 15,
                                            justifyContent: 'center'
                                        }}>
                                            <Image style={{ alignSelf: 'center' }} 
                                            source={require('../assets/Search.png')}></Image>
                                        </View>
                                    </View>
                                    <View style={{
                                        width: '15%', height: 60, backgroundColor: '#0c372f',
                                        borderColor: 'white',
                                        borderWidth: 1,
                                        marginLeft: responsiveHeight(1.5),
                                        borderRadius: 5, justifyContent: 'center',
                                    }}>
                                        <Image style={{ alignSelf: 'center' }}
                                            source={require('../assets/Group10.png')}></Image>
                                    </View>
                                </View>
                                <View style={{
                                    alignSelf: 'center', flexDirection: 'row',
                                    width: '97%',
                                    marginTop: responsiveHeight(1.5),
                                    justifyContent: 'space-around',
                                    position: 'absolute',
                                    bottom: 15,
                                }}>
                                    <TouchableOpacity 
                                    style={this.state.pageIndex === 0 ? styles.uperButtons : styles.uperButtons1}
                                        onPress={async () => {

                                            await this.setState({
                                                pageIndex: 0,
                                                allTicketsData: this.state.allTickets.data
                                            })


                                        }}
                                    >
                                        <Text style={this.state.pageIndex==0?
                                            styles.uperButtonText:styles.uperButtonText1}>All</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={this.state.pageIndex === 1 ? styles.uperButtons : styles.uperButtons1}
                                        onPress={async () => {
                                            await this.setState({
                                                pageIndex: 1,
                                                allTicketsData: this.state.allTickets.data
                                            })
                                            let bigCities = this.state.allTicketsData.filter(function (e) {
                                                return e.status_id == 'opened';
                                            });
                                            this.setState({ allTicketsData: bigCities })
                                            console.log("TETS", bigCities.length)

                                        }}
                                    >
                                        <Text style={this.state.pageIndex==1?
                                            styles.uperButtonText:styles.uperButtonText1}>Opened</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={this.state.pageIndex === 2 ? styles.uperButtons : styles.uperButtons1}
                                        onPress={async () => {
                                            await this.setState({
                                                pageIndex: 2,
                                                allTicketsData: this.state.allTickets.data
                                            })
                                            let bigCities = this.state.allTicketsData.filter(function (e) {
                                                return e.status_id == 'closed';
                                            });
                                            this.setState({ allTicketsData: bigCities })
                                            console.log("TETS", bigCities.length)
                                        }}
                                    >
                                        <Text style={this.state.pageIndex==2?
                                            styles.uperButtonText:styles.uperButtonText1}>Closed</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={this.state.pageIndex === 3 ? styles.uperButtons : styles.uperButtons1}
                                        onPress={async () => {
                                            await this.setState({
                                                pageIndex: 3,
                                                allTicketsData: this.state.allTickets.data
                                            })
                                            let bigCities = this.state.allTicketsData.filter(function (e) {
                                                return e.status_id == 'reopened';
                                            });
                                            this.setState({ allTicketsData: bigCities })
                                        }}
                                    >
                                        <Text style={this.state.pageIndex==3?
                                            styles.uperButtonText:styles.uperButtonText1}>Reopened</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={this.state.pageIndex === 4 
                                    ? styles.uperButtons : styles.uperButtons1}
                                        onPress={async () => {
                                            await this.setState({
                                                pageIndex: 4,
                                                allTicketsData: this.state.allTickets.data
                                            })
                                            let bigCities = this.state.allTicketsData.filter(function (e) {
                                                return e.status_id == 'solved';
                                            });
                                            this.setState({ allTicketsData: bigCities })
                                        }}
                                    >
                                        <Text style={this.state.pageIndex==4?
                                            styles.uperButtonText:styles.uperButtonText1}>Solved</Text>
                                    </TouchableOpacity>
                                </View>

                            </ImageBackground>
                        </View>
                        {this.state.loader ?
                            <ActivityIndicator color={'#0F493C'}
                                size={'large'} style={{ marginTop: responsiveHeight(15) }}></ActivityIndicator>
                            :

                            <FlatList
                                data={this.state.allTicketsData}
                                renderItem={({ item, index }) => {
                                    return (

                                        <TouchableOpacity

                                            onPress={() =>
                                               this.functionNavigation(item)

                                            }
                                            style={styles.cardView}>
                                            <View style={{
                                                alignSelf: 'center',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                width: '95%',
                                                marginTop: responsiveHeight(1.5),
                                            }}>
                                                <Text style={{
                                                    color: '#438170',
                                                    fontSize: responsiveFontSize(2.5),
                                                    fontWeight: 'bold',
                                                }}>#{item.ticketId}</Text>
                                                <Entypo name="dots-three-horizontal" size={25} color="#104F40" />
                                            </View>
                                            <View style={{
                                                alignSelf: 'center',
                                                width: '95%',
                                                marginTop: responsiveHeight(1),
                                            }}>
                                                <Text style={{
                                                    color: '#6E7191',
                                                    fontSize: responsiveFontSize(1.5),
                                                    fontWeight: 'bold',
                                                }}>{Moment(item.updated_at).format('MMM D yyyy hh:mm A')}</Text>

                                            </View>
                                            <View style={{
                                                alignSelf: 'center',
                                                width: '95%',
                                                marginTop: responsiveHeight(1),
                                            }}>
                                                    <Text
                                                     style={
                                                         //this.state.fontsLoaded?
                                                { 
                                        
                                                    
                                                    color: '#2D3134',
                                                    fontSize: 14,
                                                    fontWeight: '500',
                                                   // fontFamily:'Poppins_500Medium',
                                                    
                                                     
                                                }
                                              // :
                                                // {color: 'red'}
                                            }
                                                  > 
                                                  {
                                                    item.subject
                                                    }
                                                   
                                                  </Text>
                                            </View>
                                                    
                                            <View style={{
                                                alignSelf: 'center',
                                                width: '95%',
                                                marginTop: responsiveHeight(2),
                                                borderTopColor: '#F2F3FD',
                                                borderTopWidth: 2,
                                            }}
                                            />
                                            {/* <Text>{item.status_id}</Text> */}
                                            <View style={styles.lowerCardView}>
                                                <View style={{ flexDirection: 'row', }}>
                                                    <TouchableOpacity style={{
                                                        width: responsiveHeight(13),
                                                        height: responsiveHeight(5.5),
                                                        backgroundColor:item.status_id=='opened'?
                                                        '#dcf4e5':item.status_id=='closed'?
                                                        '#fce6e4':item.status_id=='reopend'?
                                                        '#16B455':'#c9f7f5',
                                                        borderRadius: 8,
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Text style={{
                                                            alignSelf: 'center',
                                                            color: item.status_id=='opened'?
                                                            '#16B455':item.status_id=='closed'?
                                                            '#EB564C':item.status_id=='reopend'?
                                                            'white':'#229468',
                                                            fontSize: responsiveFontSize(2),
                                                            fontWeight: '600',
                                                            //fontFamily: this.state.fontsLoaded?'PoppinsBold':null
                                                        }}>{item.status_id}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{
                                                        width: responsiveHeight(13),
                                                        height: responsiveHeight(5.5),
                                                        borderColor: 
                                                        item.priority_id=='Medium'?
                                                        '#c9f7f5':item.priority_id=='low'?
                                                        '#229468':item.priority_id=='high'?
                                                        '#E5332A':'#FFA500'
                                                        ,
                                                        borderWidth: 0.5,
                                                        borderRadius: 8,
                                                        justifyContent: 'center',
                                                        marginLeft: responsiveHeight(2),
                                                        flexDirection: 'row',

                                                    }}>
                                                        <Image style={{ alignSelf: 'center' }}
                                                            source={require('../assets/Vector.png')}></Image>
                                                        <Text style={{
                                                            alignSelf: 'center', marginLeft: responsiveHeight(1), 
                                                            color:  item.priority_id=='Medium'?
                                                            '#c9f7f5':item.priority_id=='low'?
                                                            '#229468':item.priority_id=='high'?
                                                            '#E5332A':'#FFA500',
                                                            fontSize: responsiveFontSize(2), fontWeight: '600'
                                                        }}>{item.priority_id}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity 
                                                onPress={()=>{
                                                    this.goToComment(item)
                                                   
                                                   
                                                   // this.props.navigation.navigate('TicketComments', { ticket_id: item._id })
                                                }}
                                                style={{ flexDirection: 'row', }}>
                                                    <Image style={{ alignSelf: 'center',width:15,height:15 }} source={require('../assets/Plus.png')}></Image>
                                                    <Text style={{
                                                        alignSelf: 'center',
                                                        marginLeft: responsiveHeight(1), color: '#438170',
                                                        fontSize: responsiveFontSize(1.7), fontWeight: '600'
                                                    }}>Add Comment</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </TouchableOpacity>


                                    );
                                }}
                                keyExtractor={item => item._id}
                            />
                        }


                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    topleftView: {
        paddingLeft: responsiveHeight(3)
    },
    searchView: {
        paddingLeft: responsiveHeight(3),
        flexDirection: 'row',
        paddingRight: responsiveHeight(3),
        marginTop: responsiveHeight(2),
        width: windowWidth,
        height: responsiveHeight(10)
    },
    serchViewinside: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: "#234e46",
        height: 64,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    textinput: {
        paddingLeft: responsiveWidth(2),
        width: '80%',
        color: 'white',
    },
    uperView: {
        // backgroundColor: '',
        height: windowHeight / 2.7,
        width: windowWidth,
    },
    cardView: {
        backgroundColor: 'white',
        width: windowWidth - 20,
        alignSelf: 'center',
        //height: windowHeight / 2,
        borderRadius: 15,
        marginTop: responsiveHeight(2),
    },
    uperButtons: {
        backgroundColor: '#234e46', 
        width: responsiveHeight(9.5),
        height: responsiveHeight(5), 
        justifyContent: 'center', borderRadius: 8
    },
    uperButtons1: {
        width: responsiveHeight(9.5),
        height: responsiveHeight(5), 
        justifyContent: 'center',
    },
    uperButtonText: {
        textAlign: 'center',
        fontSize: 14,
        color: 'white', fontWeight: '600',
    },
    uperButtonText1: {
        textAlign: 'center',
        fontSize: 14,
        color: '#C6CEDD', 
        fontWeight: '600',
        //fontFamily:'Poppins_900Black'
    },
    lowerCardView: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginBottom: responsiveHeight(1),
        marginTop: responsiveHeight(1)
    }

});
