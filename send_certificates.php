<<<<<<< HEAD
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Подключение автозагрузчика Composer

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $clientEmail = $_POST['clientEmail'] ?? '';
  $eventTitle = $_POST['eventTitle'] ?? 'Без названия';
  $certificatesFile = $_FILES['certificatesFile'] ?? null;

  // Проверка на наличие email
  if (empty($clientEmail)) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: email клиента не указан.']);
    exit;
  }

  // Проверка на загрузку файла
  if (!$certificatesFile || $certificatesFile['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: Не удалось загрузить файл. Код ошибки: ' . $certificatesFile['error']]);
    exit;
  }

  // Создание экземпляра PHPMailer
  $mail = new PHPMailer(true);

  try {
    // Настройки сервера
    $mail->isSMTP();                                      // Установить использование SMTP
    $mail->Host = 'smtp.yandex.com';                       // Указать основной и резервный SMTP-сервер
    $mail->SMTPAuth = true;                               // Включить аутентификацию SMTP
    $mail->Username = 'nikulin@conta40.ru';               // Ваш SMTP логин
    $mail->Password = 'Spammer228!';                        // Ваш SMTP пароль
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Включить шифрование TLS
    $mail->Port = 587;                                    // TCP порт для подключения

    // Получатели
    $mail->setFrom('nikulin@conta40.ru', 'Ваше Имя');     // Отправитель
    $mail->addAddress($clientEmail);                       // Получатель

    // Контент
    $mail->isHTML(true);                                  // Установить формат электронной почты в HTML
    $mail->Subject = "Сертификаты для $eventTitle";      // Тема письма
    $mail->Body = 'Ваши сертификаты прикреплены к этому письму.'; // Тело письма
    $mail->addAttachment($certificatesFile['tmp_name'], $certificatesFile['name']); // Вложение

    // Отправка
    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Сертификаты отправлены успешно!']);
  } catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при отправке сертификатов: ' . $mail->ErrorInfo]);
  }
} else {
  echo json_encode(['status' => 'error', 'message' => 'Неверный запрос.']);
}
=======
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Подключение автозагрузчика Composer

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $clientEmail = $_POST['clientEmail'] ?? '';
  $eventTitle = $_POST['eventTitle'] ?? 'Без названия';
  $certificatesFile = $_FILES['certificatesFile'] ?? null;

  // Проверка на наличие email
  if (empty($clientEmail)) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: email клиента не указан.']);
    exit;
  }

  // Проверка на загрузку файла
  if (!$certificatesFile || $certificatesFile['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: Не удалось загрузить файл. Код ошибки: ' . $certificatesFile['error']]);
    exit;
  }

  // Создание экземпляра PHPMailer
  $mail = new PHPMailer(true);

  try {
    // Настройки сервера
    $mail->isSMTP();                                      // Установить использование SMTP
    $mail->Host = 'smtp.yandex.com';                       // Указать основной и резервный SMTP-сервер
    $mail->SMTPAuth = true;                               // Включить аутентификацию SMTP
    $mail->Username = 'nikulin@conta40.ru';               // Ваш SMTP логин
    $mail->Password = 'Spammer228!';                        // Ваш SMTP пароль
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Включить шифрование TLS
    $mail->Port = 587;                                    // TCP порт для подключения

    // Получатели
    $mail->setFrom('nikulin@conta40.ru', 'Ваше Имя');     // Отправитель
    $mail->addAddress($clientEmail);                       // Получатель

    // Контент
    $mail->isHTML(true);                                  // Установить формат электронной почты в HTML
    $mail->Subject = "Сертификаты для $eventTitle";      // Тема письма
    $mail->Body = 'Ваши сертификаты прикреплены к этому письму.'; // Тело письма
    $mail->addAttachment($certificatesFile['tmp_name'], $certificatesFile['name']); // Вложение

    // Отправка
    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Сертификаты отправлены успешно!']);
  } catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при отправке сертификатов: ' . $mail->ErrorInfo]);
  }
} else {
  echo json_encode(['status' => 'error', 'message' => 'Неверный запрос.']);
}
>>>>>>> f95474682adc23cf741a054d7968185e14b88cf6
