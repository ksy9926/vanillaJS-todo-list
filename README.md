완료

1. 리스트 추가(할일, 날짜/시간, 완료버튼, 편집버튼)
2. 리스트 내용 완료시 가운데 줄
3. 리스트 내용 편집으로 내용 수정
4. 새로고침 시에도 목록이 사라지지 않고 이전의 기록 유지(Local Storage)
5. 리스트 삭제
   5-1. 삭제 버튼 클릭시 체크 버튼 나타남(전체 선택 버튼도 위에)
   5-2. 몇 개를 체크하든지 상관없이 전체버튼 클릭시 모두 선택
6. 완료 버튼 클릭시 완료한 리스트만 출력
7. 진행중 버튼 클릭시 진행중인 리스트만 출력

진행중

8. 검색창에 단어 입력시 해당하는 내용만 리스트에 띄우기

미해결

React에서는 input 값이 바뀔때마다 onChange가 발생했는데 javascript는 인풋이 끝나고 포커스를 잃을때만 발생함.
oninput 사용시에는 입력이 바뀔때마다 발생하지만 input값이 바뀌면 rendering이 일어나서 포커스를 잃게 됨.
