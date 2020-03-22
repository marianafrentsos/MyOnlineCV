let submitBtn = document.getElementById("submitBtn");
let succesAlert = document.querySelector(".succesMessage");
let errorAlert = document.querySelector(".errorMessage");
let inputItems = document.querySelectorAll(".form-control");
let emptyFields = document.querySelector(".emptyFields");
let emailFormat = document.querySelector(".emailFormat");

let format = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const displayAlert = alert => {
  setTimeout(function() {
    alert.classList.toggle("hide");
    alert.classList.add("fadeOut");
    setTimeout(function() {
      alert.classList.toggle("hide");
      alert.classList.remove("fadeOut");
    }, 3500);
  }, 500);
};

const clearFields = collection => {
  collection.forEach(element => {
    element.value = "";
  });
};

const checkIfEmpty = () => {
  let check = false;
  inputItems.forEach(input => {
    if (input.value === "") {
      input.style.border = "1px solid #60ced6";
      displayAlert(emptyFields);
      return (check = false);
    }
    if (email.value !== "" && !format.test(email.value)) {
      displayAlert(emailFormat);
      return (check = false);
    }

    if (input.value !== "" && format.test(email.value)) {
      return (check = true);
    }
  });

  return check;
};

// const url = "https://mycvproject.herokuapp.com/email";
const url = "http://localhost:3000/email";

let data = {
  email: "",
  subject: "",
  name: "",
  text: ""
};

const sendEmail = async () => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "* "
      },

      body: JSON.stringify(data)
    });
    console.log(response);
    if (response.status === 200) {
      displayAlert(succesAlert);
      clearFields(inputItems);
      data = {
        email: "",
        subject: "",
        name: "",
        text: ""
      };
      console.log("email sent");
    }
    if (response.status !== 200) {
      displayAlert(errorAlert);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const getMessageValues = data => {
  inputItems.forEach(item => {
    item.addEventListener("keyup", () => {
      item.style.border = null;
      data.name = inputItems[0].value;
      data.email = inputItems[1].value;
      data.subject = inputItems[2].value;
      data.text = inputItems[3].value;
      return data;
    });
  });
};
submitBtn.addEventListener("click", () => {
  event.preventDefault();
  getMessageValues(data);

  if (checkIfEmpty()) {
    sendEmail();
  }
});
