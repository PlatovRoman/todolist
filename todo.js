let tsks = [];
let tskstime = [];
let tsksid = [];
let tsksstat = [];
let tskstimeconfirm = [];
let tskstimecancel = [];

if (confirm('Восстановить последние сохраненные данные?')){
    if (!(localStorage.getItem('tasks') === null)){
        tsks =  JSON.parse(localStorage.getItem('tasks'));
        tskstime =  JSON.parse(localStorage.getItem('taskst'));
        tsksid =  JSON.parse(localStorage.getItem('tasksi'));
        tsksstat = JSON.parse(localStorage.getItem('taskstat'));
        tskstimeconfirm = JSON.parse(localStorage.getItem('taskconf'));
        tskstimecancel = JSON.parse(localStorage.getItem('taskcanc'));

        for(let param in tsks) {
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
        }
    }
    else {
        alert('Сохраненных данных нет.');
    }
}
else{
    localStorage.clear();
}

document.getElementById('add').onclick = function (){

    if (document.getElementById('input').value === '') {
        alert('Вы не ввели задачу.');
        return;
    }

    //для сортировки
    if (tsks.length > 1){

    let elems = document.getElementById('out').children;
    let arrhelpsort = [];

    for (let elem of elems) {
        arrhelpsort.push(elem.id);
    }

        if (tskstime[arrhelpsort[0]].dateandtime > tskstime[arrhelpsort[1]].dateandtime){
            arrhelpsort.reverse();

            document.getElementById('out').innerHTML = "";

            for(let param in arrhelpsort) {
                out(tsks[arrhelpsort[param]].task, tsks[arrhelpsort[param]].priority, tskstime[arrhelpsort[param]].dateandtime, tsksid[arrhelpsort[param]].taskid, tsksstat[arrhelpsort[param]].taskstatus, tskstimeconfirm[arrhelpsort[param]].timeconfirm, tskstimecancel[arrhelpsort[param]].timecancel);
            }
        }
    }


    let arrhelp1 = {};
    arrhelp1.task = document.getElementById('input').value;
    arrhelp1.priority = document.getElementById('slt').value;
    tsks[tsks.length] = arrhelp1;

    let arrhelp2 = {};
    arrhelp2.task = document.getElementById('input').value;
    arrhelp2.dateandtime =new Date().toUTCString();
    tskstime[tskstime.length] = arrhelp2;

    let arrhelp3 = {};
    arrhelp3.task = document.getElementById('input').value;
    arrhelp3.taskid = tsks.length-1;
    tsksid[tsksid.length] = arrhelp3;

    let arrhelp4 = {};
    arrhelp4.task = document.getElementById('input').value;
    arrhelp4.taskstatus = false;
    tsksstat[tsksstat.length] = arrhelp4;

    let arrhelp5 = {};
    arrhelp5.task = document.getElementById('input').value;
    arrhelp5.timeconfirm = null;
    tskstimeconfirm[tskstimeconfirm.length] = arrhelp5;

    let arrhelp6 = {};
    arrhelp6.task = document.getElementById('input').value;
    arrhelp6.timecancel = null;
    tskstimecancel[tskstimecancel.length] = arrhelp6;

    document.getElementById('input').value = '';

    localStorage.setItem('tasks', JSON.stringify(tsks));
    localStorage.setItem('taskst', JSON.stringify(tskstime));
    localStorage.setItem('tasksi', JSON.stringify(tsksid));
    localStorage.setItem('taskstat', JSON.stringify(tsksstat));
    localStorage.setItem('taskconf', JSON.stringify(tskstimeconfirm));
    localStorage.setItem('taskcanc', JSON.stringify(tskstimecancel));

    out(tsks[tsks.length-1].task, tsks[tsks.length-1].priority, tskstime[tskstime.length-1].dateandtime,tsksid[tsksid.length-1].taskid, tsksstat[tsksstat.length-1].taskstatus, tskstimeconfirm[tskstimeconfirm.length-1].timeconfirm, tskstimecancel[tskstimecancel.length-1].timecancel);
}

