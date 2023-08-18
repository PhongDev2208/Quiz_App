import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuestions } from "../../services/questionsService";
import { getAnswer } from "../../services/answersService";
import { getTopic } from "../../services/topicsService";
import Skeleton from "react-loading-skeleton";
import "./Result.scss";

export default function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswer = await getAnswer(params.id);
      const dataQuestions = await getQuestions(dataAnswer.topicId);
      const dataTopic = await getTopic(dataAnswer.topicId);

      const result = [];
      const info = {
        totalAnswer: dataQuestions.length,
        quantityAnswerTrue: 0,
        quantityAnswerFalse: 0,
        percentTrue: 0,
        dataTopic,
      };

      dataQuestions.forEach((question) => {
        result.push({
          ...question,
          ...dataAnswer.answers.find((item) => {
            return item.questionId === question.id;
          }),
        });
      });

      setDataResult(result);

      result.forEach((item) => {
        if (item.correctAnswer === item.answer) {
          info.quantityAnswerTrue++;
        }
      });

      info.quantityAnswerFalse = info.totalAnswer - info.quantityAnswerTrue;
      info.percentTrue = parseInt(
        ((info.quantityAnswerTrue / info.totalAnswer) * 100).toFixed()
      );

      setInfo(info);
    };

    fetchApi();
  }, []);

  return (
    <>
      <div className="container">
        {info ? (
          <>
            <h2>Kết quả chủ đề: {info.dataTopic.name}</h2>
            <div>
              <span>
                Đúng: <strong>{info.quantityAnswerTrue}</strong>
              </span>
              <span>
                {" "}
                | Sai: <strong>{info.quantityAnswerFalse}</strong>
              </span>
              <span>
                {" "}
                | Tổng số câu: <strong>{info.totalAnswer}</strong>
              </span>
              <span>
                {" "}
                | Tỉ lệ đúng: <strong>{info.percentTrue} %</strong>
              </span>
            </div>
          </>
        ) : (
          <>
            <h2>
              <Skeleton width={263} />
            </h2>
            <div>
              <span>
                <Skeleton width={363} />
              </span>
            </div>
          </>
        )}

        {dataResult.length > 0 ? (
          <>
            <div className="result">
              {dataResult.map((item, index) => (
                <div className="result__item" key={item.id}>
                  <p>
                    Câu {index + 1}: {item.question}
                    {item.correctAnswer === item.answer ? (
                      <span className="result__tag result__tag--true">
                        Đúng
                      </span>
                    ) : (
                      <span className="result__tag result__tag--false">
                        Sai
                      </span>
                    )}
                  </p>

                  {item.answers.map((answer, index) => {
                    let checked = false;
                    let className = "";

                    if (index === item.answer) {
                      checked = true;
                      className = "result__item--selected";
                    }

                    if (index === item.correctAnswer) {
                      className = "result__item--result";
                    }

                    return (
                      <div key={index}>
                        <input type="radio" disabled defaultChecked={checked} />
                        <label className={className}>{answer}</label>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <Link to={`/quiz/${info.dataTopic.id}`}>
              <button style={{ margin: "20px 0" }} className="button">
                Làm lại
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="result">
              {[...Array(3)].map((item, index) => (
                <div className="result__item" key={index}>
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
            </div>

            <Link>
              <button style={{ margin: "20px 0" }} className="button">
                Làm lại
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
