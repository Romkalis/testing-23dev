const form = document.getElementById("form");

const validate = {
  name: {
    length: 20,
    value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
    message: "Имя может содержать только буквы, не более 20 символов", // Сообщение об ошибке
  },
  lastName: {
    length: 30,
    value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
    message: "Фамилия может содержать только буквы, не более 30 символов", // Сообщение об ошибке
  },
  password: {
    length: 8,
    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*_+=])(?=.*[a-zA-Z0-9]).{8,}$/,
    message:
      "Пароль должен содержать минимум 8 символов, одну заглавную букву и один спецсимвол.",
  },
  email: {
    length: 320,
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Введите корректный email",
  },
  birthdate: {
    value: (inputDate) => {
      const today = new Date();
      const birthDate = new Date(inputDate);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1;
      }
      return age;
    },
    check: (age) => age >= 18, // Условие проверки возраста
    message: "Вам должно быть не менее 18 лет.",
  },
};

const isValid = (elem, validation) => {
  if (validation) {
    elem.classList.remove("invalid");
    elem.classList.add("valid");
  } else {
    elem.classList.remove("valid");
    elem.classList.add("invalid");
  }
};

let isFormValid = {
  name: false,
  lastName: false,
  email: false,
  password: false,
  checkedPassword: false,
  isAdult: false,
};

form.addEventListener("focusout", (event) => {
  const field = event.target;
  const sendFormButton = document.getElementById("form-button");

  switch (field.id) {
    case "first-name": {
      let validation =
        validate.name.value.test(field.value) &&
        validate.name.length >= field.value.length;
      isValid(field, validation);

      isFormValid.name = validation;
      break;
    }

    case "last-name": {
      let validation =
        validate.lastName.value.test(field.value) &&
        validate.lastName.length >= field.value.length;
      isValid(field, validation);

      isFormValid.lastName = validation;
      break;
    }

    case "email": {
      const validation =
        validate.email.value.test(field.value) &&
        field.value.length <= validate.email.length;
      isValid(field, validation);

      isFormValid.email = validation;
      break;
    }

    case "password": {
      let validation = validate.password.value.test(field.value);
      console.log();
      isValid(field, validation);

      isFormValid.password = validation;

      break;
    }

    case "password-confirm": {
      let password = document.getElementById("password").value;
      let validation =
        validate.password.value.test(field.value) && field.value === password;
      isValid(field, validation);

      isFormValid.checkedPassword = validation;

      break;
    }

    case "birth-day": {
      const dateNow = new Date();
      const ADULTS__AGE = 568036800000; // 18 лет в милисекундах

      const validation = Boolean(
        dateNow - new Date(field.value) >= ADULTS__AGE
      );

      isValid(field, validation);
      isFormValid.isAdult = validation;
      break;
    }
  }

  if (Object.values(isFormValid).every((entity) => entity === true)) {
    sendFormButton.disabled = false;
  } else {
    sendFormButton.disabled = true;
  }
});
