var socket = io('http://localhost:1881');
    socket.on('visits', function(visitas){
    document.getElementById('visitas').innerHTML = visitas;
});
    
$(document).ready(function () {
    $("#welcome-div").hide();
    $("#btnLogin").click(function () {
        var nomeJogador = $("#txtName").val();
        $("#div-Login").fadeOut("slow");
        socket.emit('logou', nomeJogador);
        $("#welcome-nome").html(", " + nomeJogador);
        $("#welcome-div").show();
    });
});

function drawList(users){
    var i = 0;
    $('#usuarios-list').empty();
    for (i in users) {
        $('#usuarios-list').append('<li class="list-group-item">'+ users[i].nome +'</li>');
    }
}

socket.on('usuarios', function (users) {
    drawList(users);
});

socket.on('deslogou', function (data) {
    //alert(data.deslogado + ' deslogou');
    drawList(data.usersData);
});


