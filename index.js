const express = require("express");
const app = express();

function commonmw(req, res, next) {
  console.log("commonmw");
  next(new Error("error ouccered"));
}

function errormw(err, req, res, next) {
  console.log(err.message);
  // 에러를 처리하거나
  next();
}

app.use(commonmw);
app.use(errormw);

app.listen(3000, () => {
  console.log("Sever is Running");
});

// // 미들웨어의 파라미터로 넣어줘야 하는 값
// // 미들웨어의 마지막은 next함수의 호출이다 다음 동작을 실행하기 위한.
// function logger(req, res, next) {
//   console.log("i am logger!");
//   // next를 호출하지 않으면 다음 동작을 수행하지 않는다.
//   next();
// }

// function logger2(req, res, next) {
//   console.log("i am logger2");
//   next();
// }

// // 미들웨어 추가
// app.use(logger);
// app.use(logger2);
// app.use(morgan("dev"));

// app.listen(3000, () => {
//   console.log("Sever is Running");
// });
