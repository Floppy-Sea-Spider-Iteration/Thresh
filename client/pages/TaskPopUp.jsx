import React, {useState, useEffect} from 'react';

const TaskPopUp = ({title, text}) => {

const [ allComments, setAllComments ] = useState('');
const [ commentBody, setCommentBody ] = useState('');
// const [ description, setDescription ] = useState('')

useEffect(() => {
    setTimeout(()=> {
        setCount(count =>  count + 1)
    }, 1000);

    fetch('/api/comments')//backend path here
    .then (response => response.json())
    .then(data => {
        const commentsData = [];
        for (let i = 0; i < commentsData.length; i++) {
            commentsData.push(
                <div>
                    <div key={data[i]._id}></div>
                    <div>{data[i].comments}</div>
                </div>
            )
        }
        setAllComments(commentsData)
    }) 
})

const addComment = async (e) => {
    e.preventDefault();
    const newComment = {commentBody}
    const response = await fetch('/api/comments', {
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


        
    return (
        <div> 
            <button>X</button>
            <div> {title} </div>
            <div> {text} </div>
            
            <div className="allCommenntsContainer bg-white text-gray-700 p-3 rounded-xl overflow-y-auto h-40">
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
    )
}