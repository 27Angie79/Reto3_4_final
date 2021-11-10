function traerInformacionClientes() {
    $.ajax({
        url:"http://129.151.111.62:8080/api/Client/all",
        type: 'GET',
        datatype:'JSON',

        success: function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });        
}

function pintarRespuestaClientes(respuesta) {
    let myTable="<table><table><thead><tr><th>Id</th><th>Email</th><th>Contraseña</th><th>Nombre</th><th>Edad</th><th></th><th></th></tr></thead>";
    for (i=0; i<respuesta.length;i++){
        myTable+="<tbody><tr>";
        myTable+="<td>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td><button onclick='traerDatosCli("+respuesta[i].idClient+")'>Traer Datos</button></td>"
        myTable+="<td><button onclick=\"borrarCliente("+respuesta[i].idClient+")\">Borrar Clientes </button></td>"
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}   

function traerDatosCli(id){
    $.ajax({
        url:"http://129.151.111.62:8080/api/Client/"+id,
        type: 'GET',
        datatype:'JSON',

        success: function(response){
            console.log (response)
            var item=response
                    $("#CLid").val(item.idClient);
                    $("#CLemail").val(item.email);
                    $("#CLpassword").val(item.password);
                    $("#CLname").val(item.name);
                    $("#CLage").val(item.age);
                       
        }
    });    
  
} 

function guardarInformacionClientes() {
    let var4 = {
        email:$("#CLemail").val(),
        password:$("#CLpassword").val(),
        name: $("#CLname").val(),
        age:$("#CLage").val()
    };

    $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(var4),

        url:"http://129.151.111.62:8080/api/Client/save",


        success:function(response){
                console.log(response);
            console.log("Se guardó correctamente");
            alert("Se guardó correctamente ✔");
            window.location.reload()

        },

        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardó correctamente😢");

        }


    });
}   

function actualizarInformacionClientes(idElemento){
    let myData={
        idClient:$("#CLid").val(),
        email:$("#CLemail").val(),
        password:$("#CLpassword").val(),
        name: $("#CLname").val(),
        age:$("#CLage").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            $("#idClient").val("");
            $("#CLemai").val("");
            $("#CLpassword").val("");
            $("#CLname").val("");
            $("#CLage").val("")
            traerInformacionClientes();
            alert("Se ha actualizado correctamente✔")
        
        }
    });

}
function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.62:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            traerInformacionClientes();
            alert("Se ha eliminado correctamente.✔")
        }
    });
}