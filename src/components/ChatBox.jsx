import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Question from "./Question";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import askOpenAi from "../utils/askOpenAi";
import Response from "./Response";

const ChatBox = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [disabledStatus, setDisabledStatus] = useState({});
  const [openAiResponse, setOpenAiResponse] = useState(null);
  const { currentUser } = UserAuth();

  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("sequence"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questionsArray = [];
      querySnapshot.forEach((doc) => {
        questionsArray.push({ ...doc.data(), id: doc.id });
      });
      setQuestions(questionsArray);
    });

    return () => unsubscribe();
  }, []);

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestionIndex - 1].question]: answer,
    }));

    setDisabledStatus((prev) => ({
      ...prev,
      [currentQuestionIndex]: true,
    }));

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const goBack = () => {
    setDisabledStatus((prev) => ({
      ...prev,
      [currentQuestionIndex - 1]: false,
    }));
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const addChatHistory = async (userId, answers) => {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
    const response = await fetch(`${backendUrl}/add_chat_history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        answers: answers,
      }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.error);
    }

    return data;
  };

  const saveToFirebase = async () => {
    try {
      // await addDoc(collection(db, "chat_history"), {
      //   userId: currentUser,
      //   answers,
      //   timestamp: serverTimestamp(),
      // });
      const result = await addChatHistory(currentUser, answers);
      console.log(result.message); // "Chat history added successfully!"
      const recommendation = await askOpenAi(answers);
      setOpenAiResponse(recommendation);
      console.log(recommendation);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="pb-44 pt-20 containerWrap">
      {questions.slice(0, currentQuestionIndex).map((q, index) => (
        <Question
          key={q.id}
          question={q}
          onAnswer={handleAnswer}
          goBack={goBack}
          notFirst={index !== 0}
          disabled={disabledStatus[index + 1]}
        />
      ))}
      {currentQuestionIndex === questions.length + 1 && (
        <button className="btn btn-block" onClick={saveToFirebase}>
          Submit Your Answers
        </button>
      )}
      {openAiResponse && <Response message={openAiResponse} />}
    </div>
  );
};

export default ChatBox;
