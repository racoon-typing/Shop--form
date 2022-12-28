<?php
// Файлы phpmailer
require 'files/PHPMailer.php';
require 'files/SMTP.php';
require 'files/Exception.php';

$title = "Тема письма";
// $file 

$c = true;
// Формирование самого письма
$title = "Заголовок письма";
foreach( $_POST as $key => $value ) {
    if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
        $body .= "
        " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
            <td style='padding: 10px; border: 1px solid #e9e9e9;'><b>$key</b></td>
            <td style='padding: 10px; border: 1px solid #e9e9e9;'>$value</td>
        </tr>
        ";
    }
}

$body = "<table style='width: 100%;'>$body</table>";


// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;

    // Настройка моей почты
    $mail->Host = 'smtp.yandex.ru'; // SMTP сервер вашей почты
    $mail->Username = 'eo18622@yandex.ru'; // Логин на почте
    $mail->Password = 'rhuuhybfpffdahxo'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->SetFrom('eo18622@yandex.ru', 'Заявка с сайта 5 Углов'); // Адрес почты откуда отправляю и имя отправителя

    // Получатель письма
    $mail->addAddress('eo18622@yandex.ru');
    // $mail->addAddress(); // Еще один если нужен


    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    $mail->send();


} catch (Exception $e) {
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}