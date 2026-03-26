export let day = 1;
export let week = "";
export let year = 0;
let weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const now = new Date();
day = now.getDate();
week = weeks[now.getDay()]
year = now.getFullYear();