---
alwaysApply: true
---

# PRD: {{PRODUCT_NAME}}

> 이 문서는 하네스 문서 중 **유일한 누적형 문서**다. 단위 작업 문서(`docs/harness/TASK_RESULT.md`, `REVIEW.md`)는 커밋 시점에 아카이브되므로, 이후에도 알아야 할 결정만 §14 설계 결정 기록으로 승격시킨다.
>
> 기술 스택과 검증 커맨드는 `docs/TECH_STACK.md`, 코드 규칙은 `.rules`가 SSOT다. 여기에 중복 기술하지 않는다.

## 1. 개요

### 제품명

{{PRODUCT_NAME}}

### 목적

{{PRODUCT_PURPOSE}}

### 한 줄 소개

{{ONE_LINE_DESCRIPTION}}

## 2. 문제 정의

### 현재 문제

- {{PROBLEM_1}}
- {{PROBLEM_2}}
- {{PROBLEM_3}}

### 개선 필요성

{{WHY_NOW}}

## 3. 목표

### 핵심 목표

{{PRIMARY_GOAL}}

### 정량 목표

- {{METRIC_GOAL_1}}
- {{METRIC_GOAL_2}}
- {{METRIC_GOAL_3}}

### 정성 목표

- {{QUALITATIVE_GOAL_1}}
- {{QUALITATIVE_GOAL_2}}
- {{QUALITATIVE_GOAL_3}}

## 4. 대상 사용자

### 1차 사용자

- {{PRIMARY_USER_1}}
- {{PRIMARY_USER_2}}

### 2차 사용자

- {{SECONDARY_USER_1}}
- {{SECONDARY_USER_2}}

## 5. 핵심 사용자 시나리오

### 시나리오 1: {{SCENARIO_1_TITLE}}

1. {{SCENARIO_1_STEP_1}}
2. {{SCENARIO_1_STEP_2}}
3. {{SCENARIO_1_STEP_3}}

### 시나리오 2: {{SCENARIO_2_TITLE}}

1. {{SCENARIO_2_STEP_1}}
2. {{SCENARIO_2_STEP_2}}
3. {{SCENARIO_2_STEP_3}}

### 시나리오 3: {{SCENARIO_3_TITLE}}

1. {{SCENARIO_3_STEP_1}}
2. {{SCENARIO_3_STEP_2}}
3. {{SCENARIO_3_STEP_3}}

## 6. 주요 기능

### 6.1 {{FEATURE_1_NAME}}

#### 설명

{{FEATURE_1_DESCRIPTION}}

#### 주요 요구사항

- {{FEATURE_1_REQUIREMENT_1}}
- {{FEATURE_1_REQUIREMENT_2}}
- {{FEATURE_1_REQUIREMENT_3}}

### 6.2 {{FEATURE_2_NAME}}

#### 설명

{{FEATURE_2_DESCRIPTION}}

#### 주요 요구사항

- {{FEATURE_2_REQUIREMENT_1}}
- {{FEATURE_2_REQUIREMENT_2}}
- {{FEATURE_2_REQUIREMENT_3}}

### 6.3 {{FEATURE_3_NAME}}

#### 설명

{{FEATURE_3_DESCRIPTION}}

#### 주요 요구사항

- {{FEATURE_3_REQUIREMENT_1}}
- {{FEATURE_3_REQUIREMENT_2}}
- {{FEATURE_3_REQUIREMENT_3}}

## 7. MVP 범위

### 포함

- {{MVP_INCLUDED_1}}
- {{MVP_INCLUDED_2}}
- {{MVP_INCLUDED_3}}

### 제외

- {{MVP_EXCLUDED_1}}
- {{MVP_EXCLUDED_2}}
- {{MVP_EXCLUDED_3}}

## 8. 화면 구성

### 8.1 {{SCREEN_1_NAME}}

- {{SCREEN_1_ELEMENT_1}}
- {{SCREEN_1_ELEMENT_2}}
- {{SCREEN_1_ELEMENT_3}}

### 8.2 {{SCREEN_2_NAME}}

- {{SCREEN_2_ELEMENT_1}}
- {{SCREEN_2_ELEMENT_2}}
- {{SCREEN_2_ELEMENT_3}}

### 8.3 {{SCREEN_3_NAME}}

- {{SCREEN_3_ELEMENT_1}}
- {{SCREEN_3_ELEMENT_2}}
- {{SCREEN_3_ELEMENT_3}}

## 9. 데이터 모델 초안

```ts
type ExampleStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

type ExampleEntity = {
  id: string;
  name: string;
  status: ExampleStatus;
  createdAt: string;
  updatedAt: string;
};
```

## 10. 성공 기준

- {{SUCCESS_CRITERION_1}}
- {{SUCCESS_CRITERION_2}}
- {{SUCCESS_CRITERION_3}}

## 11. 추천 기술 스택

초안 단계의 후보만 적는다. 확정된 스택과 버전, 검증 커맨드는 `docs/TECH_STACK.md`가 SSOT다.

- {{TECH_STACK_1}}
- {{TECH_STACK_2}}
- {{TECH_STACK_3}}

## 12. 우선순위

### 1차

- {{PHASE_1_ITEM_1}}
- {{PHASE_1_ITEM_2}}
- {{PHASE_1_ITEM_3}}

### 2차

- {{PHASE_2_ITEM_1}}
- {{PHASE_2_ITEM_2}}
- {{PHASE_2_ITEM_3}}

### 3차

- {{PHASE_3_ITEM_1}}
- {{PHASE_3_ITEM_2}}
- {{PHASE_3_ITEM_3}}

## 13. 오픈 이슈

- {{OPEN_ISSUE_1}}
- {{OPEN_ISSUE_2}}
- {{OPEN_ISSUE_3}}

## 14. 설계 결정 기록 (ADR)

단위 작업 문서는 커밋 후 아카이브되므로, **이후 작업에서도 알아야 할 결정만** 여기로 승격시킨다. 되돌리기 어렵거나 다음 작업의 전제가 되는 결정이 대상이다.

| 일자 | 결정 | 근거 | 검토한 대안 | 관련 작업 |
| --- | --- | --- | --- | --- |
| {{ADR_DATE}} | {{ADR_DECISION}} | {{ADR_RATIONALE}} | {{ADR_ALTERNATIVES}} | {{ADR_TASK_ID}} |

## 15. 작업 로드맵

`docs/harness/TASK_PLAN.md`로 내려보낼 단위 작업의 대기열이다. 상세 내용은 `TASK_PLAN.md`가 담고, 여기에는 순서와 상태만 유지한다.

| 순서 | 작업 | 이슈 코드 | 상태 |
| --- | --- | --- | --- |
| 1 | {{TASK_1_NAME}} | {{TASK_1_ISSUE}} | 대기 / 진행중 / 완료 |
| 2 | {{TASK_2_NAME}} | {{TASK_2_ISSUE}} | 대기 |

완료된 작업은 상태만 갱신하고, 결과는 `docs/harness/archive/{issue-code}/`를 참조한다.

## 16. 변경 로그

문서 전체 이력은 git이 담당한다. 여기에는 제품 방향이 바뀐 시점만 한 줄로 남긴다.

- {{CHANGE_DATE}}: {{CHANGE_SUMMARY}}
