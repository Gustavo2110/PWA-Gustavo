$(document).ready(function () {
  crearLinks();
});


function crearLinks() {
  var opciones = $("#siderbar1 h3");

  opciones.click(function () {

    mostrarSeccion(this.id);
  });
}

function mostrarSeccion(nombre) {
  $("#divCargando").show();
  $.ajax({
    url: nombre + ".html",
    cache: true,
    success: function (respuesta) {
      $("#mainContainer").html(respuesta);
      $("#divCargando").hide();
    }
  });
}

