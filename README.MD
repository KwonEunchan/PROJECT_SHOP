# What is this project?

## 개 요
남성 의류를 판매하는 쇼핑몰입니다. 

## 개발 의도
쇼핑몰은 회원 등록부터 접속, 그리고 상품을 장바구니로 이동 및 삭제하는 등 실제 서비스에 필요한 모든 요소를 갖춘 단골 프로젝트 주제입니다.  
거기에 스크롤을 이용해 UI를 동작하므로 이용자가 재미를 느낄 수 있도록 하였습니다.  
개인적으로 개발 역량과 더불어 센스를 좀 더 어필하고 싶었습니다.

## 사용 스킬
### REACT
쇼핑몰이라는 특성상 여러 화면에서 상품 컴포넌트를 대량으로 표시할 일이 많습니다.  
REACT의 반복문을 이용하여 손 쉽게 많은 컴포넌트를 렌더링할 수 있었습니다.  
또, 순수 JS로는 조작하기가 조금 까다로운 ookie를 React Hooks로 제공해주었기에 좀 더 편리하게 개발할 수 있었습니다.  
state 문법을 통해 원하는 컴포넌트를 필요할 때마다 렌더링하는 'Single Page Application' 입니다.  

### SCSS
그러나 Nested 구조로 작성된 코드를 유지보수하는 과정에서 충분히 강점을 느꼈습니다.

### Axios 
서버와의 통신을 위해 사용하였습니다.  
필요할 때마다 원하는 데이터를 동적으로 받아올 수 있어 마찬가지로 'Single Page Application' 구현에 도움을 주었습니다.

### Spring
클라이언트 요청에 따라 적절한 데이터를 내려줄 서버를 구현하였습니다.   
회원가입과 로그인과 같은 민감한 정보를 통신할 때는 보안성이 우수한 POST 방식을 채택하였습니다.  

### Oracle DB
회원 정보와 상품 정보를 저장할 데이터베이스로 Oracle사의 제품을 사용하였습니다. 
JDBC를 이용하여 접근하는 로직을 구현하였습니다.

### REDUX
전역으로 state를 사용할 수 있게 해주는 상태 관리 라이브러리를 사용하였습니다.  
로그인 정보 등을 모든 컴포넌트에서 공유하여 수행 가능한 동작을 제어하였습니다.

## 고 찰
### Too many Rendering
REACT에서는 반복문을 이용해 중복되는 컴포넌트를 간결하게 렌더링할 수 있습니다.  
그래서 상품 컴포넌트를 반복문을 이용하여 렌더링하도록 코드를 작성하였더니 해당 오류가 발생하였습니다.  
직접 개수를 줄여가며 확인한 결과, 25개 이상의 반복 렌더링은 REACT에서 제한하는 듯 합니다.  

### REACT-COOKIES
REACT는 개발자가 cookie를 좀 더 편하게 다룰 수 있도록 하는 강력한 hooks를 제공합니다.  
개발 전 react-cookies 라이브러리를 인스톨하여 사용할 수 있었습니다.  
로그인 정보를 cookie에 저장하여 로그인을 유지하도록 설계하였습니다.   
  - npm i react-cookies
  - const [cookie,setCookie,removeCookie] = useCookies() 
     - cookie.get([name]) : name에 해당하는 cookie 값을 반환합니다.
     - setCookie([name],[value]) : value라는 값을 name이라는 이름으로 cookie에 저장합니다.
     - removeCookie([name]) : name이라는 이름의 cookie를 제거합니다.

### getComputedStyle
REACT는 기본적으로 비동기 방식이므로, 해당 컴포넌트가 렌더링되기도 전에 그것을 선택하는 코드가 먼저 수행될 수도 있습니다.  
본 프로젝트에서도 어느 요소의 height 값을 읽어오고자 했으나 의도한 결과가 나오지 않았습니다.  
그렇게 알게 된 것이 아래와 같은 문법입니다.  
getComputedStyle 객체는 target의 style이 변경될 때마다 자동으로 업데이트가 된다고 합니다.
- window.getComputedStyle([target]).[style] 
    
