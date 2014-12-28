var socket;
    
$(document).ready(function () {
    $("#welcome-div").hide();
    $("#wnLogin").submit(function (event) {
        event.preventDefault();
        socket = io('http://localhost:1881');
        startEvents();
        var nomeJogador = $("#txtName").val();
        $("#div-Login").fadeOut("slow");
        socket.emit('logou', nomeJogador);
        $("#welcome-nome").html(", " + nomeJogador);
        $("#welcome-div").show();
    });
});


function startEvents(){
    socket.on('usuarios', function (users) {
        drawList(users);
    });
    
    socket.on('visits', function(visitas){
        document.getElementById('visitas').innerHTML = visitas;
    });

    socket.on('deslogou', function (data) {
        //alert(data.deslogado + ' deslogou');
        drawList(data.usersData);
    });
    
    socket.on('server_message', function(msg){
        $('#server-messages').append(msg);
        $('#server-messages').scrollTop( $('#server-messages').height() );
    });

}


function drawList(users){
    var i = 0;
    $('#usuarios-list').empty();
    for (i in users) {
        $('#usuarios-list').append('<li class="list-group-item">'+ users[i].nome +'</li>');
    }
}


