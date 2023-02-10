// Action column width fit with content
const actionCells = document.querySelectorAll("td.action");
actionCells.forEach((cell) => {
  cell.style.width = `${cell.offsetWidth}px`;
});
