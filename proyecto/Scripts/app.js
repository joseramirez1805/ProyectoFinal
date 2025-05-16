import { resolverTorneo } from './utils.js';

document.getElementById("procesar").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    const output = resolverTorneo(input);
    document.getElementById("output").textContent = output;
});