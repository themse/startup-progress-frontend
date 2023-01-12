import axios from 'axios';

import { Response, Languages } from './types';

const BASE_URL = `https://uselessfacts.jsph.pl/random.json?language=${Languages.EN}`;

export const getRandomFact = async (): Promise<Response> => {
  const { data } = await axios.get(BASE_URL);

  return data;
};
