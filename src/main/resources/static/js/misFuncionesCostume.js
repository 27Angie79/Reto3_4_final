function traerInformacionCostumes() {
    $.ajax({
        url:"http://129.151.111.62:8080/api/Costume/all",
        type: 'GET',
        datatype:'JSON',

        success: function(respuesta){
            console.log(respuesta);
            pintarRespuestaCostumes(respuesta);
        }
    });        
}

function pintarRespuestaCostumes(respuesta) {
    let myTable="<table><table><thead><tr><th>ID</th><th>Nombre</th><th>Marca</th><th>Año</th><th>Descripcion</th><th></th><th></th></tr></thead>";
    for (i=0; i<respuesta.length;i++){
        myTable+="<tbody><tr>";
        myTable+="<td>"+respuesta[i].id+"</td>"
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td><button onclick='traerDatosCos("+respuesta[i].id+")'>Traer Datos</button></td>"
        myTable+="<td><button onclick=\"borrarCostumes("+respuesta[i].id+")\">Borrar Costumes </button></td>"
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}   

function traerDatosCos(idT){
    $.ajax({
        url:"http://129.151.111.62:8080/api/Costume/all",
        type: 'GET',
        datatype:'JSON',

        success: function(respuesta){
            for (i=0; i<respuesta.length;i++){
                if(respuesta[i].id==idT){
                    $("#COname").val(respuesta[i].name);
                    $("#CObrand").val(respuesta[i].brand)
                    $("#COyear").val(respuesta[i].year)
                    $("#COdescription").val(respuesta[i].description)
                    $("#COid").val(respuesta[i].id)
                }
            }
        }
    }); 
}  

function guardarInformacionCostumes() {
    let var3 = {
        name:$("#COname").val(),
        brand:$("#CObrand").val(),
        year: $("#COyear").val(),
        description:$("#COdescription").val()
    };

    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(var3),

        url:"http://129.151.111.62:8080/api/Costume/save",


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

function actualizarInformacionCostumes(){
    let myData={
        id:$("#COid").val(),
        name:$("#COname").val(),
        brand:$("#CObrand").val(),
        year: $("#COyear").val(),
        description:$("#COdescription").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Costume/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            $("#id").val("");
            $("#COname").val("");
            $("#CObrand").val("");
            $("#COyear").val("");
            $("#COdescription").val("")
            traerInformacionCostumes();
            alert("Se ha actualizado correctamente")
        
        }
    });

}
function borrarCostumes(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Costume/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            traerInformacionCostumes();
            alert("Se ha Eliminado correctamente.")
        }
    });
}