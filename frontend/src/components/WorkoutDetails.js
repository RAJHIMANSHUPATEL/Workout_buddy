import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";




function WorkoutDetails({workout}) {
    const {user} = useAuthContext();
    const {dispatch} = useWorkoutContext();


    const handleClick = async ()=>{
        if(!user){
            return
        }
        const response = await fetch('https://workout-buddy-lq7f.onrender.com/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Autherization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }

    }
    return (
        <div className='workout-details'>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick = {handleClick}>
                delete
            </span>
        </div>
    )
}

export default WorkoutDetails