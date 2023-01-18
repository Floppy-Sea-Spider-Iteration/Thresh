import React, { useState, useEffect } from 'react';

const Chatbox = () => {
  
//useEffect to GET all messages to render upon page loadup
let today = new Date()

const [ chatText, chatTextOnChange ] = useState('') //state for creating chat
const [ createDate, createDateOnChange] = useState(today.toLocaleString()) //state for exisiting messages
const [ fullName, setfullName ] = useState()
const [ chatMessages, setChatMessages] = useState(''); // state for exisiting messages
const [ allMessages, setallMessages ] = useState([])

const [count, setCount ] = useState(0)

useEffect(() => {
    console.log('useEffect running successfully');

    setTimeout(() => {
       setCount(count => count + 1) 
    }, 1000);

    fetch('/api/chat')
    .then((response) => response.json())
    .then((data) => {
        console.log('GET all messages data', data)
        for (let i=0; i<data.length; i++) {
            allMessages.push(
                <div>
                    {data[i].fullName} {data[i].chatText} {data[i].createDate}
                </div>)
        }
        // if (data) { 
        //     setallMessages((allMessages) => {
        //         for (let i=0; i<data.length; i++) {
        //             allMessages.push(
        //                 <div>
        //                 {data[i].fullName} {data[i].chatText} {data[i].createDate}
        //                 </div>
        //             )
        //         }
        //     })
        // }
    })
}, [])


//chatMessage = [ {user: Jack, chat: hi, time: 12:00pm},
//                  {user: Jack, chat: bye time: 12:00pm}]

// const allMessages = [];
// if (messageData) { //[ {}, {}, {}]
//     for (let i=0; i<messageData.length; i++) {
//         allMessages.push(
//             <div>
//                 {messageData[i].fullName} {messageData[i].chatText} {messageData[i].createDate}
//             </div>
//         )
//     }
// }


//addComment to POST meesages upon onclicks/onchanges when user sends a message



const addComment = async (e) => {
    e.preventDefault()
    const chat = {chatText}
    const response = await fetch('/api/chat', { 
        method: 'POST',
        body: JSON.stringify(chat),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json;
    if (response.ok) {
        chatTextOnChange('')
    }
}

    return (
        <form onSubmit={addComment}>
        <div className ='chatboxContainer p-10 absolute bottom-0 left-0 right-0' >
            <div className ='allMessagesContainer bg-white text-gray-700 p-3 rounded-xl overflow-scroll h-24'>
                 {allMessages} 
                 {/* <p>This is an example message</p>
                 <p>This is an example message</p>
                 <p>This is an example message</p>
                 <p>This is an example message</p>
                 <p>This is an example message</p>
                 <p>This is an example message</p>
                 <p>This is an example message</p>
                 <p>This is an example message</p> */}
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