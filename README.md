1. Axios Instance (axiosInstance.js)
javascript
Copy
Edit
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global Error Handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
2. API Service Layer (apiService.js)
Encapsulate API logic for cleaner and reusable code.

javascript
Copy
Edit
import axiosInstance from './axiosInstance';

// GET Request
export const fetchData = (endpoint) => axiosInstance.get(endpoint);

// POST Request
export const createData = (endpoint, data) => axiosInstance.post(endpoint, data);

// PUT Request
export const updateData = (endpoint, data) => axiosInstance.put(endpoint, data);

// DELETE Request
export const deleteData = (endpoint) => axiosInstance.delete(endpoint);
3. Custom Hook (useApi.js)
A flexible custom hook for handling multiple API requests.

javascript
Copy
Edit
import { useState, useEffect } from 'react';

const useApi = (apiCallback, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCallback(...args);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { data, loading, error, execute };
};

export default useApi;
4. Component Using Custom Hook (DataComponent.js)
Fetching and managing data in a component.

javascript
Copy
Edit
import { fetchData, createData, updateData, deleteData } from '../services/apiService';
import useApi from '../hooks/useApi';

function DataComponent() {
  const { data, loading, error, execute: getData } = useApi(() => fetchData('/items'));
  const { execute: postData } = useApi(() => createData('/items', { name: 'New Item' }), false);
  const { execute: putData } = useApi(() => updateData('/items/1', { name: 'Updated Item' }), false);
  const { execute: deleteItem } = useApi(() => deleteData('/items/1'), false);

  const handleCreate = () => postData();
  const handleUpdate = () => putData();
  const handleDelete = () => deleteItem();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Data:</h1>
      {data && data.map(item => <p key={item.id}>{item.name}</p>)}
      <button onClick={handleCreate}>Create Item</button>
      <button onClick={handleUpdate}>Update Item</button>
      <button onClick={handleDelete}>Delete Item</button>
    </div>
  );
}

export default DataComponent;
Why This Solution Works
Custom Hook (useApi): Handles loading, error, and data state management.
Service Layer (apiService): Clean separation of API logic.
Flexible Component (DataComponent): Easily handles multiple API requests.