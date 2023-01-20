import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';

const Chatbox = () => {
  
//useEffect to GET all messages to render upon page loadup
let today = new Date()

const [ chatText, chatTextOnChange ] = useState('') //state for creating chat
// const [ createDate, createDateOnChange] = useState(today.toLocaleString()) //state for exisiting messages
const [ allMessages, setAllMessages ] = useState('');
const [count, setCount ] = useState(0);
const [showPicker, setShowPicker] = useState(false);

const onEmojiClick = (emojiObject, event) => {
    console.log('emojoiObject',emojiObject);
    chatTextOnChange(inputFieldText => inputFieldText + emojiObject.emoji);
    setShowPicker(false);
}

useEffect(() => {
    console.log('useEffect running successfully');

    setTimeout(() => {
       setCount(count => count + 1) 
    }, 1000);

    fetch('/api/chat')
    .then((response) => response.json())
    .then((data) => {
        console.log('GET all messages data', data) //data ---> [{}, {], {}}]

        const messageData = [];
        for (let i=0; i<data.length; i++) {
            messageData.unshift(
                <div className='flex relative' key={data[i]._id}>
                    <div>
                        {data[i].fullname}: {data[i].chattext}
                    </div>
                    <div className='absolute right-24 text-gray-400 pl-1" style="font-size: 2px pl-2.5'>
                        {data[i].createdate.slice(0, 10)}
                        {/* {today.toLocaleString()} */}
                    </div>
                </div>)
                }
        setAllMessages(messageData);
    })
}, [count])



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
        <div className ='chatboxContainer pl-10 pr-10 pb-4 absolute bottom-0 left-0 right-0' >
            <div className ='allMessagesContainer flex flex-col-reverse text-sm bg-white text-gray-700 p-3 rounded-xl overflow-y-auto h-24'>
                 {allMessages} 
            </div>
            <div className='pt-2'>
                <div className='inputSend flex bg-white text-gray-600 rounded-xl'>
                    <input type='text' className='chatInput w-5/6 h-8 text-sm rounded-xl flex flex-col justify-start items-center pl-3'
                        onChange={(e) => chatTextOnChange(e.target.value)} value={chatText} placeholder='Type Message...'>
                    </input>
                    <img className='emoji-icon'
                        src='https://icons.getbootstrap.com/assets/icons/emoji-smile.svg'
                        onClick={() => setShowPicker(val => !val)} 
                        style={{padding: '0px 10px 0px 10px'}}/>
                    <button className='bg-blue w-1/6 flex flex-col items-center rounded-2x1 right-50 text-sm'>Send</button>
                </div>
            </div>
            
            
            <div style={{position: 'absolute', right: '10%', bottom: '32%'}}>
                {showPicker && <Picker pickerStyle={{width: '5%'}} onEmojiClick={onEmojiClick} />}
            </div>
            
        </div>
        </form>
    )
}

export default Chatbox;