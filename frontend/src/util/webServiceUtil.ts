import axios from 'axios';
import { Todo } from '@/entity/todo' // Import the types

// Define the base URL for the backend API
const BASE_URL = 'http://localhost:5000/api'; // Adjust this based on your backend's deployed URL

// Utility function to get the authentication token
const getAuthToken = () => {
    return localStorage.getItem('token'); // Assuming you store the token in localStorage
};

// Set up default Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the auth token to headers
axiosInstance.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// User Authentication
export const registerUser = async (username: string, password: string): Promise<{ message: string }> => {
    const response = await axiosInstance.post('/auth/register', { username, password });
    return response.data;
};

export const loginUser = async (username: string, password: string): Promise<void> => {
  try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Login successful, token stored in local storage');
  } catch (error) {
      console.error('Login failed:', error);
      throw error;
  }
};

// To-Do Operations
export const loadTodos = async (): Promise<Todo[]> => {
    const response = await axiosInstance.get('/todos');
    return response.data;
};

export const createTodo = async (task: string): Promise<Todo> => {
    const response = await axiosInstance.post('/todos', { task });
    return response.data;
};

export const editTodo = async (id: string, task: string, completed: boolean): Promise<Todo> => {
    const response = await axiosInstance.put(`/todos/${id}`, { task, completed });
    return response.data;
};

export const deleteTodo = async (id: string): Promise<{ message: string }> => {
    console.log("deleting  todo ", id)
    const response = await axiosInstance.delete(`/todos/${id}`);
    return response.data;
};
