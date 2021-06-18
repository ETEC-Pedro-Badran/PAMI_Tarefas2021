var database;


function prepareDatabase(callback) {
  if (database==null) {   
     if (device.platform=="browser") {
          database = openDatabase('tarefasdb', '1.0', 'Tarefas armazenamento local', 2 * 1024 * 1024);
     } else {
          database = window.sqlitePlugin.openDatabase({
               name: 'tarefas.db',
               location: 'default',
               
          },function(error){console.log(error)});
     }
     database.transaction(function(t) {
          t.executeSql('CREATE TABLE IF NOT EXISTS tarefa (id INTEGER PRIMARY KEY, descricao, realizada )',[],()=>{
          callback();
          },(e)=>{
          console.log(e);
          });
     });

} else {
    callback();
}
      





}

function inserir(descricao, callback) {
     database.transaction(function(tx) {   
          tx.executeSql('INSERT INTO tarefa (descricao, realizada) VALUES (?,?)', [descricao,"false"],
          function(tx,resultado){
                callback(resultado.insertId);
          }); 
     });
}


function excluir(id,sucesso) {
     database.transaction(function(tx) {   
          tx.executeSql('DELETE FROM tarefa where id = ?', [id],
          function(tx,resultado){
                sucesso(id);
          }); 
     });
}

function listar(sucesso) {
     database.transaction(function(tx) {   
          tx.executeSql('SELECT * FROM tarefa order by realizada desc', [],
          function(tx,resultado){
                sucesso(resultado);
          }); 
     });
}


function alterar(id,sucesso) {
     database.transaction(function(tx) {   
          tx.executeSql('UPDATE tarefa set realizada = ? where id = ?', ['S',id],
          function(tx,resultado){
                sucesso(id);
          }); 
     });
}


$(document).ready(function(){
     //prepareDatabase();
});

