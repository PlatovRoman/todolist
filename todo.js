    //глобал
    let tsks = [];
    let tskstime = [];
    let reversedtsks = [];
    let reversedtskstime = [];


    //проверка при запуске
   if (confirm('Восстановить последние сохраненные данные?')){
       // todo при проверке на undefined лучше использовать typeof (через typeof всегда выдает true)
        if (localStorage.getItem('tasks') != undefined){
           tsks =  JSON.parse(localStorage.getItem('tasks'));
           tskstime =  JSON.parse(localStorage.getItem('taskst'));
            out();
        }
        else {
            alert('Сохраненных данных нет.');
        }
    }
   else{
       localStorage.clear();
   }
   //todo можно привязывать EventListener(onclick например) прямо в шаблоне(см. шаблон)
   //обработчик кнопки ДОБАВИТЬ
    document.getElementById('add').onclick = function (){

         if (document.getElementById('input').value == '') {
             alert('Вы не ввели задачу.');
             return;
         }

         let arrhelp1 = {};
         arrhelp1.task = document.getElementById('input').value;
         arrhelp1.priority = document.getElementById('slt').value;
         tsks[tsks.length] = arrhelp1;



        let arrhelp2 = {};
        arrhelp2.task = document.getElementById('input').value;
        arrhelp2.dateandtime =new Date().toUTCString();
        tskstime[tskstime.length] = arrhelp2;


         out();
        document.getElementById('input').value = '';

         localStorage.setItem('tasks', JSON.stringify(tsks));
         localStorage.setItem('taskst', JSON.stringify(tskstime));
    };

   //функция вывода
    function out(){
        let out = '';
        for (let param in tsks){
            switch(tsks[param].priority) {
                case 'high':
                    out += 'Высокий приоритет: ';
                break;

                case 'normal':
                    out += 'Обычный приоритет: ';
                break;

                case 'low':
                    out += 'Низкий приоритет: ';
                break;
                default:
                break;
            }

            out += tsks[param].task;


            let okid = 'ok' + param;
            let noid = 'no' + param;
            let delid = 'del' + param;

            out += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';


            out+= tskstime[param].dateandtime + '<br>';
        }

       document.getElementById('out').innerHTML = out;
    }


    //фильтр по приоритетам
    document.getElementById('filter').onclick = function (){

        let out = '';

      if (document.getElementById('high').checked) {
          for (let param in tsks) {
              if (tsks[param].priority === 'high') {

           //       tskshelp[param] = tsks[param];
           //       tskstimehelp[param] = tskstime[param];


                  out += 'Высокий приоритет: ';
                  out += tsks[param].task;


                  let okid = 'ok' + param;
                  let noid = 'no' + param;
                  let delid = 'del' + param;

                  out += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';


                  out += tskstime[param].dateandtime + '<br>';
              }
          }
      }

      if (document.getElementById('normal').checked){
          for (let param in tsks) {
              if (tsks[param].priority === 'normal') {

           //       tskshelp[param] = tsks[param];
           //       tskstimehelp[param] = tskstime[param];


                  out += 'Обычный приоритет: ';
                  out += tsks[param].task;

                  let okid = 'ok' + param;
                  let noid = 'no' + param;
                  let delid = 'del' + param;

                  out += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';


                  out += tskstime[param].dateandtime + '<br>';
              }
          }
      }

        if (document.getElementById('low').checked){
            for (let param in tsks) {
                if (tsks[param].priority === 'low') {

                    out += 'Низкий приоритет: ';
                    out += tsks[param].task;

                    let okid = 'ok' + param;
                    let noid = 'no' + param;
                    let delid = 'del' + param;

                    out += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';

                    out += tskstime[param].dateandtime + '<br>';
                }
            }
        }

        if (!(document.getElementById('high').checked) && !(document.getElementById('normal').checked) && !(document.getElementById('low').checked)) {
            for (let param in tsks){


                switch(tsks[param].priority) {
                    case 'high':
                        out += 'Высокий приоритет: ';
                        break;

                    case 'normal':
                        out += 'Обычный приоритет: ';
                        break;

                    case 'low':
                        out += 'Низкий приоритет: ';
                        break;
                    default:
                        break;
                }

                out += tsks[param].task;

                let okid = 'ok' + param;
                let noid = 'no' + param;
                let delid = 'del' + param;

                out += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';

                out+= tskstime[param].dateandtime + '<br>';
            }
            }

        document.getElementById('out').innerHTML = out;
    };


    //сортировка по дате
    document.getElementById('filterDate').onclick = function (){
        reversedtsks = tsks.reverse();
        reversedtskstime = tskstime.reverse();

        let out = '';

        for (let param in reversedtsks){
            switch(reversedtsks[param].priority) {
                case 'high':
                    out += 'Высокий приоритет: ';
                    break;

                case 'normal':
                    out += 'Обычный приоритет: ';
                    break;

                case 'low':
                    out += 'Низкий приоритет: ';
                    break;
                default:
                    break;
            }

            out += reversedtsks[param].task;


//id не задаются, я потом не могу найти элементы для удаления или изменения состояния
            let okid = 'ok' + param;
            let noid = 'no' + param;
            let delid = 'del' + param;

            alert(delid);

            out += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';

            out += reversedtskstime[param].dateandtime + '<br>';
        }

        document.getElementById('out').innerHTML = out;
    };


    /*удаление
    for(let param in tsks) {
        let anyid = 'del' + param;
        document.getElementById('anyid').onclick = function () {
            tsks.splice(param, 1);
            out();
        }
    }*/

    //пытаюсь посмотреть id элемента
    document.body.onclick = function(e) {
       let elem = e.target;
       let id = elem.id;
       alert(id);
    }
