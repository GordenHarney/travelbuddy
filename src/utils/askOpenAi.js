import axios from "axios";

const askOpenAi = async (chatTranscript) => {
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const result = await axios.post(`${backendUrl}/ask`, {
    prompt: chatTranscript,
  });

  return result?.data.response;
};

export default askOpenAi;
