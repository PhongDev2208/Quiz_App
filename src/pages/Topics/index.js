import { useEffect, useState } from "react";
import { getTopics } from "../../services/topicsService";
import { Link } from "react-router-dom";

export default function Topic() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchApi = async function () {
      const respond = await getTopics();
      setTopics(respond);
    };

    fetchApi();
  }, []);

  return (
    <>
      <div className="container">

        <h2>Danh sách các chủ đề luyện tập</h2>

        {topics.length > 0 && <table className="content-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => (
              <tr key={topic.id}>
                <td>{topic.id}</td>
                <td>{topic.name}</td>
                <td>
                  <Link to={`/quiz/${topic.id}`} className="button button--sm">
                    Làm bài
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </>
  );
}
