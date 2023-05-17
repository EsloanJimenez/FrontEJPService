export const showHint = () => {
   let search = document.getElementById('campo').value;
   let xmlhttp = XMLHttpRequest;
   let contenidosRecibidos = new Array();
   let nodoMostrarResultados = document.getElementById("listaCiudades");
   let contenidosAMostrar = "";

   if (search.length == 0) {
      document.getElementById("txtInformacion").innerHTML = "";
      nodoMostrarResultados.innerHTML = "";
      return;
   }

   xmlhttp.addEventListener('load', () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
         contenidosRecibidos = xmlhttp.responseText.split(",");
         console.log(contenidosRecibidos);
         document.getElementById("txtInformacion").innerHTML = contenidosRecibidos[0];

         for (let i = 1; i < contenidosRecibidos.length; i++) {
            contenidosAMostrar =
               contenidosAMostrar +
               '<div id="ciudades' + i + '">' + contenidosRecibidos[i] + "</div>";
         }
         nodoMostrarResultados.innerHTML = contenidosAMostrar;
      }
   })

   let cadenaParametros = search;

         xmlhttp.open("POST", "ajaxCU01216F.php"); // Método post y url invocada
         xmlhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
         ); // Establecer cabeceras de petición
         xmlhttp.send(cadenaParametros); // Envio de parámetros usando POST
}