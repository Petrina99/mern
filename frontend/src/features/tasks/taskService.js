import axios from 'axios';

const API_URL = '/api/tasks/';

const createTask = async (taskData, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await axios.post(API_URL, taskData, config);

  return response.data;
}

const getTask = async (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await axios.post(API_URL, config);

  return response.data;
}

const taskService = {
  createTask,
  getTask,
}

export default taskService;
