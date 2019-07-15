var dni=""
$(document).ready(function() {

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
    url:"https://laboremoto.df.uba.ar/parametros",
    type: "get",
	dataType:"json",
    contentType: "application/json",
	
    success: function(data){
		console.log('success',data);
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
	
})
