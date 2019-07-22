var dni="";
var salidafrec='';
var salidafase='';
var salidaamp='';
$(document).ready(function() {
	sendRequest();
	var fre,hor,ima;//frecuencia,usuario,hora e imagen actual 
	var usu=prompt("introduzca su nro de documento");

	while (usu ==""){
		var usu=prompt("introduzca su nro de documento");
	}
	console.log(usu);

	dni=usu;
	$.ajax({
		url:"consulta_usu.php",
		method:"POST",
		data: {dni:dni},
		dataType: "json",
		success: function(data){
			console.log(data);
			var salida="";
			if (data.length!=0){
				console.log("entra al IF"+data.length);
				
				for(i=0;i<data.length;i++){
					var resul=data[i];
					var fecha=resul.fecha;
					salida=salida+"Fecha: "+fecha+"<br>Imagen: <a>Ver</a> <br>Frecuencia: "+resul.freq+"<br>Fase: 120°<br>Amplitud: 1<br>-----------------------<br>";
				}

			}
			else{
				salida+= "Bienvenido a tu primer experiencia!";
			}
		$("#historialCapturas").append(salida);
		}
	});
	
	
	$.ajax({
    url:"https://cors-anywhere.herokuapp.com/https://laboremoto.df.uba.ar/rangos",
    type: "get",
	dataType:"json",
    contentType: "application/json",
	
    success: function(data){
		
		var result=data.valor;
		
		//ESTOS SERAN LOS VALORES LIMITES DE LA AMPLITUD
		var ampini=result.amplitud[0];
		var ampfin=result.amplitud[1];
		//ESTOS SERAN LOS VALORES LIMITES DE LA FASE
		var faseini=result.fase[0];
		var fasefin=result.fase[1];
		//ESTOS SERAN LOS VALORES LIMITES DE LA FRECUENCIA
		var frecini=result.frecuencia[0];
		var frecfin=result.frecuencia[1];
		console.log("Amplitud: "+ampini+"-"+ampfin+" Fase: "+faseini+"-"+fasefin+" Frecuencia: "+frecini+"-"+frecfin);
		salidafrec+=
		'<input type="number" id="valorfrec" class="form-control" placeholder="Frecuencia" label="Frecuencia" aria-describedby="basic-addon2" min="'+frecini+'"" max="'+frecfin+'">'+
		'<p>Los valores de Frecuencia pueden ir desde:'+frecini+', hasta: '+frecfin+'</p>';
		$('#inputFrecuencia').html(salidafrec);
		salidafase+=
		'<input type="number" id="valorfase" class="form-control" placeholder="Fase" label="Fase" aria-describedby="basic-addon2" min="'+faseini+'"" max="'+fasefin+'">'+
		'<p>Los valores de Fase pueden ir desde:'+faseini+', hasta: '+fasefin+'</p>';
		$('#inputFase').html(salidafase);
		salidaamp+=
		'<input type="number" id="valoramp" class="form-control" placeholder="Amplitud" label="Amplitud" aria-describedby="basic-addon2" min="'+ampini+'"" max="'+ampfin+'">'+
		'<p>Los valores de Amplitud pueden ir desde:'+ampini+', hasta: '+ampfin+'</p>';
		$('#inputAmplitud').html(salidaamp);
	}
	});
	
	
	$("#descargafoto").click(function(){
		//MUESTRA LA IMAGEN
		var image= new Image();
		var src= "picture.jpg";
		image.src=src;
		image.width=150;
		image.height=100;
		$("#canvas-foto").append(image);
		//GUARDAR LA IMAGEN 
		var fre=document.getElementById("inputFrecuencia").value;
		if (fre ===undefined){fre =-1}
		var freq=parseInt(fre);
		img="dniwebfciwbvowVBWOVNowirbvnrinwOBNV";
		console.log(dni,freq,img);

		$.ajax({
			url:"guardarnuevo.php",
			type:"POST",
			data: {dni:dni,freq:freq,img:img},
			success: function(r){
				if(r==1){alert("agregado con exito");}
				else{alert("fallo el server");}
				
			}
		});
	})

	$("#botonFrecuencia").click(function(){
		console.log("BOTON FRECUENCIA");
		var fre=document.getElementById("valorfrec").value;
		console.log(fre);
		$.ajax({
		    url:"https://cors-anywhere.herokuapp.com/https://laboremoto.df.uba.ar/frecuencia/"+fre,
		    type: "get",
			dataType:"json",
		    contentType: "application/json",
		
			success: function(data){
			console.log(data);
			}
		});
	})

	$("#botonFase").click(function(){
		console.log("BOTON FASE");
		var fas=document.getElementById("valorfase").value;
		console.log(fas);
		$.ajax({
		    url:"https://cors-anywhere.herokuapp.com/https://laboremoto.df.uba.ar/fase/"+fas,
		    type: "get",
			dataType:"json",
		    contentType: "application/json",
		
			success: function(data){
			console.log(data);
			}
		});
	})

	$("#botonAmplitud").click(function(){
		console.log("BOTON AMPLITUD");
		var am=document.getElementById("valoramp").value;
		console.log(am);
		$.ajax({
		    url:"https://cors-anywhere.herokuapp.com/https://laboremoto.df.uba.ar/amplitud/"+am,
		    type: "get",
			dataType:"json",
		    contentType: "application/json",
		
			success: function(data){
			console.log(data);
			}
		});
	})
})
function sendRequest(){
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://laboremoto.df.uba.ar/live",
    success:
      function(result){ 
/* si es success mostramos resultados */
       $('#frame').html(result);
       console.log("refresca");
    },
    complete: function() { 
/* solo una vez que la petición se completa (success o no success) 
   pedimos una nueva petición en 3 segundos */
       setTimeout(function(){
         sendRequest();
       }, 3000);
      }
    });
  };