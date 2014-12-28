var socket;
    
$(document).ready(function () {
    socket = io('http://localhost:1881');
    startEvents();
    $("#welcome-div").show();
});


function startEvents(){
    socket.emit('loginShow', 'ServerShow');

    socket.on('usuarios', function (users) {
        drawList(users);
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


