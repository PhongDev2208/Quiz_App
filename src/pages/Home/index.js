import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const isLogin = useSelector((state) => state.authenReducer);

  return (
    <>
      <div className="container">
        {isLogin && (
          <>
            <p>Chúc mừng bạn đăng nhập thành công!!</p>
            <Link to="topics">
              <button className="button" style={{ marginRight: "10px" }}>
                Danh sách chủ đề ôn luyện
              </button>
            </Link>
            <Link to="answers">
              <button className="button">Danh sách bài đã luyện tập</button>
            </Link>
            <hr />
          </>
        )}

        <p>
          Website trắc nghiệm online lập trình FrontEnd là một nền tảng trực
          tuyến cho phép các lập trình viên FrontEnd thực hiện các bài kiểm tra,
          trắc nghiệm, đánh giá và đo đạc kiến thức của mình trong lĩnh vực lập
          trình FrontEnd.
        </p>
        <p>
          Đối với các lập trình viên FrontEnd, website trắc nghiệm online cung
          cấp các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng của mình
          trong các công nghệ và công cụ lập trình như HTML, CSS, Javascript,
          JQuery, Bootstrap, Angular, React, Vue,...
        </p>
      </div>
    </>
  );
}
