    //глобал
    let tsks = [];
    let tskstime = [];
    let reversedtsks = [];
    let reversedtskstime = [];
  //  let tskshelp = [];
  //  let tskstimehelp = [];

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

         let arrhelp1 = {};
         arrhelp1.task = document.getElementById('input').value;
         arrhelp1.priority = document.getElementById('slt').value;
         tsks[tsks.length] = arrhelp1;



        let arrhelp2 = {};
        arrhelp2.task = document.getElementById('input').value;
        arrhelp2.dateandtime =new Date().toUTCString();
        tskstime[tskstime.length] = arrhelp2;


         out();

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

       // document.getElementById('filterDate').onclick;

        let outh = '';

      if (document.getElementById('high').checked) {
          for (let param in tsks) {
              if (tsks[param].priority === 'high') {

           //       tskshelp[param] = tsks[param];
           //       tskstimehelp[param] = tskstime[param];


                  outh += 'Высокий приоритет: ';
                  outh += tsks[param].task;


                  let okid = 'ok' + param;
                  let noid = 'no' + param;
                  let delid = 'del' + param;

                  outh += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';


                  outh += tskstime[param].dateandtime + '<br>';
              }
          }
      }

      if (document.getElementById('normal').checked){
          for (let param in tsks) {
              if (tsks[param].priority === 'normal') {

           //       tskshelp[param] = tsks[param];
           //       tskstimehelp[param] = tskstime[param];


                  outh += 'Обычный приоритет: ';
                  outh += tsks[param].task;

                  let okid = 'ok' + param;
                  let noid = 'no' + param;
                  let delid = 'del' + param;

                  outh += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';



                  //outh += '   ' + '<button id="confirm"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="cancel"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="deletetask"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';
                  outh += tskstime[param].dateandtime + '<br>';
              }
          }
      }

        if (document.getElementById('low').checked){
            for (let param in tsks) {
                if (tsks[param].priority === 'low') {

             //       tskshelp[param] = tsks[param];
             //       tskstimehelp[param] = tskstime[param];


                    outh += 'Низкий приоритет: ';
                    outh += tsks[param].task;

                    let okid = 'ok' + param;
                    let noid = 'no' + param;
                    let delid = 'del' + param;

                    outh += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';



                    //outh += '   ' + '<button id="confirm"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="cancel"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="deletetask"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';

                    outh += tskstime[param].dateandtime + '<br>';
                }
            }
        }

        if (!(document.getElementById('high').checked) && !(document.getElementById('normal').checked) && !(document.getElementById('low').checked)) {
            for (let param in tsks){

          //     tskshelp[param] = tsks[param];
          //      tskstimehelp[param] = tskstime[param];


                switch(tsks[param].priority) {
                    case 'high':
                        outh += 'Высокий приоритет: ';
                        break;

                    case 'normal':
                        outh += 'Обычный приоритет: ';
                        break;

                    case 'low':
                        outh += 'Низкий приоритет: ';
                        break;
                    default:
                        break;
                }

                outh += tsks[param].task;

                let okid = 'ok' + param;
                let noid = 'no' + param;
                let delid = 'del' + param;

                outh += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';

                outh+= tskstime[param].dateandtime + '<br>';
            }
            }

        document.getElementById('out').innerHTML = outh;
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

            let okid = 'ok' + param;
            let noid = 'no' + param;
            let delid = 'del' + param;

            out += '   ' + '<button id="okid"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="noid"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="delid"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';


            // out += '   ' + '<button id="confirm"><img src="images/ok.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="cancel"><img src="images/no.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<button id="deletetask"><img src="images/del.svg" width="15" height="15" style="vertical-align: middle"></button>' + '<br>';

            out += reversedtskstime[param].dateandtime + '<br>';
        }

        document.getElementById('out').innerHTML = out;
    };


   //удаление
   //бред сивой кобылы
   //  while(1) {
   //  for (let param in tsks){
   //     if ()
   //   }
   //  }