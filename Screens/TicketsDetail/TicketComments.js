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
    ToastAndroid,
    BackHandler,
    KeyboardAvoidingView,
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
import { store_comment } from '../backend/api';

const _editor = React.createRef();
export default class TicketComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
        email: '',
        text: '',
        viewText: '',
        ticket_id: this.props.route.params.ticket_id,
        }
    };
    
    async componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress')
        this.focusListener = this.props.navigation.addListener('focus', async () => {
            _editor.current.setContents([
                { insert: '\n' }
              ]);
        });

    }

    async onSubmitClick() {
        var regex = /(<([^>]+)>)/ig

        let hasText = !!this.state.viewText.replace(regex, "").length;
        console.log(hasText)
        if (hasText) {
            let response = await
                store_comment(this.state.viewText, this.state.ticket_id)
            if (response.status == 'success') {

                if (Platform.OS === 'ios') {
                    alert(response.message)
                }
                else {
                    ToastAndroid.show(response.message, ToastAndroid.LONG);
                }
                this.setState({ text: '' })
                this.props.navigation.navigate("TicketDetail", {
                    data: this.state.ticket_id,
                    page: 3
                })

            }
        }
        else {
            // console.log("PKKK", this.state.viewText)
            ToastAndroid.show('Please type something to post', ToastAndroid.LONG);
        }
    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="light-content" />
                {/* <StatusBar backgroundColor="transparent" barStyle="light-content" translucent /> */}
                <View style={styles.container}>
                    <View style={styles.innerMainView} >

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate("TicketDetail", {
                                    data: this.state.ticket_id,
                                    page: 3
                                })
                            }}>
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
                            }}> Add Comment</Text>

                            <View style={styles.emailView}>
                                <TextInput
                                    style={styles.textinput}
                                    placeholder={'Email to'}
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
                            <View style={{
                                marginTop: responsiveHeight(3),
                                backgroundColor: '#F2F3FD'
                            }}>
                                <QuillToolbar
                                    editor={_editor} options="basic" theme="light"
                                    container={false}
                                    theme='light'
                                />

                                <QuillEditor
                                    style={styles.editor}
                                    ref={_editor}
                                    initialHtml="&nbsp"
                                    onHtmlChange={({ html }) =>
                                        this.setState({ viewText: html })
                                    }
                                    onTextChange={
                                        text => this.setState
                                            ({ text: text })
                                    }
                                />
                            </View>

                            <TouchableOpacity style={styles.FileUpload}>
                                <Image style={{ alignSelf: 'center', marginBottom: responsiveHeight(2) }} source={require('../../assets/Upload.png')}></Image>
                                <Text style={{ alignSelf: 'center', fontSize: 16, color: '#6E7191' }}>
                                    Browse file to upload
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginBtn} onPress={() => { this.onSubmitClick() }}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '600', fontSize: 16, lineHeight: 28 }}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
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
        marginTop: responsiveHeight(8),
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
