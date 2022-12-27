<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require `phpmailer/src/Exception.php`;
    require `phpmailer/src/PHPMailer.php`;

    $mail = new PHPMailer(true);
    $mail->Charset = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    // От кого письмо
    $mail->setFrom('eo18622@yandex.ru', 'Даниил Prog');
    // Кому отправить
    $mail->addAdress('eo18622@yandex.ru');
    // Тема письма
    $mail->Subject('Привет! "то тестовое задание 5 Углов');


    $body = '<h1>Это данные из формы отправленные по Ajax</h1>';

    // Имя
    if(trim(!empty($_Post['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    // Фамилия
    if(trim(!empty($_POST['surname']))){
        $body.='<p><strong>Фамилия:</strong> '.$_POST['surname'].'</p>';
    }
    // Телефон
    if(trim(!empty($_POST['tel']))){
        $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
    }
    // Почта
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    // Адресс
    if(trim(!empty($_POST['adress']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['adress'].'</p>';
    }

    $mail->Body = $body;

    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>