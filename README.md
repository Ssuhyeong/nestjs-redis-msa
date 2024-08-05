# Redis Pub/Sub을 통한 Microsservice Architecture 구축

![image](https://github.com/user-attachments/assets/b65484ee-88d5-4d37-8f3a-b6f1d2e4a1ef)

<br/>

## ✅ MSA ( Microservice Architecture )
* 시스템을 독립적인 단위의 작은 서비스들로 분리
* 각 서비스들이 사용하는 DB도 분리
* 각 서비스들은 API(인터페이스)를 통해서만 통신

### 장점
* 모듈성(높은 응집도, 낮은 결합도)
* 서비스 별로 독립적인 개발과 배포가 가능
* 서비스 크기가 작아져 이해가 쉽고 유지보수 용이
* 더 빠른 개발, 테스트, 배포
* 확장성, 결함 격리

### 단점
* 분산 시스템의 단점을 가짐
* 통합 테스트의 어려움
* 모니터링과 디버깅의 복잡도 증가
* 트랜잭션 관리의 어려움
* 서비스간 통신 구조에 대한 고민 필요

<br/>

![image](https://github.com/user-attachments/assets/f248ed03-981c-40e1-b03d-e32eba91df8d)

## ✅ Redis Pub/Sub 활용

![image](https://github.com/user-attachments/assets/b1b8fb4a-a0ef-4241-a63b-6f5951e7bda7)

* Redis 서버를 매개로, Redis 클라이언트간 통신을 도움
* Reids 클라이언트는 Redis 서버 내 "채널"을 생성함
* 메시지를 수신하고 싶은 클라이언트는 사전에 해당 채널을 subscribe 함
* 메시지를 보내는 클라이언트는 해당 채널에 메시지를 publish할 수 있음
* 메시지를 보내는 클라이언트가 메시지를 publish하면, subscribe 중인 클라이언트만 메시지를 수신

# + jwt authentication ( accessToken & refreshToken )
* Secret key ( access & refresh ) 기반으로 유저 데이터 암호화
* hashing 알고리즘 Argon2를 활용하여 MongoDB에 password & refreshtoken 암호화

![image](https://github.com/user-attachments/assets/c1b45739-e5fa-4434-b44a-a4e0497b6d30)
