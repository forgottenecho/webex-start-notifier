<?php
header('Access-Control-Allow-Origin: https://njit.webex.com');
if (!isset($_GET['open'])) {die("nope");}
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->Mailer = "smtp";

$mail->SMTPDebug  = 1;  
$mail->SMTPAuth   = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "smtp.gmail.com";
$mail->Username   = "SENDER EMAIL";
$mail->Password   = "PASSWORD";

$mail->IsHTML(true);
$mail->AddAddress("RECIPIENT EMAIL", "recipient-name");
$mail->SetFrom("SENDER EMAIL", "from-name");
$mail->Subject = "";
$content = "WEBEX ROOM OPEN";

$mail->MsgHTML($content); 
if(!$mail->Send()) {
  echo "Error while sending Email.";
  var_dump($mail);
} else {
  echo "Email sent successfully";
}

?>