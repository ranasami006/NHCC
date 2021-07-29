import AsyncStorage from '@react-native-async-storage/async-storage';
export async function LogIn(email,password) {
   
    let fetchCallback = await fetch(
      "https://api-tickets.kakashi.app/api/login" ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:email,
        password : password,
      })
  
    });
    let responseJson = await fetchCallback.json();
    //console.log(responseJson);
    
    return responseJson;
  }
  export async function getUserData(token) { 
    let fetchCallback = await fetch(
      "https://api-tickets.kakashi.app/api/v2/token",{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },   
    });
   
    let responseJson = await fetchCallback.json();
    return responseJson;
  }

  export async function getAllTickets(page) {
    //await AsyncStorage.removeItem('accessToken')
    // await AsyncStorage.removeItem('refreshToken')

    let token= await AsyncStorage.getItem('accessToken')  
   
    let organization_id= await AsyncStorage.getItem('organization_id')  
    
    let fetchCallback = await fetch(
      "https://api-tickets.kakashi.app/api/v2/get-tickets?page="+page+'&organization_id='+organization_id ,{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
     
    });
   
    let responseJson = await fetchCallback.json();
    return responseJson;
  }

  export async function store_comment(content,ticket_id) {
    // await AsyncStorage.removeItem('accessToken')
    // await AsyncStorage.removeItem('refreshToken')

    let token= await AsyncStorage.getItem('accessToken')  
    let fetchCallback = await fetch(
      'https://api-tickets.kakashi.app/api/v2/store-comment',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        content:content,
        ticket_id : ticket_id,
      })
     
    });
   
    let responseJson = await fetchCallback.json();
    return responseJson;
  }

  export async function status_update_tickets(status_id,ticket_ids) {
  //  console.log("FucntionLL",status_id)
    let token= await AsyncStorage.getItem('accessToken')  
    let fetchCallback = await fetch(
      'https://api-tickets.kakashi.app/api/v2/status-update-tickets',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        status_id : status_id,
        ticket_ids : ticket_ids,
      })
    });
   
    let responseJson = await fetchCallback.json();
    return responseJson;
  }





  export async function ticket_show(ticketId) 
  {
    let token= await AsyncStorage.getItem('accessToken')  
    //console.log("Token",token)
    let fetchCallback = await fetch(
      "https://api-tickets.kakashi.app/api/v2/show-ticket/"+ticketId,{
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
     
    });
   
    let responseJson = await fetchCallback.json();
    return responseJson;
  }