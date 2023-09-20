const urlApiPhp='http://localhost:8000/controller/artistasController.php/';
const urlApiJava = 'http://localhost:8080/api/artistas/';
const urlApiPython ='http://localhost:8000/api/artistas/';

let url = urlApiPhp; //cambia valor de url segun la api a probar

$(document).ready(function() {
    cargarArtistas();
 });

function cargarArtistas(){
            $.ajax(url, {
                "type": "GET",
                "data": {},
               "async": true,
                dataType: 'json',
        success: function(data){
            let tabla = $('#tabla-artistas');
             $.each(data, function(index,artista) {
                 var fila = $('<tr>');
                 fila.append(
                     $('<td>').text(artista.nombre).addClass('tabla-borde'),
                     $('<td>').text(artista.genero).addClass('tabla-borde'),
                     $('<td>').text(artista.descripcion).addClass('tabla-borde'),
                     $('<td>').append(
                         // Editar
                         $('<a>').addClass('editar')
                             .click(function() {
                                llenarForm(artista);
                             })
                             .append($('<i>').addClass('bx bxs-edit icono editar')),
                         // Eliminar
                         $('<a>').addClass('eliminar')
                             .click(function() {
                                 eliminarArtista(artista.id);
                             })
                             .append($('<i>').addClass('bx bxs-trash-alt icono'))
                     ).addClass('tabla-borde'),
                 );
                 tabla.append(fila)
             });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
        }
    });
}


function actualizar_Crear(){
    let formData = {
        id: $('#id').val(),
        nombre: $('#nombre').val(),
        genero: $('#genero').val(),
        descripcion: $('#descripcion').val()
        };
    if(formData.id ===''){
       let jsonData = JSON.stringify(formData);
        $.ajax(url,{
                "type": "POST",
                "data":jsonData,
                "async":true,
                contentType: "application/json",
                success: function(response) {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Artista creado exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.reload()
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
                }
            });
    }
    else{
        let jsonData = JSON.stringify(formData);
        $.ajax(url, {
            "type": "PUT",
            "data":jsonData,
            "async":true,
            contentType: "application/json",
            success: function(response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Artista actualizado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.reload();
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
            }
        });
    }
}


function eliminarArtista(id) {
    Swal.fire({icon: 'warning',title: '¡Atención!',
    text: '¿Estás seguro de que deseas eliminar el registro?',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            if(url===urlApiPhp)
            url=`${url}?id=${id}`;
            else{
                url=url+id;
            }
            $.ajax(url, {
                "type": "DELETE",
                "data": {},
                "async": true,
                success: function(response) {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Artista eliminado exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.reload()
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
                }
            });
        }
    });
}
//formulario para edicion
function llenarForm(artista){
    $('.titleForm').text('Editar Artista')
             $('.stringBotonForm').text('Actualizar')
             $('.editar').attr('data-bs-toggle', 'modal')
             .attr('data-bs-target', '#staticBackdrop')
             $('#id').val(artista.id);
             $('#nombre').val(artista.nombre);
             $('#genero').val(artista.genero);
             $('#descripcion').val(artista.descripcion);
             $("#staticBackdrop").modal("show");
}
//formulario para crear
function resetModal(){
    $('.titleForm').text('Crear Artista')
             $('.stringBotonForm').text('Crear')
             $('.crearBoton').attr('data-bs-toggle', 'modal')
             .attr('data-bs-target', '#staticBackdrop')
             $('#staticBackdrop input ').val(''); 
             $('#staticBackdrop textarea').val('');
             $("#staticBackdrop").modal("show");
}