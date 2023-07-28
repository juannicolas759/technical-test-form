import axios from 'axios';

const baseURL = "https://jkcge88asd.execute-api.us-east-2.amazonaws.com/qa/license/api/customer/create";

export default async function addNewUser(data) {
  try {
    const response = await axios.post(baseURL, data)
    const responseText = response.data.result.records;
    return responseText

  } catch (error) {
    throw error;
  }
}