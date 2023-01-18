import React, { useState, useEffect } from 'react';

const Chatbox = () => {
  
//useEffect to GET all messages to render upon page loadup
let today = new Date()

const [ chatText, chatTextOnChange ] = useState('') //state for creating chat
const [ createDate, createDateOnChange] = useState(today.toLocaleString()) //state for exisiting messages
const [ chatMessages, setChatMessages] = useState(''); // state for exisiting messages

// useEffect(() => {
//     console.log('useEffect running successfully');

//     fetch('/') //WE NEED TO UPDATE THE FETCH REQ URL
//     .then((response) => response.json())
//     .then((data) => {
//         console.log('GET all messages data', data)
//         setChatMessages(data)
//     })
// }, [])

// [ {Chattext, date} ]

// const allMessages = [];
// if (chatMessages) {
//     for (let i=0; i<chatMessages.length; i++) {
//         allMessages.push(
//             <div>
//                 <div>{chatMessages[i].chatText}</div> //update the column name
//                 <div>{chatMessages[i].createDate}</div> //update the column name
//             </div>
//         )
//     }
// }


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
        <div className ='chatboxContainer flex mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10' >
            <div className ='allMessagesContainer bg-white text-gray-700'>
                {/* {allMessages} */}
                All messages to display here
            </div>
            <input type='text' className='chatInput' 
                onChange={(e) => chatTextOnChange(e.target.value)} value={chatText} placeholder='Type Message...'>
            </input>
            <button className='bg-white p-5 rounded-2x1' >Send</button>
        </div>
        </form>
    )
}

export default Chatbox;