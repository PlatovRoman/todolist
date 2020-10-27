
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

    tasks.push({
        taskName: document.getElementById('input').value,
        priority: document.getElementById('slt').value,
        timeCreate: new Date().toUTCString(),
        id: tasks.length,
        isCompleted: false,
        timeConfirm: null,
        timeCancel: null
    });

    document.getElementById('input').value = '';

    reloadTasksFiltered();
    out();

    console.log(tasks);
    //console.log(filterStatus);
    console.log(tasksFiltered);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//созраняем изменения состояния фильтра в filterStatus//////////////////////////////////////////////////////////////////
document.getElementById('completed').addEventListener('click', function(){
    if (document.getElementById('completed').checked){
        filterStatus.isCompleted = true;
    }else{
        filterStatus.isCompleted = false;
    }
    //let element = document.getElementById('out');
    //element.innerHTML = '';
    reloadTasksFiltered();
    out();
    //вывести результат
});
document.getElementById('high').addEventListener('click', function(){
    if (document.getElementById('high').checked){
        filterStatus.isHigh = true;
    }else{
        filterStatus.isHigh = false;
    }
    reloadTasksFiltered();
    out();
    //вывести результат
});
document.getElementById('normal').addEventListener('click', function(){
    if (document.getElementById('normal').checked){
        filterStatus.isNormal = true;
    }else{
        filterStatus.isNormal = false;
    }
    reloadTasksFiltered();
    out();
    //вывести результат
});
document.getElementById('low').addEventListener('click', function(){
    if (document.getElementById('low').checked){
        filterStatus.isLow = true;
    }else{
        filterStatus.isLow = false;
    }
    reloadTasksFiltered();
    out();
    //вывести результат
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
        let outDiv = document.createElement('div');
        let taskText = document.createElement('div');
        let dateconfirm = document.createElement('div');
        let datecancel = document.createElement('div');
        let buttonOK = document.createElement('button');
        let buttonNO = document.createElement('button');
        let buttonDELETE = document.createElement('button');
        //let date = document.createElement('div');

        buttonOK.classList.add("btnOK");
        buttonNO.classList.add("btnNO");
        buttonDELETE.classList.add("btnDELETE");

        buttonOK.innerHTML = 'OK';
        buttonNO.innerHTML = 'NO';
        buttonDELETE.innerHTML = 'DELETE';
//кнопка OK/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    buttonOK.addEventListener('click', function(){
        tasks[outDiv.id].isCompleted = true;
        tasks[outDiv.id].timeConfirm = new Date().toUTCString();
        tasks[outDiv.id].timeCancel = null;

        reloadTasksFiltered();
        out();
    });
//кнопка NO/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    buttonNO.addEventListener('click', function(){
        tasks[outDiv.id].isCompleted = false;
        tasks[outDiv.id].timeConfirm = null;
        tasks[outDiv.id].timeCancel = new Date().toUTCString();

        reloadTasksFiltered();
        out();
    });
//кнопка DELETE/////////////////////////////////////////////////////////////////////////////////////////////////////////
    buttonDELETE.addEventListener('click', function(){
        element.removeChild(outDiv);

        for(let param of tasks) {
            if (param === outDiv.id) {
                tasks.splice(param, 1);
            }
        }
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        tasksFiltered.forEach(function (item, i) {
            outDiv.innerHTML = '';
            outDiv.innerHTML += item.priority + '(^_^) Create: ' + item.timeCreate;
            taskText.innerHTML = item.taskName;
            //taskText.id = 'taskText' + taskid;
            //date.innerHTML = ' Create: ' + item.timeCreate;

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
            //outDiv.appendChild(date);
            outDiv.appendChild(datecancel);
            outDiv.appendChild(dateconfirm);
            element.appendChild(outDiv);
        });
};