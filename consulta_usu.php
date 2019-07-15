<?php

if(isset($_POST["dni"])){
	$connect=mysqli_connect("localhost","root","root","test");
	$query= "SELECT * FROM labs WHERE dni='".$_POST["dni"]."' ORDER BY fecha";
	$result =mysqli_query($connect,$query);
	$data=array();

	while($row = mysqli_fetch_assoc($result)){
		$data[]=$row;
	}
	echo json_encode($data);
}
?>