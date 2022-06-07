const root = document.querySelector("#root");

let states = [];
let currentStateKey = 0;

function toggleButton(name) {
  let count = 0;
  const container = document.createElement("div");
  container.className = "toggle-container";

  const background = document.createElement("div");
  background.className = "toggle-background";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = name;
  checkbox.className = "none";
  console.log(checkbox.value);

  const label = document.createElement("label");
  label.htmlFor = name;
  label.className = "toggle-label";

  const stateP = document.createElement("p");

  checkbox.addEventListener("change", () => {
    console.log(checkbox.checked);
    background.classList.toggle("on");
    label.classList.toggle("on");
    stateP.innerText = `${name} ${count}`;
    count += 1;
  });

  container.appendChild(background);
  container.appendChild(checkbox);
  container.appendChild(label);
  container.appendChild(stateP);

  root.appendChild(container);
}

const createToggleButton = toggleButton;

let cnt = 0;
const button = document.createElement("button");
button.innerText = "Button";
button.addEventListener("click", () => {
  createToggleButton(`${cnt}`);
  cnt += 1;
});

root.appendChild(button);
