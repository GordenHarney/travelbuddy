import axios from "axios";

const askOpenAi = async (chatTranscript) => {
  const result = await axios.post("http://localhost:5001/ask", {
    prompt: chatTranscript,
  });

  return result?.data.response;
};

export default askOpenAi;
