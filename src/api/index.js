import axios from 'axios'

const REACT_APP_BACKEND_DEV = 'http://localhost:5000';

const backend = axios.create({baseURL: REACT_APP_BACKEND_DEV});

export default backend
