import axios from 'axios';

export const updateUser = (data) => axios.patch('/api/auth/update', data);
