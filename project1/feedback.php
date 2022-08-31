<?php

// подгружаем дополнительную библеотеку для отправки сообщения
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
sleep(1); // задержка выполнения кода
// принимаем файлы, которые пришли через пост запрос
$name    = isset($_POST['name']) ? strip_tags($_POST['name']) : '';
$phone   = isset($_POST['phone']) ? strip_tags($_POST['phone']) : '';
$email   = isset($_POST['email']) ? strip_tags($_POST['email']) : '';
$city    = isset($_POST['city']) ? strip_tags($_POST['city']) : '';

// регулярные выражения для данных которые были введены в форму на сайте
// имя и город можно писать только русскими буквами
// номер телефона начинается только с 8 и максимальное кол-во цифер 11 вместе с восьмёркой
//емаил пишется с использованием @ и .
$regexs_name = "/[a-zA-Zа-яёА-ЯЁ]+/u";
$regexs_phone = "/8\d{10}/";
$gerexp_email = "/[-.\w]+@([\w-]+\.)+[\w-]+/";
// создаём массив для ошибок
$errors  = [];
//условия для выявления ошибки
if (!$name || !preg_match($regexs_name, $name)) {
    $errors['name'] = 'Представьтесь, пожалуйста';
}
if (!$phone || !preg_match($regexs_phone, $phone)) {
    $errors['phone'] = 'Укажите телефон';
}
if (!$email || !preg_match($gerexp_email, $email)) {
    $errors['email'] = 'Укажите e-mail';
}
if (!$city || !preg_match($regexs_name, $city)) {
    $errors['city'] = 'Укажите город';
}
// условие если есть хотябы одна ошибка сообщение об ошибки отпровляется с сервера клиенту
// если нету ошибок сервер отпровляет положительный ответ
// и отпровляет данные с формы на электронную почту
if (count($errors)) {
    $ret = [
        'result'  => 'error',
        'message' => 'Исправьте ошибки при заполнении',
        'errors'  => $errors,
    ];
} else {
    $ret = [
        'result'  => 'success',
        'message' => 'Ваша заявка отправлена менеджеру',
    ];
    try {
        // настраимаем почту с которой будет отправляться сообщение, и почту на которую будет приходить сообщение
        // почта student4@bmdemo.ru для отправки сообщений была создана в яндекс почте поэтому хост пишется яндекса и порт
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.yandex.ru';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'student4@bmdemo.ru';                     // SMTP username
        $mail->Password   = 'student4Pass';                               // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        //Recipients
        $mail->setFrom('student4@bmdemo.ru', 'Taxi Maxim');
        $mail->addAddress('sdtolya@gmail.com', 'Tolya');     // Add a recipient // здесь пишется почта на которую будут приходить сообщения

        $mail->SMTPDebug = 2;
        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Taxi Maxim';
//        $mail->Body    = 'Заявку отправил '.$name;
        // пишем сообщение
        $mail->Body    = sprintf('Имя: %s <br> Город: %s <br> Электроный адрес: %s <br> Номер телефона: %s',$name, $city, $email, $phone);
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
       // echo 'Message has been sent';
    } catch (Exception $e) {

      //  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
header('Content-Type: application/json');
echo json_encode($ret, JSON_PRETTY_PRINT);

exit();


