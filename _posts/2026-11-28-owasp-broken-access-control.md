---
title: "[OWASP Top 10 2025] Broken Access Control"
date: 2026-11-28 15:35:00 +0900
categories: ["블로그/기술문서"]
tags: [OWASP, Web Security, Access Control, IDOR]
---

## 1. What is OWASP Top 10?

OWASP(Open Worldwide Application Security Project)는 소프트웨어의 보안 수준을 높이기 위해 다양한 보안 지식과 자료를 제공하는 비영리 프로젝트이다.

OWASP Top 10은 웹 애플리케이션에서 발생할 수 있는 주요 보안 위험을 10가지로 정리한 문서로, 개발자와 보안 담당자가 주의해야 할 보안 문제를 파악하는 데 활용된다.

### OWASP Top 10 2025

| 순위 | 항목 | 설명 |
|---|---|---|
| A01 | Broken Access Control | 접근 통제 실패 |
| A02 | Security Misconfiguration | 보안 설정 오류 |
| A03 | Software Supply Chain Failures | 소프트웨어 공급망 보안 실패 |
| A04 | Cryptographic Failures | 암호화 실패 |
| A05 | Injection | 인젝션 |
| A06 | Insecure Design | 안전하지 않은 설계 |
| A07 | Authentication Failures | 인증 실패 |
| A08 | Software or Data Integrity Failures | 소프트웨어 및 데이터 무결성 실패 |
| A09 | Security Logging and Alerting Failures | 보안 로깅 및 경고 실패 |
| A10 | Mishandling of Exceptional Conditions | 예외 상황 처리 오류 |

이번 글에서는 2021년에 이어 2025년에도 1위를 차지한 Broken Access Control에 대해 알아보고자 한다.

## 2. Broken Access Control이란?

Broken Access Control은 접근 통제 실패를 의미하며, 사용자가 자신에게 허용되지 않은 데이터나 기능에 접근할 수 있는 보안 문제이다.

예를 들어 학교의 학사정보시스템에서 학생은 자신의 성적을 조회할 수 있지만, 교수만 성적을 수정할 수 있어야 한다.

그러나 접근 권한을 제대로 확인하지 않는다면 학생이 다른 학생의 성적을 조회하거나 자신의 성적을 수정할 수 있게 된다.

### 2.1 인증과 인가

접근 통제를 이해하기 위해서는 인증과 인가의 차이를 알아야 한다.

| 구분 | 설명 | 예시 |
|---|---|---|
| 인증(Authentication) | 사용자가 누구인지 확인하는 과정 | 아이디와 비밀번호를 통한 로그인 |
| 인가(Authorization) | 특정 데이터나 기능에 접근할 권한이 있는지 확인하는 과정 | 성적 수정 권한 확인 |

인증이 사용자의 신원을 확인하는 과정이라면, 인가는 해당 사용자가 무엇을 할 수 있는지 결정하는 과정이다.

따라서 로그인에 성공했더라도 모든 데이터와 기능에 접근할 수 있어서는 안 된다.

## 3. 대표적인 취약점 유형

### 3.1 IDOR(Insecure Direct Object Reference)

IDOR은 데이터의 식별자를 이용하여 객체에 접근할 때 사용자의 접근 권한을 제대로 확인하지 않아 발생하는 취약점이다.

예를 들어 쇼핑몰에서 자신의 주문 내역을 확인하는 URL이 다음과 같다고 가정하자.

```
https://example.com/orders/1001
```

여기서 1001은 주문 번호를 의미한다.

서버가 주문 번호만을 기준으로 데이터를 반환하고 해당 주문이 요청한 사용자의 것인지 확인하지 않는다면, 다른 사용자의 주문 정보가 노출될 수 있다.

즉, 데이터의 식별자 자체가 문제가 되는 것이 아니라 해당 데이터에 접근할 권한이 있는지 확인하지 않는 것이 문제이다.

### 3.2 수평적 권한 상승(Horizontal Privilege Escalation)

자신과 동일한 권한 수준을 가진 다른 사용자의 데이터나 기능에 접근하는 것을 의미한다.

예를 들어 다음과 같은 상황이 해당한다.

- 다른 사용자의 개인정보 조회
- 다른 사용자의 주문 내역 확인
- 다른 사용자가 작성한 게시물 무단 수정

앞서 설명한 IDOR은 수평적 권한 상승으로 이어질 수 있는 대표적인 취약점이다.

### 3.3 수직적 권한 상승(Vertical Privilege Escalation)

자신보다 높은 권한을 가진 사용자의 기능을 사용하는 것을 의미한다.

예를 들어 일반 사용자가 관리자만 사용할 수 있는 회원 정보 수정이나 계정 삭제 기능을 실행하는 경우이다.

서버에서 일반 사용자와 관리자의 권한을 제대로 구분하지 않을 때 발생할 수 있다.

### 3.4 클라이언트 측 권한 검증

웹 페이지에서 일반 사용자에게 관리자 메뉴를 숨기는 경우를 생각해 볼 수 있다.

화면에서 관리자 기능이 보이지 않더라도 서버에서 해당 기능에 대한 접근을 제한하지 않는다면 보안 문제가 발생할 수 있다.

