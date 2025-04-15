type Environment = 'prod' | 'local';

const environment: Environment = 'prod'; 
export const Config = {
  API_BASE_URL:
    environment === 'prod'
      ? 'https://rachidboughelam-api.onrender.com/api/jaguar-hockey'
      : 'http://192.168.2.15:8080/api/jaguar-hockey',
};
