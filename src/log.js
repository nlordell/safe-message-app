function log(area, value) {
  const console = document.querySelector(`#${area}`);
  const message = typeof value === "string" ? value : JSON.stringify(value);
  const line = document.createElement("p");
  line.innerText = message;
  console.append(line);
}

export function debug(value) {
  log("debug", value);
}

export function error(value) {
  log("error", value);
}
