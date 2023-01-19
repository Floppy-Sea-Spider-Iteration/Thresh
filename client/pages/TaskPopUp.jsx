import React, {useState, useEffect} from 'react';

const TaskPopUp = (props) => {

const [ allComments, setAllComments ] = useState('');
const [ commentBody, setCommentBody ] = useState('');
const [ count, setCount ] = useState(0)
// const [ description, setDescription ] = useState('')

useEffect(() => {
    
    setTimeout(()=> {
        setCount(count =>  count + 1)
    }, 1000);

    fetch('/api/comment/get', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            'taskID': props._id
        })
    })
    
    .then (response => response.json())
    .then(data => {
        console.log('this is inside of TaskPopUp GET', data);
        const commentsData = [];
        for (let i = 0; i < data.length; i++) {
            commentsData.push(
                <div>
                    <div key={data[i]._id}></div>
                    <div>{data[i].commentBody}</div>
                    <span onClick={deleteComment}>Delete Comment</span>
                </div>
            )
        }
        setAllComments(commentsData)
    }) 
}, [])

const addComment = async (e) => {
    e.preventDefault();
    // const newComment = { commentBody }
    const response = await fetch('/api/comment/add', {
        method: 'POST',
        body: JSON.stringify({
            'commentBody': commentBody,
            'taskID': props._id
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json;
    if(response.ok) {
        console.log('this is inside of adding a comment', data);
        setCommentBody('')
    }
}

const deleteComment = async (e) => {
    e.preventDefault();
    const deletedCommentID = {commentID}
    const response = await fetch('/api/comments/add', {
        method: 'POST',
        body: JSON.stringify(deletedCommentID),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}


        
    return (props.trigger) ? (
        <div> 
            <div className='fixed top-1/4 inset-x-0 mx-auto h-1/2 w-4/6 bg-blue-500 bg-opacity-95 rounded-xl'>
                <div className='flex justify-end pr-3 pt-3'>    
                    <button  onClick={() => props.setTrigger(false)}>X</button>
                </div>
                <div className="flex justify-center text-xl items-center flex-col ">
                    <div className="text-white text-3xl pt-1.5 pb-7 w-5/6 text-center rounded-l"> {props.title} </div> {/*Pass down TaskPopUp through ToDo using props*/}
                    
                    <div className="text-white text-lg p-1 pb-7 w-5/6 text-center rounded-l overflow-y-auto"> {props.text} </div> {/*Pass down TaskPopUp through ToDo using props*/}
                </div>


                    <div className="allCommenntsContainer overflow-hidden h-50 w-1/2  text-gray-700 p-3 rounded-xl overflow-y-auto h-40">
                        {allComments}
                        {/* Example comment<br/>
                        Example comment<br/>
                        Example comment<br/> */}
                    </div>

                
                <form onSubmit={addComment}
                        className='flex justify-end'>
                    <input type="text" className="commentInput relative bottom-0 left-6 rounded-xl w-full h-24" 
                    value={commentBody} 
                    placeholder='Enter comment'
                    onChange={(e) => setCommentBody(e.target.value)}>
                    </input>
                    <div className='flex justify-end items-end pr-3 pt-3'>
                        <button className='bg-black w-1/2 flex flex-col items-center rounded-2x1 right-50'>Post Comment</button>
                    </div>
                </form>
            </div>
        </div>
    ) : '';
}


export default TaskPopUp;
