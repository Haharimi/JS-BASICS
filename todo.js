const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//JSON.stringify()는 object를 string으로 변환시켜준다
}

function paintToDo(text) {
    const li = document.createElement("li"); //li 생성
    const delBtn = document.createElement("button"); //buttion 생성, createElement();
    delBtn.innerText ="❌";
    const span = document.createElement("span")
    const newId = toDos.length + 1;
    span.innerText = text;
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
    toDoIuput.value = "";
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