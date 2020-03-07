let submitBtn = document.getElementById("submitBtn");
let succesAlert = document.querySelector(".succesMessage");
let errorAlert = document.querySelector(".errorMessage");
let inputItems = document.querySelectorAll(".form-control");
let emptyFields = document.querySelector(".emptyFields");
let format = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const displayAlert = alert => {
  setTimeout(function() {
    alert.classList.toggle("hide");
    alert.classList.add("fadeOut");
    setTimeout(function() {
      alert.classList.toggle("hide");
      alert.classList.remove("fadeOut");
    }, 2500);
  }, 1500);
};

const clearFields = collection => {
  collection.forEach(element => {
    element.value = "";
  });
};

const checkIfEmpty = () => {
  inputItems.forEach(input => {
    if (input.value === "") {
      input.style.border = "1px solid #60ced6";
      return displayAlert(emptyFields);
    }
  });
};

const checkEmailFormat = () => {
  if (email.value !== "" && !checkIfEmpty() && !format.test(email.value)) {
    emptyFields.innerText =
      "Please check your email adress format! It must look something like: yourname@example.com";
    displayAlert(emptyFields);
  }
};
const url = "https://mycvproject.herokuapp.com/email";
// const url = "http://localhost:3001/email";

const data = {
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log(response);
    if (response.status === 200) {
      displayAlert(succesAlert);
      clearFields(inputItems);
      console.log("email sent");
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
getMessageValues(data);
submitBtn.addEventListener("click", () => {
  event.preventDefault();
  if (!checkIfEmpty() && !checkEmailFormat()) {
    sendEmail();
  }
});
