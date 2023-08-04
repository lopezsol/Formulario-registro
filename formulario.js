const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const clave = document.querySelector("#clave");
const form = document.querySelector("#form-registro");
const btn = document.querySelector("#boton");

const regEmail = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function modificarTexto(nombreInput) {
  cambiarEstiloInput(nombreInput, "hsl(249, 10%, 26%)", "#FFF", " ");
}

form.addEventListener("submit", function (event) {
  if (validarInputs()) {
    event.preventDefault();

    btn.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_mmgjw3f";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Claim your free trial";
        alert("Sent!");
      },
      (err) => {
        btn.value = "Claim your free trial";
        alert(JSON.stringify(err));
      }
    );
  } else {
    event.preventDefault();
  }
});

function validarInputs() {
  var resultado = true;
  var arrayInput = [
    {
      nombre: "nombre",
      valor: nombre.value,
      mensaje: "First Name cannot be empty",
    },
    {
      nombre: "apellido",
      valor: apellido.value,
      mensaje: "Last Name cannot be empty",
    },
    {
      nombre: "email",
      valor: email.value,
      mensaje: "Email cannot be empty",
      mensaje2: "Looks like this is not an email",
    },
    {
      nombre: "clave",
      valor: clave.value,
      mensaje: "Password cannot be empty",
    },
  ];

  for (var i = 0; i < arrayInput.length; i++) {
    var input = arrayInput[i];
    console.log(input);
    if (input.nombre == "email" && !validarEmail(input.valor)) {
      cambiarEstiloInput(
        input.nombre,
        "hsl(0, 100%, 74%)",
        "#FF7979",
        input.mensaje2
      );
      resultado = false;
    }
    if (input.valor == "") {
      document.querySelector("#" + input.nombre).placeholder = " ";
      cambiarEstiloInput(
        input.nombre,
        "hsl(0, 100%, 74%)",
        "#FF7979",
        input.mensaje
      );
      resultado = false;
    }
  }
  return resultado;
}

function validarEmail(email) {
  return regEmail.test(email);
}

function cambiarEstiloInput(input, colorInput, colorCirculo, mensaje) {
  document.querySelector("#error-" + input).innerHTML = mensaje;
  document.querySelector("#" + input).style.borderColor = colorInput;
  document.querySelector("#" + input).style.color = colorInput;
  document.querySelector("#circle-" + input).style.fill = colorCirculo;
}
