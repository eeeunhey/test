좋아 🙆 깃 클론만 하면 바로 실행할 수 있도록 **실행 매뉴얼(MD)** 정리해줄게.
이걸 `README.md` 같은 곳에 두면 다른 PC에서도 바로 따라 할 수 있어.

---

# 🚀 실행 방법

## 1. 준비물

* [Docker](https://docs.docker.com/get-docker/) 설치 필요
* Git 설치 필요

---

## 2. 프로젝트 클론

```bash
git clone <YOUR_REPOSITORY_URL>
cd INTERVIEWPROJECT
```

---

## 3. 실행 방법

### 방법 A. `docker-compose` 사용 (추천 ✅)

루트(`INTERVIEWPROJECT`)에 있는 `docker-compose.yml`로 실행합니다.

```bash
# 컨테이너 빌드 및 실행
docker compose up --build
```

➡ 브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

컨테이너 중단:

```bash
docker compose down
```

---

### 방법 B. Docker CLI 직접 사용

```bash
cd frontend/Ai_Interview

# 이미지 빌드
docker build -t ai-interview-dev .

# 컨테이너 실행
docker run -it -p 5173:5173 ai-interview-dev
```

➡ 브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

---

## 4. 개발 모드 (선택)

`docker-compose.yml`에는 **소스 코드 볼륨 마운트**가 설정되어 있어,
코드를 수정하면 컨테이너 안에서도 바로 반영됩니다.
즉, 다른 PC에서도 `npm run dev`처럼 바로 개발할 수 있습니다.

---

✅ 이제 다른 PC에서 **`git clone → docker compose up`** 만 하면 바로 실행돼.

혹시 내가 `docker-compose.yml` 최종본까지 같이 붙여서 정리해줄까?
