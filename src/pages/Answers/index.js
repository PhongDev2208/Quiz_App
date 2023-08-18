import { useEffect, useState } from "react";
import { getAnswers } from "../../services/answersService";
import { getCookie } from "../../helper/cookie";
import { getTopics } from "../../services/topicsService";
import { Link } from "react-router-dom";

export default function Answer() {
  const [dataAnswer, setDataAnswer] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answers = await getAnswers();
      const topics = await getTopics();
      const result = [];

      answers.forEach((answer) => {
        result.push({
          ...answer,
          ...topics.find((topic) => topic.id === answer.topicId),
          id: answer.id,
        });
      });

      setDataAnswer(result.reverse());
    };

    fetchApi();
  }, []);

  return (
    <>
      <div className="container">

        <h2>Danh sách bài đã luyện tập</h2>

        {dataAnswer.length > 0 && (
          <table className="content-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataAnswer.map((answer) => (
                <tr key={answer.id}>
                  <td>{answer.id}</td>
                  <td>{answer.name}</td>
                  <td>
                    <Link
                      to={`/result/${answer.id}`}
                      className="button button--sm"
                    >
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
