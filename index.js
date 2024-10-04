document.getElementById("formatButton").addEventListener("click", function () {
  // Получаем исходные номера телефонов
  const rawPhoneNumbers = document.getElementById("phoneNumbers").value;

  // Регулярное выражение для поиска номеров телефонов
  const phoneNumberRegex =
    /(\+?\d{1,4}[ -]?)?\(?\d{1,4}\)?[ -]?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,9}/g;

  // Извлекаем все номера, соответствующие регулярному выражению
  const phoneNumbers = rawPhoneNumbers.match(phoneNumberRegex) || [];

  // Для отладки
  console.log("Extracted Numbers:", phoneNumbers);

  // Обрабатываем каждый номер
  const processedNumbers = phoneNumbers
    .map(phoneNumber => cleanPhoneNumber(phoneNumber))
    .map(phoneNumber => formatPhoneNumber(phoneNumber))
    .filter(isValidPhoneNumber); // Фильтруем только валидные номера

  // Для отладки
  console.log("Processed Numbers:", processedNumbers);

  // Фильтруем региональные номера
  const nonRegionalNumbers = processedNumbers.filter(removeRegionalNumbers);

  // Удаляем дубликаты
  const uniqueNumbers = [...new Set(nonRegionalNumbers)];

  // Отображаем результаты
  displayFormattedNumbers(uniqueNumbers);
});

function cleanPhoneNumber(phoneNumber) {
  // Убираем все символы, кроме цифр
  return phoneNumber.replace(/[^\d]/g, "");
}

function formatPhoneNumber(phoneNumber) {
  // Проверяем длину номера и форматируем его
  if (phoneNumber.length === 11 && phoneNumber.startsWith("8")) {
    return "7" + phoneNumber.slice(1); // Заменяем 8 на 7
  } else if (phoneNumber.length === 10) {
    return "7" + phoneNumber; // Добавляем 7 для формата 10 цифр
  } else if (phoneNumber.length === 11 && phoneNumber.startsWith("7")) {
    return phoneNumber; // Номер уже в правильном формате
  } else if (phoneNumber.length === 12 && phoneNumber.startsWith("8")) {
    return "7" + phoneNumber.slice(1); // Обрабатываем случаи с длиной 12 и начинающимся с 8
  } else if (phoneNumber.length === 15) {
    // Обрабатываем формат с 15 символами (включает пробелы и скобки)
    return phoneNumber.length === 15
      ? "7" + phoneNumber.replace(/[^\d]/g, "")
      : null; // Убираем все символы, кроме цифр и заменяем первую 8 на 7
  }
  return null; // Возвращаем null для некорректных номеров
}

function isValidPhoneNumber(phoneNumber) {
  // Регулярное выражение для проверки валидности номера
  const phoneNumberPattern = /^7\d{10}$/; // Поддерживает только формат 7xxxxxxxxxx
  return phoneNumber && phoneNumberPattern.test(phoneNumber);
}

function removeRegionalNumbers(phoneNumber) {
  // Региональные коды для фильтрации
  const regionalPattern = /^7(484|848|7494|499|495|812|381|7474)/;
  return !regionalPattern.test(phoneNumber); // Фильтруем номера, которые не соответствуют региональным кодам
}

function displayFormattedNumbers(numbers) {
  const phoneList = document.getElementById("formattedNumbers");
  phoneList.innerHTML = ""; // Очищаем список перед отображением новых номеров
  numbers.forEach((number, index) => {
    const listItem = document.createElement("li");

    // Создаем элемент для номера строки
    const lineNumber = document.createElement("span");
    lineNumber.className = "line-number";
    lineNumber.textContent = index + 1;

    // Создаем элемент для номера телефона
    const phoneNumber = document.createElement("span");
    phoneNumber.className = "phone-number";
    phoneNumber.textContent = number;

    // Добавляем оба элемента в список
    listItem.appendChild(lineNumber);
    listItem.appendChild(phoneNumber);

    phoneList.appendChild(listItem);

    document.getElementById("downloadTarget").style.display = "block";
  });
}

function downloadFormattedNumbers(numbers) {
  const header = "msisdn;Имя;Фамилия;Отчество;Дата рождения;Комментарий\n"; // Заголовок файла
  const fileContent = header + numbers.join("\n"); // Преобразуем массив номеров в строку с заголовком

  const blob = new Blob([fileContent], { type: "text/plain" }); // Создаем Blob для скачивания

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "target_numbers.txt"; // Название файла
  link.click(); // Симулируем клик для скачивания
}

// Привязываем событие на кнопку "Скачать таргет"
document
  .getElementById("downloadTarget")
  .addEventListener("click", function () {
    const numbers = Array.from(document.querySelectorAll(".phone-number")).map(
      item => item.textContent
    ); // Собираем номера телефонов
    downloadFormattedNumbers(numbers); // Передаем номера для скачивания
  });

document
  .getElementById("certificateForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    const formData = new FormData(this); // Собираем данные формы

    // Отправляем данные формы на сервер
    fetch("./send_certificates.php", {
      method: "POST",
      body: formData,
    })
      .then(response => response.text())
      .then(result => {
        document.getElementById("message").textContent = result;
      })
      .catch(error => {
        document.getElementById("message").textContent =
          "Ошибка при отправке сертификатов: " + error;
      });
  });
