import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicsService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getQuestions } from "../../services/questionsService";
import { getCookie } from "../../helper/cookie";
import { createAnswer } from "../../services/answersService";
// import './quiz.scss'

export default function Quiz() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestions, setdataQuestions] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchApi = async () => {
      const topic = await getTopic(params.id);
      setDataTopic(topic);
    };

    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const questions = await getQuestions(params.id);
      setdataQuestions(questions);
    };

    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedAnswers = [];

    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        selectedAnswers.push({
          questionId: parseInt(e.target.elements[i].name),
          answer: parseInt(e.target.elements[i].value),
        });
      }
    }

    const options =  {
      userId: parseInt(getCookie("id")),
      topicId:  dataTopic.id,
      answers: selectedAnswers
    }

    const respond = await createAnswer(options);

    if(respond) {
      navigate('/result/'+respond.id)
    }
  };

  return (
    <>
      <div className="container">
        <h2>
          {dataTopic ? `Bài Quiz chủ đề: ${dataTopic.name}` : <Skeleton />}
        </h2>

        {dataQuestions.length > 0 ? (
          <div className="form-quiz">
            <form onSubmit={handleSubmit}>
              {dataQuestions.map((question, i) => (
                <div className="form-quiz__item" key={question.id}>
                  <p>
                    Câu {i + 1}: {question.question}
                  </p>

                  {question.answers.map((answer, index) => (
                    <div className="radio" key={index}>
                      <input
                        type="radio"
                        name={`${question.id}`}
                        value={index}
                        id={`quiz-${question.id}-${index}`}
                      />

                      <label
                        className="radio-label"
                        htmlFor={`quiz-${question.id}-${index}`}
                      >
                        {answer}
                      </label>
                    </div>
                  ))}
                </div>
              ))}

              <button style={{ margin: "20px 0" }} className="button">
                Nộp bài
              </button>
            </form>
          </div>
        ) : (
          <div className="form-quiz">
            <form>
              {[...Array(3)].map((question, i) => (
                <div className="form-quiz__item" key={i}>
                  <p>
                    <Skeleton width={"50%"} />
                  </p>

                  {[...Array(4)].map((answer, index) => (
                    <div className="radio" key={index}>
                      <Skeleton
                        circle
                        width={15}
                        height={15}
                        inline
                        style={{ marginRight: 4 }}
                      />

                      <Skeleton width={"20%"} className="radio-label" />
                    </div>
                  ))}
                </div>
              ))}
            </form>
          </div>
        )}
      </div>
    </>
  );
}
