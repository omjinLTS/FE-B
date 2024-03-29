const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  resetBtn = document.querySelector(".js-reset"),
  addBtn = document.querySelector(".js-add");

const TODOS_LS = "toDos";
let toDos = [];

const handleReset = (event) => {
  toDoList.replaceWith("");
  toDos = [];
  saveToDos();
  window.location.reload();
};

const deleteToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
};

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => {
      paintToDo(toDo.text);
    });
  }
};

const saveToDos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

const editToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  const text = span.innerText;

  li.removeChild(span);
  const input = document.createElement("input");
  input.value = text;
  li.prepend(input);
  btn.innetText = "확인";
  btn.removeEventListener("click", editToDo);
  btn.addEventListener("click", (event) => {
    const newText = input.value;
    span.innerText = newText;
    li.prepend(span);
    li.removeChild(input);
    btn.innetText = "수정";
    btn.addEventListener("click", editToDo);
    const toDoObj = {
      text: newText,
      id: parseInt(li.id),
    };
    toDos = toDos.map((toDo) => {
      if (toDo.id === parseInt(li.id)) {
        return toDoObj;
      } else {
        return toDo;
      }
    });
    saveToDos();
  });
};

const paintToDo = (text) => {
  if (text !== "") {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    editBtn.innerText = "수정";
    editBtn.addEventListener("click", editToDo);
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", deleteToDo);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    li.id = newId;
    toDoList.prepend(li);

    const toDoObj = {
      text: text,
      id: newId,
    };
    toDos.push(toDoObj);
    saveToDos();
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const currentValue = toDoInput.value;
  toDoInput.value = "";
  paintToDo(currentValue);
};

const init = () => {
  loadToDos();
  addBtn.addEventListener("click", handleSubmit);
  toDoForm.addEventListener("submit", handleSubmit);
  resetBtn.addEventListener("click", handleReset);
};

init();
