import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";


export const EnterBoard = () => {

const [boardID, setBoardID] = useState('')
const [error, setError ] = useState('')
     
const navigate = useNavigate()

const boardIDInput = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/board/view', { 
        method: 'POST',
        body: JSON.stringify({
            'boardID':boardID
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json;
    if (response.ok) {
        console.log(boardID);
        navigate('/dashboard')
    }
    else setError('Invalid Board ID')
}

const createBoard = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/board/create', {   //add path to connect backend
        method: 'POST',
        body: JSON.stringify({
            'boardID': boardID
        }), // boardID = {boardID: 'exampleBoardID'}
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json;
    if (response.ok) {
        navigate('/dashboard')
    }
    else setError('Board ID already exists')
}

    return (
        <div>
            <div className='flex flex-col items-center justify-center h-screen w-screen'>
            <form onSubmit={boardIDInput}>
                <div >
                    <div className='text-xl font-bold pb-2'>Board Directory</div> 
                    <div className="text-red-700">{error}</div>
                    <input className='flex inputID w-50'
                            value={boardID}
                            onChange={(e)=> setBoardID(e.target.value)}
                            placeholder="Type in board ID...">
                        </input>
                    <div className='flex pt-2.5 w-full items-center justify-center truncate'>
                        <button className="boardButton w-50">View Board</button>
                    </div>
                </div>
            </form>

                <div className='flex items-center justify-center pt-2.5 w-full '>
                    <button className="createBoardButton w-50 truncate" onClick={createBoard}>Create Board</button>
                </div>
            </div>
        </div>
    )
}

