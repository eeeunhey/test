
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //로그인 버튼 눌렀을 때 실행되는 함수
  const handleLogin = async (e) => {
    e.preventDefault();

      if(!validateEmail(email)) {
        setError("올바른 이메일 주소를 입력하세요")
        return;
      }

      if (!password) {
        setError("비밀번호를 다시 입력해 주세요")
        return;
      }

      setError("");

      //로그인 API 호출하기 위한 코드
      try {
      } catch(error) {
        if(error.response && error.response.data.message) {
          setError(error.response.data.massage);
        } else {
          setError("로그인에 실패했습니다. 죄송하지만 다시 시도해주세요")
        }
      }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-12 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-gray-700">환영합니다!</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        로그인을 위해 정보를 입력해 주세요.
      </p>

      <form onSubmit={handleLogin}>
        <div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="이메일 주소"
            placeholder="heysee@example.com"
            type="email"
            autoComplete="email"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="비밀번호"
            placeholder="8글자 이상 입력하세요"
            type="password"
            autoComplete="current-password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            아직 계정이 없으신가요?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => {
                setCurrentPage("signup");
              }}
            >
              SignUp
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
