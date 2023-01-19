import React, {useState, useEffect} from 'react';

const TaskPopUp = (props) => {

const [ allComments, setAllComments ] = useState('');
const [ commentBody, setCommentBody ] = useState('');
// const [ description, setDescription ] = useState('')

useEffect(() => {
    setTimeout(()=> {
        setCount(count =>  count + 1)
    }, 1000);

    fetch('/api/comments/get')//backend path here
    .then (response => response.json())
    .then(data => {
        const commentsData = [];
        for (let i = 0; i < data.length; i++) {
            commentsData.push(
                <div>
                    <div key={data[i]._id}></div>
                    <div>{data[i].taskID}</div>
                </div>
            )
        }
        setAllComments(commentsData)
    }) 
})

const addComment = async (e) => {
    e.preventDefault();
    const newComment = {taskID, commentBody}
    const response = await fetch('/api/comments/add', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    if(response.ok) {
        setCommentBody('')
    }
}

// const deleteComment = async (e) => {
//     e.preventDefault();
//     const deletedCommentID = {commentID}
//     const response = await fetch('/api/comments/add', {
//         method: 'POST',
//         body: JSON.stringify(deletedCommentID),
//         headers: {
//             'Content-Type' : 'application/json'
//         }
//     })
//     if(response.ok) {
//         setCommentBody('')
//     }
// }


        
    return (props.trigger) ? (
        <div> 
            <div class='absolute h-1/2 w-1/2 bg-blue-500'>
            <button onClick={() => props.setTrigger(false)}>X</button>
            <div> {props.title} </div> {/*Pass down TaskPopUp through ToDo using props*/}
            <div> {props.text} </div> {/*Pass down TaskPopUp through ToDo using props*/}
            
            <div className="allCommenntsContainer h-50 w-50 bg-white text-gray-700 p-3 rounded-xl overflow-y-auto h-40">
                {allComments}
            </div>
            
            <form onSubmit={addComment}>
                <input type="text" className="commentInput rounded-xl w-4/5 h-24" 
                value={commentBody} 
                placeholder='Enter comment'
                onChange={(e) => setCommentBody(e.target.value)}>
                </input>
                <button className='bg-blue w-1/5 flex flex-col items-center rounded-2x1 right-50'>Post Comment</button>
            </form>
            </div>
        </div>
    ) : '';
}


export default TaskPopUp;
