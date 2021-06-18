
function carreguePagina(){
  $('.sidenav').sidenav();
   //evento do clique no botão flutuante vermelho com mais
   $(".btn-floating").click(function(){
       
       //volta o display para visivel 
       //com uma leve animação de aparecer aos poucos.
       // slow faz ser mais devagar
       $("#div-nova-tarefa").fadeIn('slow');
   });



function adicionarTarefaLista(id, descricao, realizada) {
        var tarefa= 
        '<li class="collection-item avatar z-depth-2">'
        +'        <i class="material-icons circle red">timer</i>'
        +'        <span class="title '+(realizada=="S"?'realizada':'')+'">'+descricao+'</span> '
        +'        <ul class="secondary-content" >'
        +'            <li>'
        +'                <a href="#!" id_tarefa="'+id+'"  class="btn-altera-tarefa"   ><i class="material-icons green-text">check</i></a>'
        +'            </li>'
        +'            <li>'
        +'                <a href="#!" class="btn-remove-tarefa" id_tarefa="'+id+'" ><i class="material-icons red-text">delete</i></a>'
        +'             </li>'
        +'          </ul>';

          $("#lista-tarefas").append(tarefa);

          $(".btn-remove-tarefa").unbind();
          $(".btn-remove-tarefa").click(function(){

            var id = $(this).attr('id_tarefa');
            excluir(id, function(id){
                $("a[id_tarefa='"+id+"']").parent().parent().parent().remove();              
            });


          });



          $(".btn-altera-tarefa").unbind();
          $(".btn-altera-tarefa").click(function(){

            var id = $(this).attr('id_tarefa');
            alterar(id, function(id){
                listar(function(tarefas){
                    listarTarefas(tarefas);
                });
            });


          });

}

  function listarTarefas(tarefas) {
     $("#lista-tarefas").html("");
    for(var i=0;i<tarefas.rows.length;i++) {
        //var tarefa = tarefas.rows[i];
        var tarefa = tarefas.rows.item(i);

        adicionarTarefaLista(tarefa["id"], tarefa["descricao"], tarefa["realizada"]);
    }
  }

  $("#btn-incluir").click(function(){
    //obtem o texto digitado pelo usuário no input descricao
        var descricao = $("#descricao").val();
        inserir(descricao, function(id) {
                      adicionarTarefaLista(id, descricao);

                      $("#div-nova-tarefa").slideUp();


                    });

                    $(".btn-remove-tarefa").click(function(){
                      $(this).remove();
                    });

                      $("#btn-cancelar").click(function(){
                        
                        $("#div-nova-tarefa").fadeOut();
                        
                    });

  }  ); // insere no banco de dados

    


  listar(function(tarefas){
      listarTarefas(tarefas);
  });

}



document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  prepareDatabase(function(){
    carreguePagina();
});
}



