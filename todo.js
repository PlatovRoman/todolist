
// {
//   taskName,
//   priority,
//   timeCreate,
//   id,
//   isCompleted,
//   timeConfirm,
//   timeCancel
// }

//глобальные данные/////////////////////////////////////////////////////////////////////////////////////////////////////
let tasks = [];
let filterStatus = {
    isCompleted: false,
    isHigh: false,
    isNormal: false,
    isLow: false
};
let tasksFiltered = [];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//обрабатываем нажатие ДОБАВИТЬ/////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('add').onclick = function () {

    if (document.getElementById('input').value === '') {
        alert('Вы не ввели задачу.');
        return;
    };

    let newId = 0;
    tasks.length === 0 ? newId = 0 : newId = tasks[tasks.length-1].id + 1;

    tasks.push({
        taskName: document.getElementById('input').value,
        priority: document.getElementById('slt').value,
        timeCreate: new Date().toUTCString(),
        id: newId,
        isCompleted: false,
        timeConfirm: null,
        timeCancel: null
    });

    document.getElementById('input').value = '';

    reloadTasksFiltered();
    out();
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//созраняем изменения состояния фильтра в filterStatus//////////////////////////////////////////////////////////////////
document.getElementById('completed').addEventListener('click', function(){
    filterStatus.isCompleted = (document.getElementById('completed').checked) ? true : false;
    reloadTasksFiltered();
    out();
});
document.getElementById('high').addEventListener('click', function(){
    filterStatus.isHigh = (document.getElementById('high').checked) ? true : false;
    reloadTasksFiltered();
    out();
});
document.getElementById('normal').addEventListener('click', function(){
   filterStatus.isNormal = (document.getElementById('normal').checked) ? true : false;
    reloadTasksFiltered();
    out();
});
document.getElementById('low').addEventListener('click', function(){
    filterStatus.isLow = (document.getElementById('low').checked) ? true : false;
    reloadTasksFiltered();
    out();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//копируем значения из tasks в tasksFiltered с условием filterStatus////////////////////////////////////////////////////
function reloadTasksFiltered(){
    tasksFiltered.length = 0;
    tasks.forEach(function(item, i) {
        if (filterStatus.isCompleted) {
            if (item.isCompleted && filterStatus.isHigh && item.priority === 'high'){
                tasksFiltered.push(item);
            }else if (item.isCompleted && filterStatus.isNormal && item.priority === 'normal'){
                tasksFiltered.push(item);
            }else if(item.isCompleted && filterStatus.isLow && item.priority === 'low'){
                tasksFiltered.push(item);
            }else if (item.isCompleted && !(filterStatus.isHigh || filterStatus.isNormal || filterStatus.isLow)){
                tasksFiltered.push(item);
            }
        }else{
            if (filterStatus.isHigh && item.priority === 'high'){
                tasksFiltered.push(item);
            }
            if (filterStatus.isNormal && item.priority === 'normal'){
                tasksFiltered.push(item);
            }
            if(filterStatus.isLow && item.priority === 'low'){
                tasksFiltered.push(item);
            }
            if (!(filterStatus.isHigh || filterStatus.isNormal || filterStatus.isLow)){
                tasksFiltered.push(item);
            }
        };
    });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//отрисовываем tasksFiltered(функционал всего нового)///////////////////////////////////////////////////////////////////
function out(){
    let element = document.getElementById('out');
    element.innerHTML = '';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        tasksFiltered.forEach(function (item, i) {

            let outDiv = document.createElement('div');
            let taskText = document.createElement('div');
            let dateconfirm = document.createElement('div');
            let datecancel = document.createElement('div');
            let buttonOK = document.createElement('button');
            let buttonNO = document.createElement('button');
            let buttonDELETE = document.createElement('button');

            buttonOK.classList.add("btnOK");
            buttonNO.classList.add("btnNO");
            buttonDELETE.classList.add("btnDELETE");

            buttonOK.innerHTML = 'OK';
            buttonNO.innerHTML = 'NO';
            buttonDELETE.innerHTML = 'DELETE';
//клик по задаче////////////////////////////////////////////////////////////////////////////////////////////////////////
            taskText.addEventListener('click', function(){
                onTaskTextClick(outDiv.id, taskText);
            });
//кнопка OK/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            buttonOK.addEventListener('click', function(){
                tasks.forEach((tsk) => {
                    if (tsk.id === item.id){
                        tsk.isCompleted = true;
                        tsk.timeConfirm = new Date().toUTCString();
                        tsk.timeCancel = null;
                    }
                })
                reloadTasksFiltered();
                out();
            });
//кнопка NO/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            buttonNO.addEventListener('click', function(){
                tasks.forEach((tsk) => {
                    if (tsk.id === item.id){
                        tsk.isCompleted = false;
                        tsk.timeConfirm = null;
                        tsk.timeCancel = new Date().toUTCString();
                    }
                })
                reloadTasksFiltered();
                out();
            });
//кнопка DELETE/////////////////////////////////////////////////////////////////////////////////////////////////////////
            buttonDELETE.addEventListener('click', function(){
                element.removeChild(outDiv);
                tasks.forEach((param, i) => {
                    if (param.id === item.id) {
                        tasks.splice(i, 1);
                    }
                })
            });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            outDiv.innerHTML += item.priority + '(^_^) Create: ' + item.timeCreate;
            taskText.innerHTML = item.taskName;
            taskText.id = 'taskText' + item.id;

            if (item.timeConfirm !== null) {
                dateconfirm.innerHTML = 'Confirm: ' + item.timeConfirm;
            }

            if (item.timeCancel !== null) {
                datecancel.innerHTML = 'Cancel: ' + item.timeCancel;
            }

            outDiv.id = String(item.id);
            outDiv.classList.add("task");
            outDiv.appendChild(taskText);
            outDiv.appendChild(buttonOK);
            outDiv.appendChild(buttonNO);
            outDiv.appendChild(buttonDELETE);
            outDiv.appendChild(datecancel);
            outDiv.appendChild(dateconfirm);
            element.appendChild(outDiv);
        });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//обработчик события для сортировки по времени//////////////////////////////////////////////////////////////////////////
