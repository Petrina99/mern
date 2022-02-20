import axios from 'axios';

const API_URL = '/api/tasks/';

const createTask = async (taskData, token) => {
  
  const config = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.post(API_URL, taskData, config);

  return response.data;
}

const getTask = async (token) => {
  
  const config = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config);

  return response.data;
}

const deleteTask = async (taskId, token) => {

  const config = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + taskId, config);

  return response.data;
}

const taskService = {
  createTask,
  getTask,
  deleteTask,
}

export default taskService;