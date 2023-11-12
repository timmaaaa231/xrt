$(document).ready(() => {
    const socket = io();

    const board = $("#board");

    let currentPlayer = "X";

    for (let i = 0; i < 9; i++) {
        const cell = $("<div>").addClass("cell").attr("data-index", i);
        cell.on("click", () => onCellClick(i));
        board.append(cell);
    }

    function onCellClick(index) {
        socket.emit("move", { index, player: currentPlayer });
    }

    socket.on("move", ({ index, player }) => {
        const cell = board.find(`[data-index="${index}"]`);
        cell.text(player);
        cell.css("pointer-events", "none");
        currentPlayer = (player === "X") ? "O" : "X";
    });
});
