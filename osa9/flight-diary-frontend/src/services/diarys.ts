import axios from 'axios';
import { Diary, NewDiary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

export const createDiary = async (diary: NewDiary) => {
  try {
    const response = await axios.post<Diary>(baseUrl, diary);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
};
