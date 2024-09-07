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

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in');
            return;
        }
    
        const workout = { title, load, reps };
    
        try {
            const response = await fetch('https://workout-buddy-lq7f.onrender.com/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });
    
            let json;
            try {
                json = await response.json();
            } catch (err) {
                throw new Error('Invalid JSON response');
            }
    
            if (!response.ok) {
                setError(json.error || 'Something went wrong');
                setEmptyFields(json.emptyFields || []);
            } else {
                setError(null);
                setEmptyFields([]);
                setTitle('');
                setLoad('');
                setReps('');
                console.log('New Workout Added');
                dispatch({ type: 'CREATE_WORKOUT', payload: json });
            }
        } catch (err) {
            setError(err.message);
        }
    };
    

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