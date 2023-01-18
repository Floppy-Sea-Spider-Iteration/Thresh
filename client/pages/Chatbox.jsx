import React, { useState, useEffect } from 'react';

const Chatbox = () => {
  
//useEffect to GET all messages to render upon page loadup
let today = new Date()

const [ chatText, chatTextOnChange ] = useState('') //state for creating chat
const [ createDate, createDateOnChange] = useState(today.toLocaleString()) //state for exisiting messages
const [ chatMessages, setChatMessages] = useState(''); // state for exisiting messages

useEffect(() => {
    console.log('useEffect running successfully');

    fetch('/') //WE NEED TO UPDATE THE FETCH REQ URL
    .then((response) => response.json())
    .then((data) => {
        console.log('GET all messages data', data)
        setChatMessages(data)
    })
}, [])


const allMessages = [];
if (chatMessages) {
    for (let i=0; i<chatMessages.length; i++) {
        allMessages.push(
            <div>
                <div>{chatMessages[i].chatText}</div> 
                <div>{chatMessages[i].createDate}</div> 
            </div>
        )
    }
}


//addComment to POST meesages upon onclicks/onchanges when user sends a message



const addComment = async (e) => {
    e.preventDefault()
    
    const chat = {chatText}
    const response = await fetch('/chatbox', {   //add path to connect backend
        method: 'POST',
        body: JSON.stringify(chat),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json;
    if (response.ok) {
        chatTextOnChange(''),
        createDateOnChange(today.toLocaleString())
    }
}

    return (
        <form onSubmit={addComment}>
        <div className ='chatboxContainer p-10 absolute bottom-0 left-0 right-0' >
            <div className ='allMessagesContainer bg-white text-gray-700 p-3 rounded-xl'>
                 {allMessages} 
                 <p>This is an example message</p>
                 <p>This is an example message</p>
                 <p>This is an example message</p>
                 <p>This is an example message</p>
            </div>
            <br />
            <div className='inputSend flex bg-white text-gray-600 rounded-xl'>
                <input type='text' className='chatInput w-4/5 h-8 rounded-xl flex flex-col justify-start items-center pl-3'
                    onChange={(e) => chatTextOnChange(e.target.value)} value={chatText} placeholder='Type Message...'>
                </input>
                <button className='bg-blue w-1/5 flex flex-col items-center rounded-2x1 right-50'>Send</button>
            </div>
            
        </div>
        </form>
    )
}

export default Chatbox;