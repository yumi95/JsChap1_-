const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
// 해야 할 일을 추가할 때마다 array에 추가해주자.
let idNumbers = 1;
// 버그 : to do를 하나 삭제하고 새로운 to do를 추가하면
// id가 중복되는 현상. 서로 id가 중복되는 to do 중 하나를
// 제거하면 동시에 같은 id의 to do들이 함께 삭제된다.

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const claenToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
        // 모든 toDos가 'li'의 id와 같지 않을 때
        // li.id를 String에서 Number로 변환
    });
    // console.log(claenToDos);
    // 삭제를 하면 cleanToDos는 2개이며,
    // toDos는 3개이다.
    // 이제 toDos를 cleanToDos로 바꾸어주면 된다.
    toDos = claenToDos;
    saveToDos();
}

// toDos를 가져와서 로컬에 저장해보자. 
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // JSON은 자바스크립트의 object를 string으로 바꾸어준다.
}

function paintToDo(text){
    const li = document.createElement("li");
    // li 안에 span을 넣는 이유? 
    // li는 컨테이너이고, 그 안에 span인 text와 button이 들어간다.
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    idNumbers += 1;
    // toDos 배열과 무관하게 id 값을 저장할 수 있는
    // 변수 idNumbers를 생성한다.
    // 새로운 to do를 생성할 때마다 idNumbers의 현재 값을
    // id로 지정하고 idNumbers의 값을 1씩 증가 시켜준다.
    // 부연 설명 : idNumber 변수의 값은 새로운 to do가 생성될
    // 때마다 증가하지만, 생성된 to do를 삭제했을 때는
    // 값이 변하지 않음.
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text, 
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            // forEach는 array를 위한 function
            paintToDo(toDo.text);
        });
    } 
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();