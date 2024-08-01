# Redis Pub/Sub을 통한 Microsservice Architecture 구축

<br/>

## MSA ( Microservice Architecture )
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
