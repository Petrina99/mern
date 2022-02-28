import { useDispatch } from 'react-redux';

import { deleteTask } from '../features/tasks/taskSlice';

export const TaskItem = ({ task }) => {

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(deleteTask(task._id));
  }

  return (
    <div className='goal'>
      <div>
        {new Date(task.createdAt).toLocaleString('en-GB')}
      </div>
      <h2>{task.text}</h2>
      <button className='close' onClick={onClick}>
        X
      </button>
    </div>
  )
}