따라서 화면에서 버튼이나 메뉴를 숨기는 것만으로는 충분하지 않으며, 서버에서도 접근 권한을 확인해야 한다.

## 4. 취약점 발생 원인

Broken Access Control의 주요 발생 원인은 다음과 같다.

- 로그인 여부만 확인하고 접근 권한은 확인하지 않는 경우
- 요청한 데이터의 소유권을 검증하지 않는 경우
- 클라이언트에서만 접근 권한을 확인하는 경우
- API에서 데이터 수정 및 삭제 권한을 검증하지 않는 경우
- 사용자에게 필요 이상의 권한을 부여하는 경우

이러한 문제는 사용자의 요청을 처리하기 전에 해당 작업을 수행할 권한이 있는지 충분히 확인하지 않아 발생한다.

## 5. 발생할 수 있는 피해

- 개인정보 및 민감정보 유출
- 데이터의 무단 수정 및 삭제
- 관리자 기능의 무단 사용
- 서비스 운영 방해
- 금전적 피해

특히 개인정보나 금융 정보를 다루는 서비스에서는 접근 통제 실패가 다수의 사용자에게 피해를 줄 수 있다.

## 6. 대응 및 예방 방법

### 6.1 서버 측 접근 권한 검증

사용자가 특정 데이터나 기능에 접근할 때마다 서버에서 해당 사용자의 권한을 확인해야 한다.

예를 들어 주문 내역을 조회할 때 로그인 여부뿐만 아니라 해당 주문의 소유자인지도 확인해야 한다.

### 6.2 최소 권한 원칙(Principle of Least Privilege)

사용자에게 필요한 최소한의 권한만 부여하는 원칙이다.

일반 사용자에게 관리자 권한을 부여하지 않는 것처럼 불필요한 권한을 제한하여 보안 사고가 발생했을 때 피해 범위를 줄일 수 있다.

### 6.3 기본 거부 원칙(Deny by Default)

공개된 자원을 제외하고는 기본적으로 접근을 차단하고, 접근 권한이 명시적으로 부여된 경우에만 허용하는 방식이다.

이를 통해 권한 설정이 누락되었을 때 데이터나 기능이 의도치 않게 노출되는 것을 방지할 수 있다.

### 6.4 접근 통제 테스트 및 로그 관리

개발 과정에서 서로 다른 권한을 가진 계정을 이용하여 접근 통제가 정상적으로 이루어지는지 테스트해야 한다.

또한 권한이 없는 접근 시도를 로그에 기록하고 반복적인 접근 실패가 발생할 경우 이를 확인할 수 있도록 관리해야 한다.

## 7. OWASP Top 10 2025 보안 동향

Broken Access Control은 OWASP Top 10 2021에 이어 2025년에도 1위를 유지하였다.

OWASP 공식 문서에서 제공하는 주요 통계는 다음과 같다.

| 항목 | 수치 |
|---|---:|
| 관련 CWE 유형 수 | 40개 |
| 최대 발생률 | 20.15% |
| 평균 발생률 | 3.74% |
| 전체 발견 건수 | 1,839,701건 |
| 관련 CVE 수 | 32,654건 |

CWE(Common Weakness Enumeration)는 소프트웨어에서 발생할 수 있는 보안 약점의 유형을 분류한 것이며, CVE(Common Vulnerabilities and Exposures)는 공개된 개별 보안 취약점을 식별하기 위한 체계이다.

2025년에는 기존에 독립적인 항목이었던 SSRF(Server-Side Request Forgery)도 Broken Access Control에 포함되었다.

SSRF는 서버가 사용자의 요청을 처리하는 과정에서 의도하지 않은 내부 또는 외부 자원에 접근하도록 유도하는 취약점이다.

Broken Access Control이 계속해서 1위를 유지하고 있다는 점에서 접근 권한을 관리하는 문제가 여전히 웹 애플리케이션 보안에서 중요하게 다루어지고 있음을 알 수 있다.

## 8. 느낀 점

Broken Access Control에 대해 공부하면서 로그인 기능이 정상적으로 구현되어 있더라도 접근 권한을 제대로 확인하지 않으면 보안 문제가 발생할 수 있다는 것을 알게 되었다.

특히 화면에서 특정 기능을 숨기는 것과 실제 접근 권한을 제한하는 것이 다르다는 점이 인상적이었다.

단순한 권한 검증 누락만으로도 개인정보 유출이나 관리자 기능의 무단 사용으로 이어질 수 있기 때문에 개발 단계에서부터 사용자의 권한을 구분하고 이를 검증하는 과정이 중요하다고 생각한다.

앞으로 웹 취약점을 공부할 때에도 인증 과정뿐만 아니라 사용자가 허용된 범위 내에서만 데이터와 기능에 접근할 수 있는지 함께 살펴보고자 한다.

## 참고자료

- [OWASP Top 10 2025 공식 홈페이지](https://top10.owasp.org/2025/)
- [OWASP A01:2025 – Broken Access Control](https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP IDOR Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html)
- [PortSwigger – Access Control Vulnerabilities](https://portswigger.net/web-security/access-control)
- [MITRE CWE-862 – Missing Authorization](https://cwe.mitre.org/data/definitions/862.html)