document.getElementById("formatButton").addEventListener("click", function () {
  // Получаем исходные номера телефонов
  const rawPhoneNumbers = document.getElementById("phoneNumbers").value;

  // Регулярное выражение для поиска номеров телефонов
  const phoneNumberRegex =
    /(\+?\d{1,4}[ -]?)?\(?\d{1,4}\)?[ -]?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,9}/g;

  // Извлекаем все номера, соответствующие регулярному выражению
  const phoneNumbers = rawPhoneNumbers.match(phoneNumberRegex) || [];

  // Для отладки
  console.log("Extracted Numbers:", phoneNumbers);

  // Обрабатываем каждый номер
  const processedNumbers = phoneNumbers
    .map(phoneNumber => cleanPhoneNumber(phoneNumber))
    .map(phoneNumber => formatPhoneNumber(phoneNumber))
    .filter(isValidPhoneNumber); // Фильтруем только валидные номера

  // Для отладки
  console.log("Processed Numbers:", processedNumbers);

  // Фильтруем региональные номера
  const nonRegionalNumbers = processedNumbers.filter(removeRegionalNumbers);

  // Удаляем дубликаты
  const uniqueNumbers = [...new Set(nonRegionalNumbers)];

  // Отображаем результаты
  displayFormattedNumbers(uniqueNumbers);
});

function cleanPhoneNumber(phoneNumber) {
  // Убираем все символы, кроме цифр
  return phoneNumber.replace(/[^\d]/g, "");
}

function formatPhoneNumber(phoneNumber) {
  // Проверяем длину номера и форматируем его
  if (phoneNumber.length === 11 && phoneNumber.startsWith("8")) {
    return "7" + phoneNumber.slice(1); // Заменяем 8 на 7
  } else if (phoneNumber.length === 10) {
    return "7" + phoneNumber; // Добавляем 7 для формата 10 цифр
  } else if (phoneNumber.length === 11 && phoneNumber.startsWith("7")) {
    return phoneNumber; // Номер уже в правильном формате
  } else if (phoneNumber.length === 12 && phoneNumber.startsWith("8")) {
    return "7" + phoneNumber.slice(1); // Обрабатываем случаи с длиной 12 и начинающимся с 8
  } else if (phoneNumber.length === 15) {
    // Обрабатываем формат с 15 символами (включает пробелы и скобки)
    return phoneNumber.length === 15
      ? "7" + phoneNumber.replace(/[^\d]/g, "")
      : null; // Убираем все символы, кроме цифр и заменяем первую 8 на 7
  }
  return null; // Возвращаем null для некорректных номеров
}

function isValidPhoneNumber(phoneNumber) {
  // Регулярное выражение для проверки валидности номера
  const phoneNumberPattern = /^7\d{10}$/; // Поддерживает только формат 7xxxxxxxxxx
  return phoneNumber && phoneNumberPattern.test(phoneNumber);
}

function removeRegionalNumbers(phoneNumber) {
  // Региональные коды для фильтрации
  const regionalPattern = /^7(484|848|7494|499|495|812|381|7474)/;
  return !regionalPattern.test(phoneNumber); // Фильтруем номера, которые не соответствуют региональным кодам
}

function displayFormattedNumbers(numbers) {
  const phoneList = document.getElementById("formattedNumbers");
  phoneList.innerHTML = ""; // Очищаем список перед отображением новых номеров
  numbers.forEach((number, index) => {
    const listItem = document.createElement("li");

    // Создаем элемент для номера строки
    const lineNumber = document.createElement("span");
    lineNumber.className = "line-number";
    lineNumber.textContent = index + 1;

    // Создаем элемент для номера телефона
    const phoneNumber = document.createElement("span");
    phoneNumber.className = "phone-number";
    phoneNumber.textContent = number;

    // Добавляем оба элемента в список
    listItem.appendChild(lineNumber);
    listItem.appendChild(phoneNumber);

    phoneList.appendChild(listItem);

    document.getElementById("downloadTarget").style.display = "block";
  });
}

function downloadFormattedNumbers(numbers) {
  const header = "msisdn;Имя;Фамилия;Отчество;Дата рождения;Комментарий\n"; // Заголовок файла
  const fileContent = header + numbers.join("\n"); // Преобразуем массив номеров в строку с заголовком

  const blob = new Blob([fileContent], { type: "text/plain" }); // Создаем Blob для скачивания

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "target_numbers.txt"; // Название файла
  link.click(); // Симулируем клик для скачивания
}

// Привязываем событие на кнопку "Скачать таргет"
document
  .getElementById("downloadTarget")
  .addEventListener("click", function () {
    const numbers = Array.from(document.querySelectorAll(".phone-number")).map(
      item => item.textContent
    ); // Собираем номера телефонов
    downloadFormattedNumbers(numbers); // Передаем номера для скачивания
  });

document
  .getElementById("certificateForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    const formData = new FormData(this); // Собираем данные формы

    // Отправляем данные формы на сервер
    fetch("./send_certificates.php", {
      method: "POST",
      body: formData,
    })
      .then(response => response.text())
      .then(result => {
        document.getElementById("message").textContent = result;
      })
      .catch(error => {
        document.getElementById("message").textContent =
          "Ошибка при отправке сертификатов: " + error;
      });
  });
