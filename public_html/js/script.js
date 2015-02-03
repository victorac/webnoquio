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
    var message = "Deseja realmente sair?";
    window.onbeforeunload = function(event) {
        var e = e || window.event;
        if (e) {
            e.returnValue = message;
        }
        return message;
    };

}

function PreventOutPage(){
    
}


function drawList(users){
    var i = 0;
    $('#usuarios-list').empty();
    for (i in users) {
        $('#usuarios-list').append('<li class="list-group-item">'+ users[i].nome +'</li>');
    }
}


