import { useState } from "react";
import Button from "../Common/Button";
import QuizButtonComponent from "./Button/QuizButtonComponent";
import NoteTitleComponent from "./NoteTitleComponent";
import QuizComponent from "./QuizComponent";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions, postQuizResult } from "../../services/api/solveQuiz";
import { useQuery } from "@tanstack/react-query";

const SolveQuizComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { quizSetId } = useParams();

  const {
    data: QuestionsData,
    isError,
    error,
  } = useQuery({
    queryKey: ["QuestionsData", quizSetId],
    queryFn: () => getQuestions(quizSetId),
  });

  // 각 퀴즈가 답변되었는지 상태 관리
  const [answeredQuizzes, setAnsweredQuizzes] = useState(
    new Array(QuestionsData.quizzes.length).fill(false)
  );

  // 각 퀴즈에 대한 선택된 답변 상태 관리
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(QuestionsData?.quizzes.length || 0).fill(null)
  );

  // 답변 상태 업데이트 함수
  const handleQuizAnswered = (index, isAnswered) => {
    const updatedAnsweredQuizzes = [...answeredQuizzes];
    updatedAnsweredQuizzes[index] = isAnswered;
    setAnsweredQuizzes(updatedAnsweredQuizzes);
  };

  // 선택된 답변 업데이트 함수
  const handleAnswerSelected = (index, selectedAnswer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = selectedAnswer;
    setSelectedAnswers(updatedAnswers);
    console.log(selectedAnswers);
    handleQuizAnswered(index, selectedAnswer !== null); // 답변 상태 업데이트
  };

  // 모든 퀴즈가 답변되었는지 확인
  const allAnswered = answeredQuizzes.every((answered) => answered);

  // 서버에 답변 전송
  const handleMarking = async () => {
    const resultData = {
      quizSetId: quizSetId,
      answers: QuestionsData.quizzes.map((quiz, index) => ({
        quizId: quiz.quizId,
        selectedAnswer: selectedAnswers[index],
      })),
    };
    console.log(resultData);
    const res = await postQuizResult(quizSetId, resultData);

    navigate(`/solvequiz/quizset/${id}/marked/${quizSetId}`, {
      state: { resultData: res }, // 응답 데이터를 함께 전달
    });
  };

  return (
    <>
      <div className="flex justify-center w-full h-auto bg-neutralwhite">
        <div className="flex flex-col mt-10 w-[48.75rem] gap-2">
          <div className="flex items-center gap-6">
            <div className="text-xl font-semibold text-neutralBlack">
              퀴즈 풀기
            </div>
            <div className="text-sm font-semibold text-gray_400">
              총 {QuestionsData.quizzes.length}개
            </div>
          </div>
          <div className="text-base text-gray_400 text-medium">
            생성된 퀴즈를 풀이하고 북마크에 저장할 수 있어요
          </div>
          <div className="mt-2 mb-3">
            <NoteTitleComponent noteTitle={QuestionsData.noteTitle} />
          </div>
          <div className="flex flex-col gap-6">
            {QuestionsData.quizzes.map((it, index) => (
              <QuizComponent
                key={index}
                QuizNum={index + 1}
                difficultyLevel={
                  it.difficulty === "easy"
                    ? 1
                    : it.difficulty === "medium"
                    ? 2
                    : 3
                }
                question={it.question}
                multipleChoice={it.choices}
                onAnswered={(selectedAnswer) =>
                  handleAnswerSelected(index, selectedAnswer)
                }
              />
            ))}
          </div>
          <div className="flex justify-center my-16">
            <QuizButtonComponent
              text="채점하기"
              disabled={!allAnswered}
              onClick={handleMarking}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SolveQuizComponent;
