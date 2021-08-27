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
    FlatList,
    ToastAndroid,
    AlertIOS,
    ActivityIndicator, Alert
    , BackHandler,
    TouchableWithoutFeedback,

}

    from 'react-native';
// Digitum liveagent 

import { StatusBar } from 'expo-status-bar';

import HTMLView from 'react-native-htmlview';
import HTML from "react-native-render-html";
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import Timeline from 'react-native-timeline-flatlist'
import { ticket_show, status_update_tickets,delteComment } from '../backend/api';
import Moment from 'moment';
import PagerView from 'react-native-pager-view';
export default class TicketDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.route.params.data,

            email: '',
            password: '',
            loader: false,
            secured: true,
            lat: '',
            lng: '',
            facebookFile: '',
            googleFile: '',
            isSelected: false,
            pageIndex: this.props.route.params.page,
            modalVisible: false,
            modalVisible1: false,
            modalVisible2: false,
            ticketData: [],
            status_id: '',
            commentText:'',

            data: [
                {
                    title: 'Due Date',
                    description: 'Sun, Apr 25, 2021 10:52 AM',
                    icon: require('../../assets/Ellipse90.png')
                },
            ],
        }

        this.setTextareaRef = element => {
            this.textarea = element;
        };




    };
    async componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress')
        //this.backHandler.remove()
        this.loadData();
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.loadData();
        });
    }

    async loadData() {
        this.setState({ loader: true })
        let ticketData1 = await ticket_show(this.state._id)
        const { data } = this.state

        //console.log("OKK K K ", ticketData1.data.history.length)
        data[0].description = ticketData1.data.duedate

        ticketData1.data.history.map((item, index) => {
            data.push({ title: item.action, description: item.updated_at })
        });

        data.push({ title: 'created_at', description: ticketData1.data.created_at })
        //  data[lengthHistory].description = ticketData1.data.created_at

        await this.setState({
            data
        })

        await this.setState({
            ticketData: ticketData1.data,

            loader: false
        })
        console.log(this.state.ticketData.teams_relation)
        this.pager.setPage(this.state.pageIndex)
    }

    async delteCommentFun(){
        let ticket_ids = []
        ticket_ids[0] = this.state._id
        
        let { data } = this.state
        data = []
        let response = await delteComment(this.state.comment_id)
        if (response.status = 'success') {
            this.setState({ loader: true })
            console.log(response)
            if (Platform.OS === 'android') {
                ToastAndroid.show(response.message, ToastAndroid.LONG);
            } else {
                alert(response.message);
            }
            let ticketData1 = await ticket_show(this.state._id)
            data.push({ title: 'Due Date', description: ticketData1.data.duedate })
            ticketData1.data.history.map((item, index) => {
                data.push({ title: item.action, description: item.updated_at })
            });

            data.push({ title: 'created_at', description: ticketData1.data.created_at })

            await this.setState({ 
                data,
                ticketData: ticketData1.data,
                modalVisible:false,
                loader: false
            })
            this.pager.setPage(3)
        }
        else {
            console.log('False error')
        }
    }

    async statusUpdate() {
        let ticket_ids = []
        ticket_ids[0] = this.state._id
        
        let { data } = this.state
        data = []
        if(this.state.commentText){  
        let response = await status_update_tickets(this.state.status_id, ticket_ids,this.state.commentText)
        if (response.status = 'success') {
            this.setState({ loader: true,})
            console.log(response)
            if (Platform.OS === 'android') {
                ToastAndroid.show(response.message, ToastAndroid.LONG);
            } else {
                alert(response.message);
            }
            let ticketData1 = await ticket_show(this.state._id)
            data.push({ title: 'Due Date', description: ticketData1.data.duedate })
            ticketData1.data.history.map((item, index) => {
                data.push({ title: item.action, description: item.updated_at })
            });
            data.push({ title: 'created_at', description: ticketData1.data.created_at })
            await this.setState({
                data,
                ticketData: ticketData1.data,
                modalVisible2:false,
                loader: false,
                commentText:''
            })
            this.pager.setPage(3)
        }
        else {
            console.log('False error')
        }
    }
    else{
        alert('please type some valueable comments')
    }
    }


    handleCheckbox = (event) => {
        event.persist();
        const { position } = event.nativeEvent;
        this.setState({
            pageIndex: position
        })
        //  console.log("Current page index", e.nativeEvent)
    }

    render() {
        //  this.pager.setPage(this.state.pageIndex);
        return (

            <View style={{ flex: 1 }}>
                {/* <StatusBar barStyle="light-content" />  */}
                {
                    this.state.loader ?
                        <ActivityIndicator size={'large'} color={'green'} style={{
                            alignSelf: 'center',
                            marginTop: responsiveHeight(10)
                        }}>
                            
                        </ActivityIndicator>
                        :
                        <View style={styles.container}
                            blurRadius={this.state.modalVisible || this.state.modalVisible2 || this.state.modalVisible1 ? 4 : 0}
                        >
                            <Modal
                                animationType="slide"
                                transparent={true}

                                visible={this.state.modalVisible2}
                                onRequestClose={() => {
                                    this.setState({ modalVisible2: false })
                                }}>

                                <TouchableWithoutFeedback
                                    onPress={() => this.setState({ modalVisible2: false })}>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            backgroundColor: 'transparent',
                                        }}
                                    />
                                </TouchableWithoutFeedback>
                                <View style={styles.centeredViewModal2}>
                                    <View style={styles.modalView2}>
                                        <View style={styles.emailView}>
                                            <TextInput
                                                style={styles.textinput}
                                                placeholder={'type comment here'}
                                                placeholderTextColor={'grey'}
                                                //onSubmitEditing={() => this._password.focus()}
                                                returnKeyType="next"
                                                returnKeyLabel="next"
                                                value={this.state.commentText}
                                                onChangeText={(text) => {
                                                    this.setState({ commentText: text });
                                                }}
                                            />
                                        </View>
                                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                                        <TouchableOpacity style={styles.loginBtnModal}
                                    onPress={() => { 
                                        this.statusUpdate()             
                                        }}>
                                    {this.state.loader ?
                                        <ActivityIndicator color={'#0F493C'}
                                            size={'large'}></ActivityIndicator>
                                        :
                                        <Text style={{
                                            alignSelf: 'center', color: 'white',
                                            fontWeight: '600', fontSize: 16, lineHeight: 28
                                        }}>
                                            Confirm
                                        </Text>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancleBtnModal}
                                    onPress={() => { 
                                        this.setState({modalVisible2:false})
                                        }}>
                                    {this.state.loader ?
                                        <ActivityIndicator color={'#0F493C'}
                                            size={'large'}></ActivityIndicator>
                                        :
                                        <Text style={{
                                            alignSelf: 'center', color: '#9B945F',
                                            fontWeight: '600', fontSize: 16, lineHeight: 28
                                        }}>
                                            Cancel
                                        </Text>
                                    }
                                </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            <Modal
                                animationType="slide"
                                transparent={true}

                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    this.setState({ modalVisible: false })
                                }}>

                                <TouchableWithoutFeedback
                                    onPress={() => this.setState({ modalVisible: false })}>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            backgroundColor: 'transparent',
                                        }}
                                    />
                                </TouchableWithoutFeedback>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity onPress={() => 
                                            { 
                                                this.setState({ modalVisible: false }) }}>
                                            <Image style={{ alignSelf: 'flex-end' }}
                                                source={require('../../assets/Close.png')}></Image>
                                        </TouchableOpacity>
                                       
                                        <TouchableOpacity 
                                        onPress={()=>{
                                            this.delteCommentFun()
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            marginLeft: responsiveHeight(3),
                                            marginTop: responsiveHeight(2)
                                        }}>
                                            <Image style={{ alignSelf: 'center' }}
                                                source={require('../../assets/Delete.png')}></Image>
                                            <Text style={styles.modalText}>Delete Comment</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </Modal>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible1}
                                onRequestClose={() => {
                                    // Alert.alert('Modal has been closed.');
                                    this.setState({ modalVisible1: false })
                                }}>
                                <TouchableWithoutFeedback
                                    onPress={() => this.setState({ modalVisible1: false })}>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            backgroundColor: 'transparent',
                                        }}
                                    />
                                </TouchableWithoutFeedback>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity onPress={
                                            () => { this.setState({ modalVisible1: false }) }}>
                                            <Image style={{ alignSelf: 'flex-end' }}
                                                source={require('../../assets/Close.png')}></Image>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ modalVisible1: false })
                                                this.props.navigation.navigate('TicketComments', { ticket_id: this.state._id })
                                            }}
                                            style={{ flexDirection: 'row', marginLeft: responsiveHeight(3), }}>
                                            <Image style={{ alignSelf: 'center' }}
                                                source={require('../../assets/EditSquare.png')}></Image>
                                            <Text style={styles.modalText}>Add Comment</Text>
                                        </TouchableOpacity>

                                        {

                                            this.state.ticketData.status_id == 'solved' ?
                                                <>
                                                    <TouchableOpacity style={{
                                                        flexDirection: 'row',
                                                        marginLeft: responsiveHeight(3),
                                                        marginTop: responsiveHeight(2)
                                                    }}
                                                        onPress={
                                                            async () => {
                                                                await this.setState({ modalVisible1: false, status_id: 'closed', modalVisible2: true })
                                                                //this.statusUpdate()
                                                            }}
                                                    >
                                                        <Image style={{ alignSelf: 'center', width: 26, height: 26 }}
                                                            source={require('../../assets/CloseSquare.png')}></Image>
                                                        <Text style={styles.modalText}>closed</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{
                                                        flexDirection: 'row',
                                                        marginLeft: responsiveHeight(3),
                                                        marginTop: responsiveHeight(2)
                                                    }}
                                                        onPress={
                                                            async () => {
                                                                await this.setState({ modalVisible1: false, status_id: 'reopened', modalVisible2: true })
                                                                // this.statusUpdate()
                                                            }}
                                                    >
                                                        <Image style={{ alignSelf: 'center', width: 25, height: 26 }}
                                                            source={require('../../assets/ReOpen.png')}></Image>
                                                        <Text style={styles.modalText}>Re-Open</Text>
                                                    </TouchableOpacity>


                                                </>
                                                :
                                                this.state.ticketData.status_id == 'opened' ?
                                                    <>
                                                        <TouchableOpacity style={{
                                                            flexDirection: 'row',
                                                            marginLeft: responsiveHeight(3),
                                                            marginTop: responsiveHeight(2)
                                                        }}
                                                            onPress={
                                                                async () => {
                                                                    await this.setState({
                                                                        modalVisible1: false,
                                                                        status_id: 'closed',
                                                                        modalVisible2: true
                                                                    })
                                                                    //this.statusUpdate()
                                                                }}
                                                        >
                                                            <Image style={{ alignSelf: 'center', width: 26, height: 26 }}
                                                                source={require('../../assets/CloseSquare.png')}></Image>
                                                            <Text style={styles.modalText}>closed</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{
                                                            flexDirection: 'row',
                                                            marginLeft: responsiveHeight(3),
                                                            marginTop: responsiveHeight(2)
                                                        }}
                                                            onPress={
                                                                async () => {
                                                                    await this.setState({
                                                                        modalVisible1: false,
                                                                        status_id: 'solved',
                                                                        modalVisible2: true
                                                                    })
                                                                    //this.statusUpdate()
                                                                }}
                                                        >
                                                            <Image style={{ alignSelf: 'center', width: 26, height: 26 }}
                                                                source={require('../../assets/TickSquare.png')}></Image>
                                                            <Text style={styles.modalText}>solved</Text>
                                                        </TouchableOpacity>


                                                    </>
                                                    :
                                                    this.state.ticketData.status_id == 'closed' ?
                                                        <TouchableOpacity style={{
                                                            flexDirection: 'row',
                                                            marginLeft: responsiveHeight(3),
                                                            marginTop: responsiveHeight(2)
                                                        }}
                                                            onPress={
                                                                async () => {
                                                                    await
                                                                        this.setState({
                                                                            modalVisible1: false,
                                                                            status_id: 'reopened',
                                                                            modalVisible2: true
                                                                        })
                                                                    // this.statusUpdate()
                                                                }}
                                                        >
                                                            <Image style={{ alignSelf: 'center', width: 26, height: 26 }}
                                                                source={require('../../assets/ReOpen.png')}></Image>
                                                            <Text style={styles.modalText}>Re-Open</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        this.state.ticketData.status_id == 'reopened' ?
                                                            <>
                                                                <TouchableOpacity style={{
                                                                    flexDirection: 'row',
                                                                    marginLeft: responsiveHeight(3),
                                                                    marginTop: responsiveHeight(2)
                                                                }}
                                                                    onPress={
                                                                        async () => {
                                                                            await this.setState({ modalVisible1: false, status_id: 'closed', modalVisible2: true })
                                                                            // this.statusUpdate()
                                                                        }}

                                                                >
                                                                    <Image style={{ alignSelf: 'center', width: 26, height: 26 }}
                                                                        source={require('../../assets/CloseSquare.png')}></Image>
                                                                    <Text style={styles.modalText}>closed</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={{
                                                                    flexDirection: 'row',
                                                                    marginLeft: responsiveHeight(3),
                                                                    marginTop: responsiveHeight(2)
                                                                }}
                                                                    onPress={
                                                                        async () => {
                                                                            await this.setState({
                                                                                modalVisible1: false, status_id: 'solved',
                                                                                modalVisible2: true
                                                                            })
                                                                            //this.statusUpdate()
                                                                        }}
                                                                >
                                                                    <Image style={{ alignSelf: 'center', width: 26, height: 26 }}
                                                                        source={require('../../assets/TickSquare.png')}></Image>
                                                                    <Text style={styles.modalText}>solved</Text>
                                                                </TouchableOpacity>
                                                            </>
                                                            : null
                                        }

                                    </View>
                                </View>

                            </Modal>


                            {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }} 
                            nestedScrollEnabled={true}
                            style={{ paddingVertical: 0, }}> */}

                            <View style={styles.uperView}>
                                <ImageBackground source={require('../../assets/RectangleHome.png')}
                                    style={{ height: '100%', width: '100%' }}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate("Home")
                                    }}>
                                        <Image style={{
                                            alignSelf: 'flex-start',
                                            marginTop: responsiveHeight(7),
                                            width: 30, height: 30,
                                            marginLeft: responsiveHeight(3)
                                        }}
                                            source={require('../../assets/ArrowLeftSquare.png')}></Image>
                                    </TouchableOpacity>
                                    <View style={styles.TopSecondView}>
                                        <View style={styles.topleftView}>
                                            <Text style={{
                                                color: '#F2F3FD',
                                                fontWeight: '700',
                                                fontSize: responsiveFontSize(2),
                                            }}>{this.state.ticketData.subject}</Text>
                                            {/* <Text style={{
                                                    color: '#D0D3E8',
                                                    fontWeight: '400',
                                                    fontSize: 15
                                                }}>{this.state.item.ticketId}</Text> */}
                                        </View>

                                        <TouchableOpacity style={[
                                            styles.uperButtons, {
                                                marginTop: responsiveHeight(2),
                                                height: responsiveHeight(6)
                                            }]}
                                            onPress={() => {
                                                this.setState({ pageIndex: 0 })
                                            }}
                                        >
                                            <Text style={styles.uperButtonText}>{this.state.ticketData.status_id}</Text>
                                        </TouchableOpacity>

                                    </View>



                                    <View style={{
                                        alignSelf: 'center', flexDirection: 'row',
                                        width: '90%',
                                        marginTop: responsiveHeight(1.5),
                                        justifyContent: 'space-around',
                                        position: 'absolute',
                                        bottom: 15,
                                    }}>
                                        <TouchableOpacity
                                            style={this.state.pageIndex === 0 ? styles.uperButtons : styles.uperButtons1}
                                            onPress={() => {
                                                this.setState({ pageIndex: 0 })
                                                this.pager.setPage(0);
                                            }}
                                        >
                                            <Text style={this.state.pageIndex == 0 ?
                                                styles.uperButtonText : styles.uperButtonText1}>Details</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.pageIndex === 1 ? styles.uperButtons : styles.uperButtons1}
                                            onPress={() => {
                                                this.setState({ pageIndex: 1 })
                                                this.pager.setPage(1);
                                            }}
                                        >
                                            <Text style={this.state.pageIndex == 1 ?
                                                styles.uperButtonText : styles.uperButtonText1}>Info</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.pageIndex === 2 ? styles.uperButtons : styles.uperButtons1}
                                            onPress={() => {
                                                this.setState({ pageIndex: 2 })
                                                this.pager.setPage(2);
                                            }}
                                        >
                                            <Text style={this.state.pageIndex == 2 ?
                                                styles.uperButtonText : styles.uperButtonText1}>Timeline</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.pageIndex === 3 ? styles.uperButtons : styles.uperButtons1}
                                            onPress={() => {
                                                this.setState({ pageIndex: 3 })
                                                this.pager.setPage(3);
                                            }}
                                        >
                                            <Text style={this.state.pageIndex == 3 ?
                                                styles.uperButtonText : styles.uperButtonText1}>Comments</Text>
                                        </TouchableOpacity>
                                    </View>

                                </ImageBackground>


                            </View>


                            <PagerView
                                ref={c => { this.pager = c; }}
                                initialPage={2}
                                scrollEnabled={true}

                                onPageSelected={
                                    event => this.handleCheckbox(event)
                                }

                                //setPage={this.state.pageIndex}
                                style={styles.PagerView}  >

                                <View key="1">
                                    <ScrollView>
                                        <View style={styles.topViewLower}>

                                            {/* <View style={{ flexDirection: 'row', }}>
                                                <Image style={{ margin: responsiveHeight(2) }} source={require('../../assets/AttachmentPic.png')}></Image>
                                                <Text style={{ marginTop: responsiveHeight(2), color: '#6E7191' }}> Attachments</Text>
                                            </View>
                                            <View style={styles.galleryView}>
                                                <Image
                                                    style={{ width: 50, height: 50 }}
                                                    source={require('../../assets/placeholder.png')}>

                                                </Image>
                                                <Image
                                                    style={{ width: 50, height: 50, marginLeft: responsiveHeight(1) }}
                                                    source={require('../../assets/placeholder1.png')}>
                                                </Image>
                                                <Image
                                                    style={{ width: 50, height: 50, marginLeft: responsiveHeight(1) }}
                                                    source={require('../../assets/placeholder2.png')}>
                                                </Image>
                                                <Image
                                                    style={{ width: 50, height: 50, marginLeft: responsiveHeight(1) }}
                                                    source={require('../../assets/placeholder3.png')}>
                                                </Image>

                                                <Text style={{
                                                    alignSelf: 'center', color: '#6E7191',
                                                    marginLeft: responsiveHeight(2.5)
                                                }}>+5 More</Text>
                                                <Image
                                                    style={{ width: 40, height: 40, marginLeft: responsiveHeight(0.5), alignSelf: 'center' }}
                                                    source={require('../../assets/MoreCircle.png')}>
                                                </Image>
                                            </View> */}

                                        </View>

                                        <View style={styles.topViewLoweratArabic}>


                                            {/* <Text style={styles.arabicTExt}> */}
                                            <View style={styles.arabicTExt}>
                                                <HTMLView
                                                    value={
                                                        this.state.ticketData.content
                                                    }
                                                    stylesheet={{
                                                        fontSize: 18,
                                                        fontWeight: "400",
                                                        textAlign: 'right',
                                                        margin: responsiveHeight(2),
                                                        lineHeight: 35,
                                                        color: '#000000',
                                                        padding: responsiveHeight(7)
                                                    }}
                                                />
                                                {/* </Text> */}
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>

                                <View key="2" >
                                    <ScrollView>
                                        <View style={[styles.topViewLower, { marginBottom: responsiveHeight(10) }]} >
                                            <View style={styles.lowerViewInner}>
                                                <View>
                                                    <Text style={styles.lowerInnerText}>
                                                        OWNER
                                                    </Text>

                                                    <Text style={styles.headerText}>
                                                        {this.state.ticketData.user ? this.state.ticketData.user.name : null}
                                                    </Text>
                                                    <Text style={[styles.headerText, { fontSize: 12, textDecorationLine: 'underline' }]}>
                                                        {this.state.ticketData.user ? this.state.ticketData.user.email : null}
                                                    </Text>
                                                </View>
                                                <Image
                                                    style={{ alignSelf: 'center', marginRight: responsiveHeight(2) }}
                                                    source={require('../../assets/ProfileHome.png')}>
                                                </Image>
                                            </View>
                                            <View style={styles.innerBasicView}>

                                                <Image
                                                    style={{ alignSelf: 'center', marginRight: responsiveHeight(2), alignSelf: 'center', }}
                                                    source={require('../../assets/ProfileHomeBasic.png')}>
                                                </Image>
                                                <View>
                                                    <Text style={[styles.lowerInnerText, { color: '#6E7191', fontSize: 12, marginTop: 0 }]}>
                                                        RESPONSIBLE
                                                    </Text>

                                                    <Text style={[styles.headerText, { color: 'black', fontSize: 14 }]}>
                                                        {this.state.ticketData.teams_relation && this.state.ticketData.teams_relation.length > 0 ? this.state.ticketData.teams_relation[0].name : null}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.innerBasicView}>

                                                <Image
                                                    style={{ alignSelf: 'center', marginRight: responsiveHeight(2), alignSelf: 'center', }}
                                                    source={require('../../assets/Workicon.png')}>
                                                </Image>
                                                <View>
                                                    <Text style={[styles.lowerInnerText,
                                                    { color: '#6E7191', fontSize: 12, marginTop: 0 }]}>
                                                        ORGANISATION
                                                    </Text>

                                                    <Text style={[styles.headerText, { color: 'black', fontSize: 14 }]}>
                                                        {this.state.ticketData.user ? this.state.ticketData.organization.name : null}
                                                    </Text>
                                                </View>
                                            </View>


                                            {/* <View style={styles.innerBasicView}>

                                        <Image
                                            style={{ alignSelf: 'center', marginRight: responsiveHeight(2), alignSelf: 'center', }}
                                            source={require('../../assets/locationIcon.png')}>
                                        </Image>
                                        <View>
                                            <Text style={[styles.lowerInnerText, { color: '#6E7191', fontSize: responsiveFontSize(1.5), marginTop: 0 }]}>
                                                Region Cluster
                                            </Text>

                                            <Text style={[styles.headerText, { color: 'black', fontSize: responsiveFontSize(2) }]}>
                                                Baha Health Affairs
                                            </Text>
                                        </View>
                                    </View>



                                    <View style={styles.innerBasicView}>

                                        <Image
                                            style={{ alignSelf: 'center', marginRight: responsiveHeight(2), alignSelf: 'center', }}
                                            source={require('../../assets/MessageIcon.png')}>
                                        </Image>
                                        <View>
                                            <Text style={[styles.lowerInnerText, { color: '#6E7191', fontSize: responsiveFontSize(1.5), marginTop: 0 }]}>
                                                Email to
                                            </Text>

                                            <Text style={[styles.headerText, { color: 'black', fontSize: responsiveFontSize(2) }]}>
                                                --
                                            </Text>
                                        </View>
                                    </View> */}


                                            <View style={[styles.innerBasicView, { marginBottom: responsiveHeight(3) }]}>

                                                <Image
                                                    style={{ alignSelf: 'center', marginRight: responsiveHeight(2), alignSelf: 'center', }}
                                                    source={require('../../assets/PaperIcon.png')}>
                                                </Image>
                                                <View>
                                                    <Text style={[styles.lowerInnerText, { color: '#6E7191', fontSize: 12, marginTop: 0 }]}>
                                                        ITEM CODE
                                                    </Text>

                                                    <Text style={[styles.headerText, { color: 'black', fontSize: 14 }]}>
                                                        {this.state.ticketData.user ? this.state.ticketData.ticketId : null}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                                <View key="3">
                                    <ScrollView>
                                        <View style={[styles.topViewLower, { marginBottom: responsiveHeight(9.5) }]}>
                                            <Text style={[styles.lowerInnerText,
                                            {
                                                color: 'black',
                                                fontSize: responsiveFontSize(2.5),
                                                marginTop: responsiveHeight(2), fontWeight: '500', paddingLeft: responsiveHeight(2)
                                            }]}>
                                                Timeline
                                            </Text>
                                            <View
                                                style={{
                                                    width: '100%', borderWidth: 0.4
                                                    , borderColor: '#6E7191',
                                                    marginTop: responsiveHeight(1)
                                                }}
                                            />

                                            <Timeline
                                                style={styles.list}
                                                showTime={false}
                                                separator={false}
                                                data={this.state.data}
                                                circleSize={20}
                                                circleColor='#6E7191'

                                                lineColor='#D0D3E8'
                                                //  timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                                                //timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
                                                titleStyle={{ color: '#6E7191', marginLeft: responsiveHeight(2), marginTop: responsiveHeight(-1.5) }}
                                                descriptionStyle={{ color: 'gray', marginLeft: responsiveHeight(2), marginTop: responsiveHeight(1.5) }}

                                                options={{
                                                    style: {
                                                        marginTop: responsiveHeight(4),
                                                    }
                                                }}
                                                innerCircle={'icon'}
                                            />


                                        </View>
                                    </ScrollView>
                                </View>
                                <View key="4">

                                    {this.state.ticketData.comments && this.state.ticketData.comments.length > 0 ?
                                        <FlatList
                                            style={{ marginBottom: responsiveHeight(9.5) }}
                                            data={this.state.ticketData.comments}
                                            initialScrollIndex={this.state.ticketData.comments.length - 1}
                                            renderItem={({ item, index }) => {
                                                return (

                                                    <View style={styles.commentMainView}>
                                                        <View style={styles.commentView}>
                                                            <View style={{ flexDirection: 'row', width: '55%' }}>
                                                                <View style={styles.imageNameView}>
                                                                    <Text style={[styles.nameComment]}>{item.user.name.substring(0, 2).toUpperCase()}</Text>
                                                                </View>
                                                                <View style={{ alignSelf: 'center', marginLeft: responsiveHeight(1) }}>
                                                                    <Text style={[styles.nameComment, { color: 'black', }]}>{item.user.name}</Text>

                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', width: '45%' }}>
                                                                <View style={{ alignSelf: 'center', marginRight: responsiveHeight(1.5) }}>

                                                                    <Text style={[styles.nameComment, { color: '#6E7191', fontSize: 12 }]}>
                                                                        {
                                                                            Moment(item.created_at).format("MMM D YYYY hh:mm A", true)

                                                                        }
                                                                    </Text>
                                                                </View>

                                                                <TouchableOpacity
                                                                    style={{ alignSelf: 'center', marginRight: responsiveHeight(2) }}
                                                                    onPress={() => {
                                                                        this.setState({
                                                                            modalVisible: true,
                                                                            comment_id:item._id
                                                                        });
                                                        

                                                                    }}>
                                                                    <Image style={{ alignSelf: 'center' }}
                                                                        source={require('../../assets/MoreSquare.png')}></Image>
                                                                </TouchableOpacity>
                                                            </View>

                                                        </View>

                                                        <View style={styles.commentText}>

                                                            <HTML

                                                                source={{ html: item.content }}

                                                            />
                                                            {/* <HTMLView
                                                                            value={
                                                                                item.content
                                                                            }
                                                                            stylesheet={{
                                                                                margin: responsiveHeight(5),
                                                                                lineHeight: 20,
                                                                                fontWeight: '400',
                                                                                color: 'black',

                                                                            }}
                                                                        /> */}
                                                        </View>
                                                        {/* <View
                                                            style={{
                                                                borderTopWidth: 0.5,
                                                                borderTopColor:
                                                                    '#6E7191', width: '95%',
                                                                alignSelf: 'center',
                                                                marginBottom: responsiveHeight(1)
                                                            }}
                                                        /> */}



                                                    </View>
                                                );
                                            }}
                                            keyExtractor={item => item._id}
                                        />
                                        : <Text style={{
                                            alignSelf: 'center',
                                            marginTop: responsiveHeight(2)

                                        }}>
                                            No comments on this ticket
                                        </Text>

                                    }

                                </View>
                            </PagerView>

                            {/* </ScrollView> */}
                            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                                //this.props.navigation.navigate('TicketComments') 
                                this.setState({
                                    modalVisible1: true,
                                })
                            }}>
                                <Text style={{
                                    alignSelf: 'center', color: 'white',
                                    fontWeight: '600',
                                    fontSize: 16,
                                    lineHeight: 28,
                                    letterSpacing: 0.75
                                }}>
                                    Add Action
                                </Text>
                            </TouchableOpacity>

                        </View>
                }
            </View>
        );
    }

}
const styles = StyleSheet.create({
    loginBtnModal: {
        width:'40%',
        height: responsiveHeight(8),
        backgroundColor: '#9B945F',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(3),
        borderRadius: 15,
    },
    cancleBtnModal:{
        width:'40%',
        height: responsiveHeight(8),
        borderColor : '#9B945F',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(3),
         borderRadius: 10,
         borderWidth: 1,
         
    },
    PagerView: {
        flex: 1,


        height: windowHeight,
        //  width:windowWidth,
    },
    container: {
        flex: 1,
        // backgroundColor: '#E5E5E5',
    },
    topleftView: {
        paddingLeft: responsiveHeight(3),
        marginTop: responsiveHeight(2),
        width: '70%',
    },
    TopSecondView: {
        width: windowWidth - 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    uperView: {
        // backgroundColor: '',
        height: windowHeight / 3,
        width: windowWidth,
    },

    uperButtons: {
        backgroundColor: '#234e46',
        width: '25%',
        height: responsiveHeight(5), justifyContent: 'center', borderRadius: 8
    },
    uperButtons1: {
        width: '25%',
        height: responsiveHeight(5), justifyContent: 'center',
    },
    uperButtonText: {
        textAlign: 'center',
        fontSize: 14,
        color: 'white', fontWeight: '600',
    },
    uperButtonText1: {
        textAlign: 'center',
        fontSize: 14,
        color: '#C6CEDD', fontWeight: '600',
    },
    topViewLower: {
        width: windowWidth - 20,
        backgroundColor: 'white',
        marginTop: responsiveHeight(2),
        alignSelf: 'center',
        borderRadius: responsiveHeight(2),

    },
    topViewLoweratArabic: {
        width: windowWidth - 20,
        backgroundColor: 'white',
        marginTop: responsiveHeight(2),
        alignSelf: 'center',
        borderRadius: responsiveHeight(2),
        marginBottom: responsiveHeight(9.5),
    },
    galleryView: {
        marginLeft: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        flexDirection: 'row',
    },
    arabicTExt: {
        fontSize: 18,
        fontWeight: "400",
        textAlign: 'right',
        margin: responsiveHeight(2),
        lineHeight: 35,
        color: '#000000',

    },
    loginBtn: {
        width: windowWidth,
        height: responsiveHeight(9.5),
        backgroundColor: '#9B945F',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(5),
        position: 'absolute',
        bottom: 0,
    },
    lowerViewInner: {
        width: '90%',
        backgroundColor: '#438170',
        borderRadius: 5,
        // height: responsiveHeight(12),
        alignSelf: 'center',
        marginTop: responsiveHeight(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '30%'
    },
    lowerInnerText: {
        color: '#D0D3E8',
        marginLeft: responsiveHeight(2),
        marginTop: responsiveHeight(2),
        letterSpacing: 0.75,
        fontSize: 10,
        //fontFamily:''
    },
    headerText: {
        color: '#fff',
        marginLeft: responsiveHeight(2),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(1),
        letterSpacing: 0.75,
        fontSize: 16,
        fontWeight: '500',
    },
    innerBasicView: {
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        marginTop: responsiveHeight(3),
    },
    list: {
        flex: 1,
        marginLeft: responsiveHeight(2)
    },
    imageNameView: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: "#EB5757",
        justifyContent: 'center',
    },
    nameComment: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white',
    },
    commentText: {
        paddingLeft: responsiveHeight(8),
        //marginRight: responsiveHeight(2),
        marginTop: responsiveHeight(-2),
        //marginLeft: responsiveHeight(8),
        marginBottom: responsiveHeight(1.5)

    },
    commentView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: responsiveHeight(2),
        width: windowWidth - 30,
        backgroundColor: 'white',
        //marginTop: responsiveHeight(2),
        alignSelf: 'center',
        borderRadius: responsiveHeight(2),
    },
    commentMainView: {
        width: windowWidth - 20,
        backgroundColor: 'white',
        marginTop: responsiveHeight(2),
        alignSelf: 'center',
        borderRadius: responsiveHeight(2),
    },
    centeredViewModal2: {
        flex: 1,
        alignSelf: 'center',
        width: windowWidth - 80,
        justifyContent:'center',
    },
    modalView2: {
      //  margin: responsiveHeight(10),
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 35,
        //alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height:windowHeight/3,
        alignSelf:'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: windowWidth,
    },
    modalView: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 35,
        //alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        // marginBottom: 15,
        textAlign: 'center',
        alignSelf: 'center',
        marginLeft: responsiveHeight(3),
        color: '#6E7191',
        fontSize: 16,
    },
    emailView: {
        width: "100%",
        height: "40%",
        //backgroundColor: '#F2F3FD',
        alignSelf: 'center',
        borderRadius: 15,
        //marginTop: responsiveHeight(3),
        flexDirection: 'row',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#D0D3E8',
        alignContent: 'center',
        flexDirection: 'row',
    },
    textinput: {
        padding: responsiveHeight(2),
        width: '100%'
    },
});
