export const time = (timestamp: string) => {
const date = new Date(timestamp);

const dia = String(date.getDate()).padStart(2, "0");
const mes = String(date.getMonth() + 1).padStart(2, "0");
const ano = date.getFullYear();

const hora = String(date.getHours()).padStart(2, "0");
const minuto = String(date.getMinutes()).padStart(2, "0");

return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
}