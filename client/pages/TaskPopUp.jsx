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

    if (props.trigger){
        fetch('/api/comments/get', {
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
            for (let i = 0; i < data.rows.length; i++) {
                commentsData.push(
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div key={data.rows[i]._id}>{data.rows[i].text}</div>
                        <span className ='pr-10 text-red-500 hover:text-red-800 pr-4'onClick={() => deleteComment(data.rows[i]._id)}>Delete</span>
                    </div>
                )
            }
            setAllComments(commentsData)
        }) 
    }
}, [count])

const addComment = async (e) => {
    e.preventDefault();
    // const newComment = { commentBody }
    const response = await fetch('/api/comments/add', {
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
        console.log('this is inside of adding a comment', json);
        setCommentBody('')
    }
}

const deleteComment = async (commentID) => {
    //e.preventDefault();
    //const deletedCommentID = {commentID}
    const response = await fetch('/api/comments/delete', {
        method: 'POST',
        body: JSON.stringify({
            'commentID' : commentID
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}


        
    return (props.trigger) ? (
        <div> 
            <div className='fixed top-1/4 inset-x-0 mx-auto h-1/2 w-1/2 bg-blue-500 bg-opacity-95 rounded-xl'>
                <div className='flex justify-end pr-3 pt-3 text-xs'>    
                    <button  onClick={() => props.setTrigger(false)}>X</button>
                </div>

                <div className="flex text-xl justify-center ">
                    <div className="text-white text-2xl pt-1 pb-2 w-5/6 text-center rounded-l font-bold"> {props.title} </div> {/*Pass down TaskPopUp through ToDo using props*/}
                </div>

                <div>
                    <div className="flex text-lg text-gray-700 pl-3 pb-1 ">
                        Details:  
                    </div>
  
                    <div className="text-slate-50 text-md pl-8 pb-7 w-5/6 rounded-l overflow-y-auto"> {props.text} </div> {/*Pass down TaskPopUp through ToDo using props*/}
                </div>
                    <div className='flex text-lg text-gray-700 pl-3 pb-1'>
                    Comments:
                    </div>

                    <div className="allCommenntsContainer overflow-hidden text-md h-20 w-8/10 pl-8 pr-1 text-slate-50 rounded-xl overflow-y-auto h-40">
                        {allComments}
                    </div>
                <div className="absolute bottom-1 left-0 right-0 pl-4 pr-4 pb-3">
                    <form onSubmit={addComment}
                            className='flex justify-between items-end'>
                        <input type="text" className="commentInput rounded-xl w-3/4 h-10 pl-3" 
                        value={commentBody} 
                        placeholder='Enter comment'
                        onChange={(e) => setCommentBody(e.target.value)}>
                        </input>
                        <button className='bg-black w-1/6 flex flex-col justify-center items-center rounded-2x1 right-50 h-10 text-xs'>Post Comment</button>
                    </form>
                </div>
                
            </div>
        </div>
    ) : '';
}


export default TaskPopUp;
