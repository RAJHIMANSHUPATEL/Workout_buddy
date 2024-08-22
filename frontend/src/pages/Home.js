import { useEffect} from "react";
import { useWorkoutContext } from "src/hooks/useWorkoutContext";

// components
import WorkoutDetails from "src/components/WorkoutDetails";
import WorkoutForm from "src/components/WorkoutForm";

const Home = ()=>{
    const {workouts, dispatch} = useWorkoutContext()

    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
    }, [dispatch])
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