document.getElementById('filterDate').addEventListener('click', function(){
    tasksFiltered.reverse();
    out();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//обработчик события нажатия на текст задачи////////////////////////////////////////////////////////////////////////////
function onTaskTextClick(currentId, taskText) {
     let outDivById = document.getElementById(currentId);
     let textInput = document.createElement('input');
     textInput.value = taskText.innerHTML;
     textInput.id = 'taskText' + currentId;
     let saveEdit = document.createElement('button');
     saveEdit.innerHTML = 'Save Edit';
     saveEdit.addEventListener('click', function () {
         let taskText = document.createElement('div');
         taskText.innerHTML = textInput.value;
         taskText.id = 'taskText' + currentId;
         tasks[currentId].taskName = textInput.value;
         taskText.addEventListener('click', function () {
             onTaskTextClick(currentId, taskText)
         });
         outDivById.replaceChild(taskText, textInput);
         outDivById.removeChild(saveEdit);
     });
     outDivById.replaceChild(textInput, taskText);
     outDivById.appendChild(saveEdit);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//сам пока что не понимаю, чего я хочу(GET)/////////////////////////////////////////////////////////////////////////////
/*let xhr = new XMLHttpRequest();//создание запроса
// 2. Настраиваем его: GET-запрос по URL
xhr.open('GET', 'http://127.0.0.1:3000/items'); //GET http://127.0.0.1:3000/items
// 3. Отсылаем запрос
xhr.send();
// 4. Этот код сработает после того, как мы получим ответ сервера
xhr.onload = function() {
    if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    } else { // если всё прошло гладко, выводим результат
        alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
        console.log(xhr.response);
    }
};
xhr.onprogress = function(event) {
    if (event.lengthComputable) {
        alert(`Получено ${event.loaded} из ${event.total} байт`);
    } else {
        alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
    }

};
xhr.onerror = function() {
    alert("Запрос не удался");
};*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//сам пока что не понимаю, чего я хочу(POST)////////////////////////////////////////////////////////////////////////////
/*
function upload(file) {
    let xhr = new XMLHttpRequest();

    // отслеживаем процесс отправки
    xhr.upload.onprogress = function(event) {
        console.log(`Отправлено ${event.loaded} из ${event.total}`);
    };

    // Ждём завершения: неважно, успешного или нет
    xhr.onloadend = function() {
        if (xhr.status == 200) {
            console.log("Успех");
        } else {
            console.log("Ошибка " + this.status);
        }
    };

    xhr.open("POST", "item"); ////POST http://127.0.0.1:3000/items
    xhr.send(file);
}*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PUT http://127.0.0.1:3000/items/:itemId (обновления элементов)
//DELETE http://127.0.0.1:3000/items/:itemId (удаление элемента)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////