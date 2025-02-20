# ✈️ Travel Guard

**TravelGuard** 는 전 세계 여행객들의 안전 여행을 위해 **국가별 여행 경보 단계**, **대사관 연락처**, **여권 정보** 등을 활용하여, 여행 시 필요한 정보를 쉽게 확인하고 안전한 여행을 돕기 위한 서비스입니다.

### 🌐 배포 링크

[Travel Guard 배포 링크](https://travelguard-jade.vercel.app/)

## #️⃣ 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [구성 요소](#구성-요소)
- [API](#api)

## 🔍 주요 기능

### 🌏 **국가별 여행 경보 레벨 표시**
| ![메인](https://github.com/user-attachments/assets/7ce5a49e-43a4-49ea-a2b2-031f0ce040ff) |
|:--:|
| `react-globe.gl`을 사용하여 3D 지구본을 구현하고, 국가별로 5단계의 색상으로 위험 경보 레벨을 시각화하여 한눈에 위험 단계를 확인할 수 있습니다. |

### ☎️ **국가별 대사관 정보 조회**
| ![국가별](https://github.com/user-attachments/assets/b164df8f-2016-4f63-9bd9-ff8c87ed3951) | ![여권](https://github.com/user-attachments/assets/eeb5fd2a-832d-43b5-8f5f-42f610ad7e7f) |
|:--:|:--:|
| 선택한 국가의 대사관 정보를 조회할 수 있습니다. | 대사관의 주소, 전화번호, 긴급 연락처 등의 정보를 제공합니다. |

### 🛂 **입국 허가 요건 조회**
| ![입국허가](https://github.com/user-attachments/assets/e026f1c6-9af1-472b-82f2-14945fbba766) |
|:--:|
| 국가별로 여권 관련 정보를 제공하여, 국가별 입국 가능 기간, 입국 가능 여부, 입국 시 소지 여부 등 필요한 정보를 쉽게 확인할 수 있습니다. |

### 📰 **여행 안전 뉴스 제공**
| ![국가디테일](https://github.com/user-attachments/assets/933b6ce7-746c-40d5-9f88-1e9bfd801e35) |
|:--:|
| 선택한 국가와 관련된 최신 여행 안전 뉴스를 제공하여, 관련 뉴스 정보를 빠르게 확인할 수 있습니다. |

## 🛠️ 기술 스택

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-CB3837?style=for-the-badge&logo=emotion&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![globe.gl](https://img.shields.io/badge/globe.gl-FF6F61?style=for-the-badge&logo=globe&logoColor=white)

**API:**

- [외교부\_국가·지역별 재외공관 정보](https://www.data.go.kr/iim/api/selectAPIAcountView.do)
- [외교부\_국가∙지역별 안전공지](https://www.data.go.kr/iim/api/selectAPIAcountView.do)
- [외교부\_국가·지역별 여행경보 목록 조회(0404 대륙정보)](https://www.data.go.kr/iim/api/selectAPIAcountView.do)

<details>
<summary> ☑️ 진행상황 </summary>

- [x] API 데이터 SET & 공통 Component 생성

---

- [x] [Main] globe.gl 연동 & 대륙 입히기
- [x] [Main] 배경 Color + 별 추가
- [x] [Main] 위험 경보 API - 3D 지구본 연동
- [x] [Main] Mobile & Web UI 최적화

---

- [x] [국가별 정보] API 연동
- [x] [국가별 정보] 국가 별 정보 (전체 / 디테일)페이지 제작
- [x] [국가별 정보] 검색 및 단계 별 정렬 구현
- [x] [국가별 정보] Mobile & Web UI 최적화

---

- [x] [국가별 대사관 정보] API 연동
- [x] [국가별 대사관 정보] 국가 별 정보 (전체 / 디테일)페이지 제작
- [x] [국가별 대사관 정보] 검색 및 단계 별 정렬 구현
- [x] [국가별 대사관 정보] Mobile & Web UI 최적화
- [ ] Encountered two children with the same key ``에러 해결 . . .

---

</details>

<details>
<summary> ⚠️ ERROR / 최적화</summary>

- [x] [입국 허가요건 & 국가별 대사관 정보] 모바일 표 사이즈 최적화
- [x] [전체] 기존 화면 비율 (75% 기준) -> 현재 화면 비율 (100% 기준) 최적화
- [x] API 데이터 fetch 성능 높이기 (router 분리 / lazy load)
</details> 
