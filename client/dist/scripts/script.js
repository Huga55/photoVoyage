function handleQuestion() {
  const questions = document.querySelectorAll(".questions__item");

  questions.forEach((question) => {
    const subtitle = question.querySelector(".questions__subtitle");

    subtitle.addEventListener("click", function () {
      const answer = question.querySelector(".questions__answer");
      const isOpen = answer.classList.contains("open");

      if (!answer) {
        return;
      }

      if (isOpen) {
        answer.style.height = "0px";
        answer.classList.remove("open");
        subtitle.classList.remove("active");

        return;
      }

      answer.style.height = answer.scrollHeight + "px";
      answer.classList.add("open");
      subtitle.classList.add("active");
    });
  });
}

function handleFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  const nameInput = form.querySelector(".feedback__name");
  const phoneInput = form.querySelector(".feedback__phone");
  const commentInput = form.querySelector(".feedback__comment");
  const submitButton = form.querySelector(".feedback__submit");

  const fields = [nameInput, phoneInput, commentInput];
  const defaultButtonText = submitButton.innerHTML;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Remove previous error messages and styles
    clearErrors();

    // Validate inputs
    let valid = validateInputs();

    if (valid) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Отправка...";
      fields.forEach((field) => {
        field.disabled = true;
      });
      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameInput.value,
            phone: phoneInput.value,
            comment: commentInput.value,
          }),
        });

        if (response.ok) {
          showSuccessMessage("Заявка успешно отправлена");
          form.reset();
        } else {
          showErrorMessage("Ошибка отправки заявки");
        }
      } catch (error) {
        showErrorMessage("Ошибка отправки заявки");
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = defaultButtonText;
        fields.forEach((field) => {
          field.disabled = false;
        });
      }
    }
  });

  function validateInputs() {
    let valid = true;

    if (nameInput.value.length < 2 || nameInput.value.length > 100) {
      showError(nameInput, "Имя должно быть от 2 до 100 символов");
      valid = false;
    }

    const phonePattern = /^(\+7|8)?\d{10}$/;
    if (!phonePattern.test(phoneInput.value)) {
      showError(
        phoneInput,
        "Телефон должен быть в формате (+79999999999) или (89999999999)",
      );
      valid = false;
    }

    if (commentInput.value.length > 500) {
      showError(commentInput, "Комментарий не должен превышать 500 символов");
      valid = false;
    }

    return valid;
  }

  function showError(input, message) {
    input.classList.add("error");
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    const errorElements = form.querySelectorAll(".error-message");
    errorElements.forEach((el) => (el.textContent = ""));
    const errorInputs = form.querySelectorAll(".error");
    errorInputs.forEach((input) => input.classList.remove("error"));
  }

  function showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = message;
    document.body.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  function showErrorMessage(message) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("success-message");
    errorMessage.style.backgroundColor = "red";
    errorMessage.textContent = message;
    document.body.appendChild(errorMessage);

    setTimeout(() => {
      errorMessage.remove();
    }, 5000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  handleQuestion();
  handleFeedbackForm();
});
