import { useEffect} from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "src/components/WorkoutDetails";
import WorkoutForm from "src/components/WorkoutForm";

const Home = ()=>{
    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useAuthContext();

    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch('https://workout-buddy-lq7f.onrender.com/api/workouts', {
                headers: {
                    'Autherization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if(user){
            fetchWorkouts()
        }
    }, [dispatch, user])
    return (
        <div className="home">
            <div className="workouts">
                {
                    workouts && workouts.map((workout)=> (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))
                }
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;