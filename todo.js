
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
    if (document.getElementById('completed').checked){
        filterStatus.isCompleted = true;
    }else{
        filterStatus.isCompleted = false;
    }
    reloadTasksFiltered();
    out();
});
document.getElementById('high').addEventListener('click', function(){
    if (document.getElementById('high').checked){
        filterStatus.isHigh = true;
    }else{
        filterStatus.isHigh = false;
    }
    reloadTasksFiltered();
    out();
});
document.getElementById('normal').addEventListener('click', function(){
    if (document.getElementById('normal').checked){
        filterStatus.isNormal = true;
    }else{
        filterStatus.isNormal = false;
    }
    reloadTasksFiltered();
    out();
});
document.getElementById('low').addEventListener('click', function(){
    if (document.getElementById('low').checked){
        filterStatus.isLow = true;
    }else{
        filterStatus.isLow = false;
    }
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
            }else if (item.isCompleted && !(filterStatus.isHigh && filterStatus.isNormal && filterStatus.isLow)){
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
                tasks[item.id].isCompleted = true;
                tasks[item.id].timeConfirm = new Date().toUTCString();
                tasks[item.id].timeCancel = null;

                reloadTasksFiltered();
                out();
            });
//кнопка NO/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            buttonNO.addEventListener('click', function(){
                tasks[item.id].isCompleted = false;
                tasks[item.id].timeConfirm = null;
                tasks[item.id].timeCancel = new Date().toUTCString();

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
//обработчик события для сортировки по времени//////////////////////////////////////////////////////////////////////////
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