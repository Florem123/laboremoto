<?php

	$dni=$_POST["dni"];
	$freq=$_POST["freq"];
	$img=$_POST["img"];

	$connect=mysqli_connect("localhost","root","root","test");
	$query= "INSERT into labs (dni,freq,img) values ('$dni','$freq','$img')";
	$result =mysqli_query($connect,$query);

	echo $result;

?>