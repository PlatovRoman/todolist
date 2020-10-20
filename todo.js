
    let tsks = [];

   if (confirm('Восстановить последние сохраненные данные?')){
       // todo при проверке на undefined лучше использовать typeof
        if (localStorage.getItem('tasks') != undefined){
           tsks =  JSON.parse(localStorage.getItem('tasks'));
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
    document.getElementById('add').onclick = function (){
         let arrhelp = {};
         arrhelp.task = document.getElementById('input').value;
         arrhelp.priority = document.getElementById('slt').value;
         tsks[tsks.length] = arrhelp;

         out();

         localStorage.setItem('tasks', JSON.stringify(tsks));
    };

    function out(){
        let out = '';
        for (let param in tsks){
            //todo только строгое сравнение
            if (tsks[param].priority == 'complete'){
                out += '<input type = "checkbox" checked>';
            }
            else{
                out += '<input type = "checkbox">';
            }

            out += tsks[param].task + '<br>';
        }
       document.getElementById('out').innerHTML = out;
    }
