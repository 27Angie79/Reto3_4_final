
function traerInformacionReservaciones() {
    $.ajax({
        url:"http://129.151.111.62:8080/api/Reservation/all",
        type: 'GET',
        datatype:'JSON',

        success: function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservaciones(respuesta);
        }
    });        
}

function pintarRespuestaReservaciones(respuesta) {
    let myTable="<table><thead><tr><th>ID</th><th>Comienzo</th><th>Fin</th><th></th><th></th></tr></thead>";
    for (i=0; i<respuesta.length;i++){
        myTable+="<tbody><tr>";
        myTable+="<td>"+respuesta[i].idReservation+"</td>"
        myTable+="<td>"+respuesta[i].startDate.split("T")[0]+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate.split("T")[0]+"</td>";
        myTable+="<td><button onclick=\"traerDatosReserv("+respuesta[i].idReservation+")\">Traer Datos</button></td>";
        myTable+="<td><button onclick=\"borrarCategoria("+respuesta[i].idReservation+")\">Borrar Reservaciones </button></td>"
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}   

function traerDatosReserv(idT){
    $.ajax({
        url:"http://129.151.111.62:8080/api/Reservation/all",
        type: 'GET',
        datatype:'JSON',

        success: function(respuesta){
            for (i=0; i<respuesta.length;i++){
                if(respuesta[i].idReservation==idT){
                    $("#RstartDate").val(respuesta[i].startDate);
                    $("#RdevolutionDate").val(respuesta[i].devolutionDate);
                    $("#Rid").val(respuesta[i].idReservation);
                }
            }
        }
    }); 
}  

function guardarInformacionReservaciones() {
    let var6 = {
        startDate:$("#RstartDate").val(),
        devolutionDate:$("#RdevolutionDate").val(),
    };

    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(var6),

        url:"http://129.151.111.62:8080/api/Reservation/save",


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

function actualizarInformacionReservaciones(){
    let myData={
        idReservation:$("#Rid").val(),
        startDate:$("#RstartDate").val(),
        devolutionDate:$("#RdevolutionDate").val(),
             
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado5").empty();
            $("#id").val("");
            $("#RstartDate").val("");
            $("#RdevolutionDate").val(),
            traerInformacionReservaciones();
            alert("Se ha actualizado correctamente")
        }
    });
}

function borrarReservaciones(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Reservaciones/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado5").empty();
            traerInformacionReservaciones();
            alert("Se ha eliminado correctamente.")
        }
    });
}
