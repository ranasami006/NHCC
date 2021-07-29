import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,ImageBackground , TextInput, TouchableOpacity , Image , Header } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Upload from "../assets/Upload.png";
import Rectangle1 from "../assets/Rectangle1.png";
import Rectangle2 from "../assets/Rectangle2.png";
import Rectangle3 from "../assets/Rectangle3.png";
export default function CreateTicketFirstPage() {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
            <LinearGradient
        colors={['#104F40', '#0C3B31 ', '#0A332B']}
          style={styles.header}>
       <Text style={styles.Text}> Create Ticket    </Text>
      </LinearGradient>
       <View style={styles.header}>
       {/* <Image style={styles.first}source={first}></Image> */}
       <Text style={styles.first} >1 </Text>
       <Image style={styles.Rectangle1} source={Rectangle1}></Image>
       <Text style={styles.general}> General information</Text>
       <Text style={styles.second}>2  </Text>
       <Image style={styles.Rectangle2} source={Rectangle2}></Image>
       <Text style={styles.additional}>Additional information</Text>
       <Text style={styles.third}>3</Text>
       <Image style={styles.Rectangle3} source={Rectangle3}></Image>
       <Text style={styles.Review}>Review information</Text>
         </View>
        
 <TextInput style={styles.textinput1}
   placeholder={' Subject'}
   placeholderTextColor={'grey'}>
 </TextInput>
 <TextInput style={styles.textinput2}
   placeholder={' Email to '}
   placeholderTextColor={'grey'}>
   </TextInput>
   <TextInput style={styles.textinput3}>
   </TextInput>
   <TextInput style={styles.textinput4} >
     <Text style={styles.Browse}>Browse File to Upload </Text>
   </TextInput>
   <Image style={styles.Upload} source={Upload}/>

     <TouchableOpacity style={styles.button2}>                 
         <Text style={{ position: "absolute" ,
left: 5,
right: 5 ,
top: 15,
bottom: 0 ,
fontFamily: "Poppins" ,
fontStyle: "normal" ,
fontWeight: "bold" ,
fontSize: 16 ,
lineHeight:28 ,
display: "flex" ,
alignItems: "center",
textAlign: "center",
letterSpacing: 0.75,
color:"#F7F7FC"}}>Next</Text>
     </TouchableOpacity> 
     <TouchableOpacity style={styles.button1}>                 
         <Text style={{ position: "absolute" ,
left: 5,
right: 5 ,
top: 15,
bottom: 0 ,
fontFamily: "Poppins" ,
fontStyle: "normal" ,
fontWeight: "bold" ,
fontSize: 16 ,
lineHeight:28 ,
display: "flex" ,
alignItems: "center",
textAlign: "center",
letterSpacing: 0.75,
color:"#6E7191"}}>Cancal</Text>
     </TouchableOpacity> 
      
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
  },

  header : {
    position : 'absolute',
      width:414 ,
      height :218,
      top : 1 ,
      bottom : 687 ,
  },
  image: {
  // width:450 ,
  // height :218,
  // top : -350,

  },
  Text:{
    width: 165 ,
    height:40.12 ,
    left : 16 ,
    right: 144 ,
    top:74.67 ,
    bottom:790.2 ,
    color : "#F2F3FD" ,
    lineHeight: 36 ,
    fontSize :24 ,
    fontFamily:"Poppins",
    fontWeight: "bold" ,


  },
  textinput1: {
  position: 'absolute' ,
  width :335 ,
  height : 50 ,
  left: -165 ,
  right:20 ,
  top: 245 ,
  bottom: 610 ,
 backgroundColor:'#F2F3FD',
 borderRadius : 5 ,
 borderColor : '#D0D3E8',
borderWidth : 0.5 ,
borderStyle : "solid",
 },

 textinput2 :{
  position: 'absolute' ,
  width :335 ,
  height : 50 ,
  left: -165 ,
  right:20 ,
  top: 313 ,
  bottom: 542 ,
 backgroundColor:'#F2F3FD',
 borderRadius : 5 ,
 borderColor : '#D0D3E8',
 borderWidth : 0.5 ,
 borderStyle : "solid",
 },
 textinput3 :{
   position: "absolute", 
   width :336 ,
   height :238 ,
   left : -165 ,
   right :20 ,
   top: 381 ,
   bottom: 286 ,
   borderRadius: 5, 
  //  borderColor : " #E5E5E5",
  backgroundColor:'#F2F3FD',
  borderColor : '#D0D3E8',
  borderWidth : 0.5 ,
  borderStyle : "solid",

 },
 textinput4 :{
   position: "absolute",
   width: 336 ,
   height :109 ,
   left:-165 ,
   right: 20 ,
   top : 638 ,
   bottom : 158 ,
   borderColor: "#E5E5E5",
   borderRadius: 5,
   backgroundColor:'#F2F3FD',
  //  borderStyle :  "dashed"
  borderColor : '#D0D3E8',
  borderWidth : 0.5 ,
  borderStyle : "dashed",
  
  

 },
 button2 :{
    position:'absolute',
    width :160,
    height : 64 ,
    padding: 10,
    left :19,
    right : 20 ,
    top :777 ,
    bottom: 64,
    borderRadius: 15  ,
    borderColor :"#9B945F" ,
    // color:"#9B945F",
    backgroundColor:"#9B945F",
    borderWidth :2,

 }, 
 button1 :{
    position:'absolute',
    width :160,
    height : 64 ,
    padding: 10,
    left : -170 ,
    right :203 ,
    top :777 ,
    bottom: 64,
    borderRadius: 15  ,
    borderColor :"#6E7191" ,
    // color:"#6E7191",
    borderWidth : 1,
    backgroundColor:"#F2F3FD",
 }, 
 text1:{
   width: 1 ,
   height:21 ,
   top: 703 ,
   bottom: 181 ,
   left: -100 ,
   right: 91,
  //  fontFamily:"Poppins" ,
  //  fontStyle : "Light" ,
   lineHeight: 21 ,
   color : "#D0D3E8",
 },
 Rectangle1:{
   width:109.79 ,
   height: 2.5 ,
   top : 134.17 ,
   bottom: 736.5 ,
   left:16.33 ,
   right:249.21 ,
 },
 first : {
   width:500,
    // height:60.18 ,
   top: 134.17 ,
   bottom:710.64,
   left:16.33 ,
   right:354.34 ,
  //  fontStyle:"medium",
  fontSize:24 ,
  lineHeight:36,
  alignContent:'center',
  color:"#F2F3FD",

 }, 
 general :{
   width:105 ,
   height:28 ,
   top: 140,
   bottom:697 ,
   right:16 ,
   left: 16 ,
   fontSize: 12 ,
   lineHeight: 14 ,
   alignContent:"center",
   color:"#F2F3FD",


 } ,
 second: {
      top: 70.17 ,
      bottom:710.64,
      left:139.11 ,
      right:234.91 ,
     // fontStyle:"medium",
     fontSize:24 ,
     lineHeight:36,
     alignContent:'center',
     color:"#AEBFC2",

 },
 Rectangle2 : {
  width:109.79 ,
  height: 2.5 ,
  top : 67 ,
  bottom: 736.5 ,
left:132.44,
right:132.77 ,
 },
 additional:{
  width:105 ,
  height:28 ,
  top:  77.17,
  bottom:697 ,
  right:133 ,
  left: 132 ,
  fontSize: 14 ,
  lineHeight: 14 ,
  alignContent:"center",
  color:"#AEBFC2",
 } ,
 third :{
  top: 1 ,
  bottom:710.64,
  left:251.88 ,
  right:115.81 ,
 // fontStyle:"medium",
 fontSize:24 ,
 lineHeight:36,
 alignContent:'center',
 color:"#AEBFC2",
 },
 Rectangle3:{
  width:109.79 ,
  height: 2.5 ,
  top : 0 ,
  bottom: 736.5 ,
left:249.21,
right:16

 },
 Review:{
  width: 107,
  height: 28,
  top: 5,
  bottom: 697,
  left: 252,
  right: 16,
  fontSize: 12,
  lineHeight: 14,
  alignContent: "center",
  color: "#AEBFC2",
 },
 Browse:{
  width: 36 ,
   height:36 ,
   top:671.48 ,
   bottom: 215.16 ,
   left: -20,
   right:175 ,
   color: "#6E7191",
   alignItems:"center",
  
 } ,
 Upload : {
  position:"absolute" ,
  width: 36 ,
  height:36 ,
  top:671.48 ,
  bottom: 215.16 ,
  left: -20,
  right:175 ,
},
});
