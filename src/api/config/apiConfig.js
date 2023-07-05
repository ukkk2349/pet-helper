const hostDev = 'https://localhost:7060/api';

const api =  {
  development: hostDev
}

export default api[process.env.NODE_ENV]