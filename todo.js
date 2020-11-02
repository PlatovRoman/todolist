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
//при запуске страницы//////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (confirm("Восстановить данные?")){
            gettasks();
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//обрабатываем нажатие ДОБАВИТЬ/////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('add').onclick = function () {

    if (document.getElementById('input').value === '') {
        alert('Вы не ввели задачу.');
        return;
    };

    let time = new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' });
    let date = new Date().toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' });

    posttask(
        {
            taskName: document.getElementById('input').value,
            priority: document.getElementById('slt').value,
            //timeCreate: new Date().toUTCString(),
            timeCreate: 'Time: ' + time + '⌚ Date: ' + date,
            isCompleted: false,
            timeConfirm: null,
            timeCancel: null
        });

    document.getElementById('input').value = '';
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//созраняем изменения состояния фильтра в filterStatus//////////////////////////////////////////////////////////////////
document.getElementById('completed').addEventListener('click', function(){
    filterStatus.isCompleted = document.getElementById('completed').checked;
    reloadTasksFiltered();
    out();
});
document.getElementById('high').addEventListener('click', function(){
    filterStatus.isHigh = document.getElementById('high').checked
    reloadTasksFiltered();
    out();
});
document.getElementById('normal').addEventListener('click', function(){
   filterStatus.isNormal = document.getElementById('normal').checked
    reloadTasksFiltered();
    out();
});
document.getElementById('low').addEventListener('click', function(){
    filterStatus.isLow = document.getElementById('low').checked
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

            outDiv.classList.add("outD");
            taskText.classList.add("taskText");
            buttonOK.classList.add("btnOK");
            buttonNO.classList.add("btnNO");
            buttonDELETE.classList.add("btnDELETE");

            buttonOK.innerHTML = 'OK';
            buttonNO.innerHTML = 'NO';
            buttonDELETE.innerHTML = 'DELETE';
//клик по задаче////////////////////////////////////////////////////////////////////////////////////////////////////////
            taskText.addEventListener('click', function(){
                onTaskTextClick(item.id, taskText);
            });
//кнопка OK/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            buttonOK.addEventListener('click', function(){
                tasks.forEach((tsk) => {
                    if (tsk.id === item.id){
                        tsk.isCompleted = true;
                        let time = new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' });
                        let date = new Date().toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' });
                        tsk.timeConfirm = 'Time: ' + time + '⌚ Date: ' + date;
                        //tsk.timeConfirm = new Date().toUTCString();
                        tsk.timeCancel = null;
                    }
                })

                puttask(item.id, item);

                reloadTasksFiltered();
                out();
            });
//кнопка NO/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            buttonNO.addEventListener('click', function(){
                tasks.forEach((tsk) => {
                    if (tsk.id === item.id){
                        tsk.isCompleted = false;
                        tsk.timeConfirm = null;
                        let time = new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' });
                        let date = new Date().toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' });
                        //tsk.timeCancel = new Date().toUTCString();
                        tsk.timeCancel = 'Time: ' + time + '⌚ Date: ' + date;
                    }
                })

                puttask(item.id, item);

                reloadTasksFiltered();
                out();
            });
//кнопка DELETE/////////////////////////////////////////////////////////////////////////////////////////////////////////
            buttonDELETE.addEventListener('click', function(){
               element.removeChild(outDiv);
                deletetask(item.id);
            });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            outDiv.innerHTML += '👾' + item.priority + '👾 ' + item.timeCreate;
            taskText.innerHTML = item.taskName;
            taskText.id = 'taskText' + item.id;

            if (item.timeConfirm !== null) {
                dateconfirm.innerHTML = '(Confirm) ' + item.timeConfirm;
            }

            if (item.timeCancel !== null) {
                datecancel.innerHTML = '(Cancel) ' + item.timeCancel;
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

     textInput.classList.add("taskText");
     outDivById.classList.add("taskText");
     textInput.value = taskText.innerHTML;
     textInput.id = 'taskText' + currentId;

     let saveEdit = document.createElement('button');
     saveEdit.innerHTML = 'Save Edit';
     saveEdit.classList.add("btnDELETE");
     saveEdit.addEventListener('click', function () {

        let taskText = document.createElement('div');
        taskText.innerHTML = textInput.value;
        taskText.id = 'taskText' + currentId;
        taskText.classList.add("taskText");

         tasks.forEach((tsk) => {
             if (tsk.id === currentId){
                 tsk.taskName = textInput.value;
                 puttask(currentId, tsk);
            }
         });

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
//(GET)/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gettasks() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:3000/items');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onload = function () {
        tasks = JSON.parse(xhr.response);
        reloadTasksFiltered();
        out();
    };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//(POST)////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function posttask(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:3000/items");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));

    xhr.onload = function() {
        tasks.push(JSON.parse(xhr.response));
        reloadTasksFiltered();
        out();
    };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PUT///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PUT http://127.0.0.1:3000/items/:itemId (обновление элементов)
function puttask(taskid, task) {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://127.0.0.1:3000/items/' + String(taskid));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(task));
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DELETE////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deletetask(taskid) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://127.0.0.1:3000/items/' + String(taskid));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    tasks.forEach((param, i) => {
        if (param.id === taskid) {
            tasks.splice(i, 1);
        }
    })

    reloadTasksFiltered();
    out();
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
