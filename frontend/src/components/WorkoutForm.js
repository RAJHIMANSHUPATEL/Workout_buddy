import { useState } from "react";
import { useWorkoutContext } from "src/hooks/useWorkoutContext";
import { useAuthContext } from "src/hooks/useAuthContext";


function WorkoutForm() {
    const {dispatch} = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const {user} = useAuthContext();

    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        if(!user) {
            setError('You must be logged in')
            return
        }

        const workout = {title, load, reps}

        const response = await fetch('https://workout-buddy-1-en3z.onrender.com/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Autherization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setError(null)
            setEmptyFields([])
            setTitle('')
            setLoad('')
            setReps('')
            console.log('New Workout Added')
            dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
        } 

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e)=> setTitle(e.target.value) }
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={(e)=> setLoad(e.target.value) }
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e)=> setReps(e.target.value) }
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>Add Workout</button>

            {error &&  <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm