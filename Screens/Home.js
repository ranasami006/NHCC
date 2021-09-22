import React, { Component } from 'react';
import {
    Animated,
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
    ToastAndroid,

} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HTMLView from 'react-native-htmlview';
// import * as Font from 'expo-font';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { StatusBar } from 'expo-status-bar';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { getAllTickets, getAllOpenTickets } from './backend/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PagerView from 'react-native-pager-view';
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
import { ThemeConsumer } from 'react-native-elements';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loader: true,
            secured: true,
            lat: '',
            lng: '',
            facebookFile: '',
            googleFile: '',
            isSelected: false,
            pageIndex: 0,
            allTickets: [],
            allTicketsData: [],
            opened: [],
            closed: [],
            reopened: [],
            solved: [],
            fontsLoaded: false,
            offset: 1,
            offsetOpen: 1,
            offsetclose: 1,
            offsetreopen: 1,
            loadingList: false,
            loading: false,
            offsetsolve: 1,
            endValue: true,
            filter: '',
            index: 0,
            routes: [
                { key: 'all', title: 'All' },
                { key: 'opened', title: 'Opened' },
                { key: 'closed', title: 'closed' },
                { key: 'reopend', title: 'Reopened' },
                { key: 'solved', title: 'Solved' },
            ],
        };
        this.arrayholder = [];
        this.onEndReachedCalledDuringMomentum = true;
    }

    logOut = () => {
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
    async functionNavigation(item) {
        //BackHandler.removeEventListener('hardwareBackPress',)
        this.backHandler.remove();
        this.props.navigation.navigate('ConstTicketDetail',
            {
                screen: 'TicketDetail',
                params:
                {
                    data: item._id,
                    page: 0,
                }
            })
    }

    async goToComment(item) {
        this.backHandler.remove();
        //BackHandler.removeEventListener('hardwareBackPress' )
        this.props.navigation.navigate('ConstTicketDetail',
            {
                screen: 'TicketComments',
                params:
                    { ticket_id: item._id }
            })
    }
    async logmeOut() {
        await AsyncStorage.removeItem('accessToken'),
            await AsyncStorage.removeItem('refreshToken')
        await AsyncStorage.removeItem('userData')
        this.props.navigation.replace('AuthNavigator', { screen: 'Login' });
        // this.props.navigation.navigate('Login')

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

    onEndReached = ({ distanceFromEnd }) => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.setState({ loading: true })
            this.getData();
            this.onEndReachedCalledDuringMomentum = true;
        }
    }
    onEndReachedOpen = ({ distanceFromEnd }) => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.getOpenData();
            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    onEndReachedClose = ({ distanceFromEnd }) => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.getCloseData();
            this.onEndReachedCalledDuringMomentum = true;
        }
    }
    onEndReachedReopen = ({ distanceFromEnd }) => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.getReopenData();
            this.onEndReachedCalledDuringMomentum = true;
        }
    }
    onEndReachedSolve = ({ distanceFromEnd }) => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.getsolveData();
            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    async getOpenData() {
        this.setState({ loading: true })
        let { opened } = this.state
        // console.log("Loading ", this.state.offsetOpen)
        let data1 = await getAllOpenTickets(this.state.offsetOpen, 'opened')
        // console.log("Loading ", data1.pagination.data)
        let result1 = [];
        if (data1.pagination) {
            //  result1 = this.state.opened.concat(data1.pagination.data);
            Array.prototype.push.apply(opened, data1.pagination.data);
            await this.setState({
                //allTickets: data1.pagination,
                opened,
                offsetOpen: this.state.offsetOpen + 1,
                value: '',
                searchTxt: '',
            })
        }
        else {
            alert(data1.message)
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('refreshToken')
            this.props.navigation.navigate('AuthLoading')
        }
        //  this.setState({ loading: false })
    }
    async getCloseData() {
        this.setState({ loading: true })
        let { closed } = this.state
        // console.log("Loading ", this.state.offsetclose)
        let data1 = await getAllOpenTickets(this.state.offsetclose, 'closed')
        //  console.log("Loading ", data1.pagination.data)
        let result1 = [];
        if (data1.pagination) {
            //  result1 = this.state.closed.concat(data1.pagination.data);
            Array.prototype.push.apply(closed, data1.pagination.data);
            await this.setState({
                // allTickets: data1.pagination,
                closed,
                offsetclose: this.state.offsetclose + 1,

                value: '',
                searchTxt: '',
            })

            // console.log
            //     (result1.length, "Test close tickt",
            //         this.state.closed.length)
        }
        else {
            alert(data1.message)
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('refreshToken')
            this.props.navigation.navigate('AuthLoading')
        }
        //   this.setState({ loading: false })
    }
    async getReopenData() {
        this.setState({ loading: true })
        let { reopened } = this.state
        // console.log("Loading ", this.state.offsetreopen)
        let data1 = await getAllOpenTickets(this.state.offsetreopen, 'reopened')
        //console.log("Loading ", data1.pagination.data)
        let result1 = [];
        if (data1.pagination) {
            // result1 = this.state.reopened.concat(data1.pagination.data);
            Array.prototype.push.apply(reopened, data1.pagination.data);
            await this.setState({
                // allTickets: data1.pagination,
                reopened,
                offsetreopen: this.state.offsetreopen + 1,
                value: '',
                searchTxt: '',
            })

            // console.log
            //     (result1.length, "Test reopen tickt",
            //         this.state.reopened.length)
        }
        else {
            alert(data1.message)
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('refreshToken')
            this.props.navigation.navigate('AuthLoading')
        }
        //  this.setState({ loading: false })
    }
    async getsolveData() {
        this.setState({ loading: true })
        let { solved } = this.state
        // console.log("Loading ", this.state.offsetsolve)
        let data1 = await getAllOpenTickets(this.state.offsetsolve, 'solved')
        //console.log("Loading ",data1.pagination.data)
        let result1 = [];
        if (data1.pagination) {
            //result1 = this.state.solved.concat(data1.pagination.data);
            Array.prototype.push.apply(solved, data1.pagination.data);
            await this.setState({
                // allTickets: data1.pagination,
                solved,
                offsetsolve: this.state.offsetsolve + 1,
                value: '',
                searchTxt: '',
            })
        }
        else {
            alert(data1.message)
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('refreshToken')
            this.props.navigation.navigate('AuthLoading')
        }
        this.setState({ loading: false })
    }


    async getData() {
        this.setState({ loading: true })
        let { allTicketsData } = this.state
        let data1 = await getAllTickets(this.state.offset, this.state.filter)

        let result1 = [];
        if (data1.pagination) {
            //result1 = this.state.allTicketsData.concat(data1.pagination.data);
            Array.prototype.push.apply(allTicketsData, data1.pagination.data);
            //  console.log("filter ",data1.pagination.data)
            // result2 = this.state.allTickets.concat(data1.pagination);
            await this.setState({
                // allTickets,
                allTicketsData,
                offset: this.state.offset + 1,
                loader: false,
                value: '',
                searchTxt: '',
            })

            console.log
                ("Test ALL Tickets",
                    this.state.allTicketsData[0].priority_id)
        }
        else {
            alert(data1.message)
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('refreshToken')
            this.props.navigation.navigate('AuthLoading')
        }
        //  this.setState({ loading: false })
    }

    async loadData() {
       
       
        
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        this.setState({ loader: true })

        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
            this.setState({ displayMessage: 'Good Morning !' })
        } else if (curHr < 18) {
            this.setState({ displayMessage: 'Good Afternoon !' })
        } else {
            this.setState({ displayMessage: 'Good Evening !' })
        }
        let userdata = await AsyncStorage.getItem('userData')
        let userdata1 = JSON.parse(userdata)

        this.setState({
            username: userdata1.user.name,
            pageIndex: 0,
            allTickets: [],
            allTicketsData: [],
            opened: [],
            closed: [],
            reopened: [],
            solved: [],
            offset: 1,
            offsetOpen: 1,
            offsetclose: 1,
            offsetreopen: 1,
            offsetsolve: 1,
        })
        this.getData()
        this.getOpenData()
        this.getCloseData()
        this.getReopenData()
        this.getsolveData()

    }


    setSelection = () => {
        this.setState({ isSelected: !this.state.isSelected })
    }
    renderFooter = () => {
        return (
            //Footer View with Loader
            <View style={styles.footer}>
                {
                    this.state.loading ? (
                        <ActivityIndicator color={'#0F493C'}
                            size={'large'}
                            style={{ justifyContent: 'center', alignContent: 'center' }}>
                        </ActivityIndicator>
                    ) :
                        null
                }
            </View>
        );
    };

    renderCartItem = ({ item, index }) => {

        return (
            <View
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
                    <Entypo name="dots-three-horizontal" 
                    size={25} color="#104F40" />
                </View>
                <TouchableOpacity
                    onPress={() =>
                        this.functionNavigation(item)
                    }
                >

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
                </TouchableOpacity>

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
                            backgroundColor: item.status_id == 'opened' ?
                                '#dcf4e5' : item.status_id == 'closed' ?
                                    '#fce6e4' : item.status_id == 'reopend' ?
                                        '#16B455' : '#c9f7f5',
                            borderRadius: 8,
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                alignSelf: 'center',
                                color: item.status_id == 'opened' ?
                                    '#16B455' : item.status_id == 'closed' ?
                                        '#EB564C' : item.status_id == 'reopend' ?
                                            'white' : '#229468',
                                fontSize: responsiveFontSize(2),
                                fontWeight: '600',
                                //fontFamily: this.state.fontsLoaded?'PoppinsBold':null
                            }}>{item.status_id}</Text>
                        </TouchableOpacity>

                        {
                             
                            item.priority_id && item.priority_id.length>0 ?
                              
                                <TouchableOpacity style={{
                                    width: responsiveHeight(13),
                                    height: responsiveHeight(5.5),
                                    borderColor:
                                        item.priority_id == 'Medium' ?
                                            '#c9f7f5' : item.priority_id == 'low' ?
                                                '#229468' : item.priority_id == 'high' ?
                                                    '#E5332A' : '#FFA500'
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
                                        color: item.priority_id == 'Medium' ?
                                            '#c9f7f5' : item.priority_id == 'low' ?
                                                '#229468' : item.priority_id == 'high' ?
                                                    '#E5332A' : '#FFA500',
                                        fontSize: responsiveFontSize(2), fontWeight: '600'
                                    }}>{item.priority_id}</Text>
                                </TouchableOpacity>
                                : null}
                    </View>
                    <View

                        style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image style={{ alignSelf: 'center', width: 15, height: 15 }}
                            source={require('../assets/Plus.png')}></Image>
                        <TouchableOpacity
                            style={{ alignSelf: 'center' }}
                            onPress={() => {
                                this.goToComment(item)
                                // this.props.navigation.navigate('TicketComments', { ticket_id: item._id })
                            }}
                        >
                            <Text style={{
                                alignSelf: 'center',
                                marginLeft: responsiveHeight(1), color: '#438170',
                                fontSize: responsiveFontSize(1.7), fontWeight: '600'
                            }}>Add Comment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };


    searchFilterFunction = async () => {

        ToastAndroid.show("Search is not active yet", ToastAndroid.SHORT);
        // console.log("TETS")
        // await this.setState({filter:text})
        // console.log("TEST")
        // await this.setState({
        //         allTicketsData: [],
        //         offset:1,
        //         endValue:false
        // }) 

        // this.getData()

        // console.log(this.state.allTickets.data.length,this.state.allTicketsData.length) 
        //    this.setState({
        //         value: text,
        //         searchTxt: text,
        //         endValue: false,
        //     });
        //     if (text.length < 1) {
        //         this.setState({

        //             endValue: true,
        //         });
        //         console.log("If comming")

        //     }
        //     else {
        //         this.setState({

        //             endValue: false,
        //         });

        //     }


        //    if (this.state.pageIndex === 0) {
        //      this.arrayholder= this.state.allTickets.data
        //   console.log("HI PaK",this.arrayholder)
        // const newData = this.arrayholder.filter(item => {
        //     const itemData = item.ticketId.toString();
        //     const textData = text.toString();
        //     return itemData.indexOf(textData) > -1;
        // });
        // this.setState({
        //     allTicketsData: newData,
        // });
        //    }
        //this.pager.setPageWithoutAnimation(this.state.pageIndex)

    };
    handleCheckbox = (event) => {
        event.persist();
        const { position } = event.nativeEvent;
        this.setState({
            pageIndex: position
        })
        //  console.log("Current page index", e.nativeEvent)
    }


    // _renderTabBar = (props) => {
    //     const inputRange = props.navigationState.routes.map((x, i) => i);
    
    //     return (
    //       <View style={styles.tabBar}>
    //         {props.navigationState.routes.map((route, i) => {
    //           const opacity = props.position.interpolate({
    //             inputRange,
    //             outputRange: inputRange.map((inputIndex) =>
    //               inputIndex === i ? 1 : 0.5
    //             ),
                
    //           });
    //            const bcolor = props.position.interpolate({
    //             inputRange,
    //             outputRange: inputRange.map((inputIndex) =>
    //               inputIndex === i ? 'red' : 'white'
    //             ),
                
    //           });
    
    //           return (
    //             <TouchableOpacity
    //               style={styles.tabItem}
    //               onPress={() => this.setState({ index: i })}>
    //               <Animated.Text style={{ opacity,backgroundColor:bcolor,width:60,height:30 }}>{route.title}</Animated.Text>
    //             </TouchableOpacity>
    //           );
    //         })}
    //       </View>
    //     );
    //   };
   
    _renderTabBar = (props) => {

        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            
            <LinearGradient
                // Button Linear Gradient
                colors={['#104F40', '#0C3B31', '#104F40']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.button}>
                <View style={styles.tabBar}>
                    {
                    props.navigationState.routes.map((route, i) => {
                        
                        console.log( "TAB+",i,props.navigationState.routes)
                        const opacity = props.position.interpolate({
                            inputRange,
                            outputRange: inputRange.map((inputIndex) =>
                                inputIndex === i ? 1 : 0.3
                            ),
                        });
                        const bcolor = props.position.interpolate({
                            inputRange,
                            outputRange: inputRange.map((inputIndex) =>
                              inputIndex === i ? 'red' : 'transparent'
                            ),
                          });
                        return (
                            <TouchableOpacity
                                style={styles.tabItem}
                                onPress={() => this.setState({ index: i })}
                            >
                                <Animated.View           
                                style={{
                                    width: '80%',
                                    height: 40,
                                    //backgroundColor: '#234e46',
                                    //backgroundColor: bcolor,
                                    opacity,
                                    borderRadius: 10,
                                    alignSelf: 'center',
                                    justifyContent:'center'
                                }}>
                                    <Animated.Text style={{
                                        //backgroundColor,
                                        color: 'white',
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        // color:bcolor,
                                        fontSize: 14,
                                        marginTop: responsiveHeight(1.5)
                                    }}>{route.title}</Animated.Text>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </LinearGradient>
        );
    };


    render() {
        return (
            // <SafeAreaView style={{ flex: 1 }}>
              
                <View style={styles.container}>
                     <StatusBar style="light" />
                    {/* <ScrollView style={{ marginBottom: responsiveHeight(0) }}> */}
                    {/* <ChatTopBar /> */}
                    <View style={styles.uperView}>
                        <ImageBackground source={require('../assets/RectangleHome.png')}
                            style={{ height: '100%', width: '100%' }}>
                            <TouchableOpacity onPress={() => this.logOut()}>
                                <Image style={{
                                    alignSelf: 'flex-end',
                                    marginTop: responsiveHeight(5),
                                    width: 30,
                                    height: 30,
                                    marginRight: responsiveHeight(3),
                                }}
                                    source={require('../assets/Category.png')}>
                                </Image>
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
                                        value={this.state.filter}
                                        onChangeText={
                                            (text) => {
                                                this.setState({ filter: text }),
                                                    this.searchFilterFunction()
                                            }
                                        }
                                    />
                                    <TouchableOpacity style={{
                                        width: 40, height: 40,
                                        backgroundColor: '#438170', borderRadius: 15,
                                        justifyContent: 'center'
                                    }}
                                        onPress={() => { this.searchFilterFunction() }}
                                    >
                                        <Image style={{ alignSelf: 'center' }}
                                            source={require('../assets/Search.png')}></Image>
                                    </TouchableOpacity>
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
                            {/* Tabs */}
                            {/* <View style={{
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
                                            // allTicketsData: this.state.allTickets.data
                                        })
                                        this.pager.setPage(0);

                                    }}
                                >
                                    <Text style={this.state.pageIndex === 0 ?
                                        styles.uperButtonText : styles.uperButtonText1}>All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.pageIndex === 1 ? styles.uperButtons : styles.uperButtons1}
                                    onPress={async () => {

                                        await this.setState({
                                            pageIndex: 1,
                                            //allTicketsData: this.state.opened
                                        })
                                        this.pager.setPage(1);
                                    }}
                                >
                                    <Text style={this.state.pageIndex === 1 ?
                                        styles.uperButtonText : styles.uperButtonText1}>Opened</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.pageIndex === 2 ? styles.uperButtons : styles.uperButtons1}
                                    onPress={async () => {
                                        await this.setState({
                                            pageIndex: 2,
                                            //allTicketsData: this.state.closed
                                        })
                                        this.pager.setPage(2);

                                    }}
                                >
                                    <Text style={this.state.pageIndex === 2 ?
                                        styles.uperButtonText : styles.uperButtonText1}>Closed</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.pageIndex === 3 ? styles.uperButtons : styles.uperButtons1}
                                    onPress={async () => {
                                        await this.setState({
                                            pageIndex: 3,
                                            // allTicketsData: this.state.reopened
                                        })
                                        this.pager.setPage(3);

                                    }}
                                >
                                    <Text style={this.state.pageIndex === 3 ?
                                        styles.uperButtonText : styles.uperButtonText1}>Reopened</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.pageIndex === 4
                                    ? styles.uperButtons : styles.uperButtons1}
                                    onPress={async () => {
                                        await this.setState({
                                            pageIndex: 4,
                                            // allTicketsData: this.state.solved
                                        })
                                        this.pager.setPage(4);
                                    }}
                                >
                                    <Text style={this.state.pageIndex === 4 ?
                                        styles.uperButtonText : styles.uperButtonText1}>Solved</Text>
                                </TouchableOpacity>
                            </View> */}

                        </ImageBackground>
                    </View>
                    <TabView
                         navigationState={this.state}
                        renderScene={SceneMap({
                            all: () => (
                                <FlatList
                                    data={this.state.allTicketsData}
                                    renderItem={this.renderCartItem}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.state.endValue ? this.onEndReached.bind(this) : null}
                                    onEndReachedThreshold={0.5}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                    keyExtractor={(item, index) => item._id + index}
                                />
                            ),
                            opened: () => (
                                <FlatList
                                    data={this.state.opened}
                                    renderItem={this.renderCartItem}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.state.endValue ? this.onEndReached.bind(this) : null}
                                    onEndReachedThreshold={0.5}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                    keyExtractor={(item, index) => item._id + index}
                                />
                            ),
                            closed: () => (
                                <FlatList
                                    data={this.state.closed}
                                    renderItem={this.renderCartItem}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.state.endValue ? this.onEndReached.bind(this) : null}
                                    onEndReachedThreshold={0.5}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                    keyExtractor={(item, index) => item._id + index}
                                />
                            ),
                            reopend: () => (
                                <FlatList
                                    data={this.state.reopened}
                                    renderItem={this.renderCartItem}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.state.endValue ? this.onEndReached.bind(this) : null}
                                    onEndReachedThreshold={0.5}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                    keyExtractor={(item, index) => item._id + index}
                                />
                            ),
                            solved: () => (
                                <FlatList
                                    data={this.state.solved}
                                    renderItem={this.renderCartItem}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.state.endValue ? this.onEndReached.bind(this) : null}
                                    onEndReachedThreshold={0.5}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                    keyExtractor={(item, index) => item._id + index}
                                />
                            ),
                        })}
                        onIndexChange={index => this.setState({ index })}

                        renderTabBar={this._renderTabBar}
                        indicatorStyle={{ backgroundColor: 'blue', height: 2 }}
                    />
                    {/* </ScrollView> */}

                </View>
            // </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    PagerView: {
        flex: 1,
    },
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
        height: windowHeight / 3.2,
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
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: responsiveHeight(0.5)
    },

    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0C3B31',
        //paddingTop: Constants.statusBarHeight,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: responsiveHeight(2.5),
    },

});
