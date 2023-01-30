const form = document.querySelector("#form");

const select = document.querySelector("#codeSelect");
const code = document.querySelector("#code");

const preview = document.querySelector("#preview");
const file = document.querySelector("#myFile");

document.addEventListener("DOMContentLoaded", (e) => {
  fetchCountryCodes();
});

//CODIGOS INTERNACIONALES -----------------------------------
const fetchCountryCodes = async () => {
  try {
    const res = await fetch("./data/countryCodes.json");
    const data = await res.json();
    cargarCodes(data);
  } catch (error) {
    console.log(error);
  }
};

const cargarCodes = (data) => {
  select.textContent = "Codigo Pais";
  data.forEach((pais) => {
    let opt = document.createElement("option");
    opt.value = pais.dial_code;
    opt.text = pais.name;
    select.appendChild(opt);
  });
};

const seleccionarCode = () => {
  const indice = select.selectedIndex;
  if (indice === -1) return;
  const paiSeleccionado = select.options[indice];
  code.value = paiSeleccionado.value;
};

select.addEventListener("change", seleccionarCode);

//IMAGENES -----------------------------------
const renderImage = (formData) => {
  const file = formData.get("myFile");
  const myFile = URL.createObjectURL(file);
  preview.setAttribute("src", myFile);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  fetch("/signup", {
    method: "POST",
    body: formData,
  });
  form.reset();
});