function out(task, priority, dateandtime, taskid, taskstat, timeconfirm, timecancel){

    let element = document.getElementById('out');
    let outDiv = document.createElement('div');
    let date = document.createElement('div');
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


    buttonOK.addEventListener('click', function(){
        tsksstat[outDiv.id].taskstatus = true;
        tskstimeconfirm[outDiv.id].timeconfirm = new Date().toUTCString();
        tskstimecancel[outDiv.id].timecancel = null;

        timeconfirm = tskstimeconfirm[outDiv.id].timeconfirm;

        document.getElementById('out').innerHTML = "";

        for (let param in tsks){
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
        }

        localStorage.setItem('taskconf', JSON.stringify(tskstimeconfirm));
        localStorage.setItem('taskcanc', JSON.stringify(tskstimecancel));
        localStorage.setItem('taskstat', JSON.stringify(tsksstat));

    });

    buttonNO.addEventListener('click', function(){
        tskstimecancel[outDiv.id].timecancel = new Date().toUTCString();
        tskstimeconfirm[outDiv.id].timeconfirm = null;
        tsksstat[outDiv.id].taskstatus = false;

        timecancel = tskstimecancel[outDiv.id].timecancel;

        document.getElementById('out').innerHTML = "";

        for (let param in tsks){
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
        }

        localStorage.setItem('taskcanc', JSON.stringify(tskstimecancel));
        localStorage.setItem('taskconf', JSON.stringify(tskstimeconfirm));
        localStorage.setItem('taskstat', JSON.stringify(tsksstat));

    });

    buttonDELETE.addEventListener('click', function(){
        element.removeChild(outDiv);
        if (tsks.length === 1){
            tsks.length = 0;
            tskstime.length = 0;
            tsksid.length = 0;
            tsksstat.length = 0;
            tskstimeconfirm.length = 0;
            tskstimecancel.length = 0;
        }

        for(let param in tsks) {
            if (param === outDiv.id) {
                tsks.splice(param, 1);
                tskstime.splice(param, 1);
                tsksid.splice(param, 1);
                tsksstat.splice(param, 1);
                tskstimeconfirm.splice(param, 1);
                tskstimecancel.splice(param, 1);
            }
        }

            if (tsks.length != 0) {
                localStorage.setItem('tasks', JSON.stringify(tsks));
                localStorage.setItem('taskst', JSON.stringify(tskstime));
                localStorage.setItem('tasksi', JSON.stringify(tsksid));
                localStorage.setItem('taskstat', JSON.stringify(tsksstat));
                localStorage.setItem('taskconf', JSON.stringify(tskstimeconfirm));
                localStorage.setItem('taskcanc', JSON.stringify(tskstimecancel));
            }
            else {
                localStorage.clear();
            }
    })


    outDiv.innerHTML = priority + ': ' + task + ' ';
    date.innerHTML = 'Create: ' + dateandtime;

    if (timeconfirm !== null ){
       dateconfirm.innerHTML = 'Confirm: ' + timeconfirm;
    }

    if (timecancel !== null ){
        datecancel.innerHTML = 'Cancel: ' + timecancel;
    }

    outDiv.id = String(taskid);
    outDiv.classList.add("task");


    outDiv.appendChild(buttonOK);
    outDiv.appendChild(buttonNO);
    outDiv.appendChild(buttonDELETE);
    outDiv.appendChild(date);
    outDiv.appendChild(datecancel);
    outDiv.appendChild(dateconfirm);
    element.appendChild(outDiv);
}

//фильтр по приоритетам
document.getElementById('filter').onclick = function (){

    document.getElementById('out').innerHTML = "";

    for (let param in tsks) {

    if (document.getElementById('completed').checked){
        if (document.getElementById('high').checked && tsks[param].priority === 'high' && tsksstat[param].taskstatus){
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
        }else if (document.getElementById('normal').checked && tsks[param].priority === 'normal' && tsksstat[param].taskstatus){
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
        }else if (document.getElementById('low').checked && tsks[param].priority === 'low' && tsksstat[param].taskstatus) {
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
        }else if (tsksstat[param].taskstatus && !(document.getElementById('high').checked) && !(document.getElementById('low').checked) && !(document.getElementById('normal').checked)){
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
        }

    }else {
        if (document.getElementById('high').checked && tsks[param].priority === 'high'){
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
        }else if (document.getElementById('normal').checked && tsks[param].priority === 'normal'){
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
        }else if (document.getElementById('low').checked && tsks[param].priority === 'low'){
            out(tsks[param].task, tsks[param].priority, tskstime[param].dateandtime, tsksid[param].taskid, tsksstat[param].taskstatus, tskstimeconfirm[param].timeconfirm, tskstimecancel[param].timecancel);
    }
    }
}}

//сортировка по дате
document.getElementById('filterDate').onclick = function (){



    let elems = document.getElementById('out').children;
    let arrhelpsort = [];

    for (let elem of elems) {
        arrhelpsort.push(elem.id);
    }

    arrhelpsort.reverse();

    document.getElementById('out').innerHTML = "";

   for(let param in arrhelpsort) {
       out(tsks[arrhelpsort[param]].task, tsks[arrhelpsort[param]].priority, tskstime[arrhelpsort[param]].dateandtime, tsksid[arrhelpsort[param]].taskid, tsksstat[arrhelpsort[param]].taskstatus, tskstimeconfirm[arrhelpsort[param]].timeconfirm, tskstimecancel[arrhelpsort[param]].timecancel);
   }
}
