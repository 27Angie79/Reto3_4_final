function traerInformacionCategorias() {
    $.ajax({
        url:"http://129.151.111.62:8080/api/Category/all",
        type: 'GET',
        datatype:'JSON',

        success: function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });        
}

function pintarRespuesta(respuesta) {
    let myTable="<table><thead><tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th></th><th></th></tr></thead>";
    for (i=0; i<respuesta.length;i++){
        myTable+="<tbody><tr>";
        myTable+="<td>"+respuesta[i].id+"</td>"
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td><button onclick=\"traerDatosCat("+respuesta[i].id+")\">Traer Datos</button></td>";
        myTable+="<td><button onclick=\"borrarCategoria("+respuesta[i].id+")\">Borrar Categorias </button></td>";
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
} 

function traerDatosCat(idT){
    $.ajax({
        url:"http://129.151.111.62:8080/api/Category/all",
        type: 'GET',
        datatype:'JSON',

        success: function(respuesta){
            for (i=0; i<respuesta.length;i++){
                if(respuesta[i].id==idT){
                    $("#Cname").val(respuesta[i].name);
                    $("#Cdescription").val(respuesta[i].description);
                    $("#Cid").val(respuesta[i].id);
                }
            }
        }
    }); 
}  

function guardarInformacionCategorias() {
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
    };

    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(var2),

        url:"http://129.151.111.62:8080/api/Category/save",


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

function actualizarInformacionCategorias(){
    let myData={
        id:$("#Cid").val(), 
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("Se ha actualizado correctamente la categoria")
        }
    });

}
function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            traerInformacionCategorias();
            alert("Se ha eliminado correctamente.")
        }
    });
}

