import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../components';

import { TaskItem } from '../components';

import { TaskForm } from '../components';
import { getTask, reset } from '../features/tasks/taskSlice';

export const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { 
    tasks,
    isLoading, 
    isError,
    message 
  } = useSelector((state) => state.task);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getTask());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);
  
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Tasks Dashboard</p>
      </section>

      <TaskForm />

      <section className='content'>
        {tasks.length > 0 ? (
          <div className='goals'>
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        ) : (<h3>No tasks set</h3>)}
      </section>
    </>
  )
}
