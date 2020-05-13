const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input")
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) { //delBtn 클릭 시 todolist 삭제
    const btn = event.target;
    const li = btn.parentNode;//삭제할 li 
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); 
        //toDos li의 id와 삭제된 li의 id값이 같지 않는 것만 반환하는 filter 함수실행
        //li.id가 문자열이기때문에 숫자로 변환해주는 parseint실행
    });
    toDos = cleanToDos; //toDos를 cleanToDos로 대체
    saveTodos(); //실행된 새로운 결과값을 저장 
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//JSON.stringify()는 object를 string으로 변환시켜준다
}

function paintToDo(text) {
    const li = document.createElement("li"); //li 생성
    const delBtn = document.createElement("button"); //buttion 생성, createElement();
    delBtn.innerText = "❌";
    delBtn.className = "del_button";
    li.className ="li_list";
    delBtn.addEventListener("click", deleteToDo);//delBtn 클릭 시, 리스트를 삭제하는 이벤트 추가 
    const span = document.createElement("span")
    const newId = toDos.length + 1;
    span.innerText = text; //span태그 인자에 추가 
    li.appendChild(delBtn);//li(부모)에 delBtn(자식) 추가 
    li.appendChild(span); //li(부모)에 span(자식) 추가 
    li.id = newId; //li에 id 추가하기 
    toDoList.appendChild(li); //toDoList(부모)에 li 요소 추가 
    const toDoObj = {
        text : text,
        id : newId //toDos가 빈 배열일 때 1로 표시
    };
    toDos.push(toDoObj); //toDos배열에 toDoObj 추가 
    saveTodos();
}

function handleSubmit(event) {
    event.preventDefault(); //기본동작 제어 
    const currentValue = toDoInput.value; //value값 가져오기 
    paintToDo(currentValue); 
    toDoInput.value = ""; //submit처럼 값을 보냈을 때 Input의 value 값 초기화
}
    

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) { //loadedToDos에 저장된 데이터가 있다면
        const parsedToDOs = JSON.parse(loadedToDos);//JSON.parse()는 string을 object로 변환시켜준다
        console.log(parsedToDOs);
        parsedToDOs.forEach(function(toDo) {
        paintToDo(toDo.text);
        })
    }
}   

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit); //toDoForm에 submit 이벤트 추가, handleSubmit으로 이벤트 처리 
}

init();