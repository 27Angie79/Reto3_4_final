function traerInformacionMensajes() {
    $.ajax({
        url:"http://129.151.111.62:8080/api/Message/all",
        type: 'GET',
        datatype:'JSON',

        success: function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    });        
}

function pintarRespuestaMensajes(respuesta) {
    let myTable="<table><thead><tr><th>ID</th><th>Mensaje</th><th></th><th></th></tr></thead>";
    for (i=0; i<respuesta.length;i++){
        myTable+="<tbody><tr>";
        myTable+="<td>"+respuesta[i].idMessage+"</td>"
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td><button onclick='traerDatosMen("+respuesta[i].idMessage+")'>Traer Datos</button></td>"
        myTable+="<td><button onclick=\"borrarMensajes("+respuesta[i].idMessage+")\">Borrar Mensajes </button></td>"
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}   
function traerDatosMen(idT){
    $.ajax({
        url:"http://129.151.111.62:8080/api/Message/all",
        type: 'GET',
        datatype:'JSON',

        success: function(respuesta){
            for (i=0; i<respuesta.length;i++){
                if(respuesta[i].idMessage==idT){
                    $("#MmessageText").val(respuesta[i].messageText);
                    $("#Mid").val(respuesta[i].idMessage)
                }
            }
        }
    }); 
}

function guardarInformacionMensajes() {
    let var5 = {
        messageText:$("#MmessageText").val(),
        
    };

    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(var5),

        url:"http://129.151.111.62:8080/api/Message/save",


        success:function(response){
                console.log(response);
            console.log("Se guardó correctamente");
            alert("Se guardó correctamente");
            window.location.reload()

        },

        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardó correctamente");

        }


    });
} 

function actualizarInformacionMensajes(){
    let myData={
        idMessage:$("#Mid").val(),
        messageText:$("#MmessageText").val(),
             
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado4").empty();
            $("#id").val("");
            $("#MmessageText").val("");
            traerInformacionMensajes();
            alert("Se ha actualizado correctamente")
        }
    });
}

function borrarMensajes(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado4").empty();
            traerInformacionMensajes();
            alert("Se ha eliminado correctamente.")
        }
    });
}