import axios, { AxiosResponse } from 'axios';

const BASE_URL: string = 'https://pncvf3xc-3000.asse.devtunnels.ms';

interface User {
  id: number;
  name: string;
}

async function callEndpoints(): Promise<void> {
  try {
    const getUsersResponse: AxiosResponse<User[]> = await axios.get(`${BASE_URL}/api/users`);
    console.log('GET /api/users response:', getUsersResponse.data);

    const newUser: User = { id: 3, name: 'Charlie' };
    const postUserResponse: AxiosResponse<User> = await axios.post(`${BASE_URL}/api/users`, newUser);
    console.log('POST /api/users response:', postUserResponse.data);

    const rootResponse: AxiosResponse<string> = await axios.get(BASE_URL);
    console.log('GET / response:');
    console.log(rootResponse.data);
  } catch (error) {
    console.error('Error calling endpoints:', error);
  }
}

callEndpoints();