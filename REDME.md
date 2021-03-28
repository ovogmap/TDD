# TDD(테스트주도개발 with Node Express)

TDD 즉 테스트주도개발 이란것은 처음 프로그래밍을 공부할때부터 들어왔던
개발 패턴이다. 많은 기업들이 우대사항으로 유닛테스트, 단위테스트, 테스트 주도 개발을 경험해보신분 이라고 작성해두는 경우가 많고 알고 있었지만, 취업을 준비하던 시기에 팀프로젝트와, 개인프로젝트 등등 다른것들에 밀려 공부하지 못했다.

지금 현재에는 프론트 엔드 개발자 신입 개발자로 일한지 4개월이 지났다. 회사에서 시작하는 신규프로젝트에 바로 투입 되었고 상용하는 기술 스택으로는 Typescript, React, Graphql, Apollo client를 사용해 개발하고 있다.
잡담이 길었는데 내가 TDD에 관심을 가지고 공부해야겠다고 생각하게 된 이유는 개발을 하고 테스트를 하는 과정에서 똑같은 플로우로 스토리를 진행 시키는데 어쩔땐 에러가 발생하고, 잘되다가고 에러가 발생하고 이런 경우들이 생기는걸 보고 아~ 처음 작업할때부터 테스트를 작성하면서 개발했으면 이런 일이 일어나지 않았을까? 라는 생각을 하게되었고 때마침 인프런에 김정환님의 TDD개발 강의가 할인을 하고 있어 결제하고 퇴근후 한시간씩 강의를 보며 공부해보았다.

프론트엔드 개발직무를 담당하고 있는데 왜 node express강의를 선택했냐면
지금 구상중인 개인프로젝트의 백엔드를 만들어 보고싶어 express도 공부할겸 선택하게 되었다.

<br/>

# Node js

웹 브라우저 환경이 아닌곳에서 자바스크립트를 구동할수있게 해주는
구글의 V8엔진기반 자바스크립트의 런타임 도구이다.

<br/>

# Express

node js에서 더 쉽게 서버를 만들수 있게 도와주는 프레임워크이다.
<br/><br/>

## 사용된 테스트 도구

- mocha
- superTest

---

## 적용한 개발 패턴

1. API의 성공시, 실패시 res조건 에 맞는 테스트 코드 작성
2. 테스트 코드를 실행 해보고 조건에 맞게 API를 작성
3. 완성된 API로 테스트 코드 실행
4. 테스트를 통과하면 다음 작업

---

## API의 성고, 실패의 res 정의

- 성공

  - 유저 객체를 담은 배열로 응답한다.
  - 최대 limit 개수만큼 응답한다.
    - limit은 파라미터로 number type의 배열의 최대 인덱스를 뜻 한다.

- 실패
  - limit이 숫자형이 아니면 400을 응답한다.
  - offset이 숫자형이 아니면 400을 응답한다.

## 테스트 코드 작성

```
describe("GET /users는", () => {
  describe("성공시", () => {
    it("유저 객체를 담은 배열로 응답한다 ", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it("최대 limit 갯수만큼 응답한다", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시 ", () => {
    it("limit이 숫자형이 아니면 400을 응답한다", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});
```

## api작성

```
const index = (req, res) => {
  req.query.limit = req.query.limit || 10;

  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) return res.status(400).end();

  models.User.findAll({
    limit: limit,
  }).then((users) => {
    res.json(users);
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  models.User.findOne({
    where: { id },
  }).then((user) => {
    if (!user) return res.status(404).end();
    res.json(user);
  });
};
```
