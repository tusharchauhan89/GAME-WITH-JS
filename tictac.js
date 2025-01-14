document.addEventListener("DOMContentLoaded", function() {
    let boxes = document.querySelectorAll(".box");
    let reset = document.querySelector("#reset");
    let gamebtn = document.querySelector("#New-btn");
    let msgcontainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");
    let drawMessage = document.querySelector("#draw-message");

    let currentPlayer = "X";
    let computerPlayer = "O";

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    const resetGame = () => {
        currentPlayer = "X";
        enableBoxes();
        msgcontainer.classList.add("hide");
        drawMessage.classList.add("hide");
        msg.innerText = "";
        boxes.forEach(box => {
            box.innerText = "";
            box.removeAttribute("data-value"); // Reset data-value attribute
        });
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.innerText === "") {
                box.innerText = currentPlayer;
                box.setAttribute("data-value", currentPlayer); // Set data-value attribute
                checkWinner();
                if (![...boxes].some(box => box.innerText === "") && msgcontainer.classList.contains("hide")) {
                    showDraw();
                } else {
                    setTimeout(() => computerMove(), 500);
                }
            }
        });
    });

    const computerMove = () => {
        let emptyBoxes = [...boxes].filter(box => box.innerText === "");
        if (emptyBoxes.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
            let computerBox = emptyBoxes[randomIndex];
            computerBox.innerText = computerPlayer;
            computerBox.setAttribute("data-value", computerPlayer); // Set data-value attribute
            checkWinner();
            if (![...boxes].some(box => box.innerText === "") && msgcontainer.classList.contains("hide")) {
                showDraw();
            }
        }
    };

    const disableBoxes = () => {
        boxes.forEach(box => box.disabled = true);
    };

    const enableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
        });
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgcontainer.classList.remove("hide");
        drawMessage.classList.add("hide");
        disableBoxes();
    };

    const showDraw = () => {
        drawMessage.classList.remove("hide");
        msgcontainer.classList.add("hide");
        disableBoxes();
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
                if (pos1val === pos2val && pos2val === pos3val) {
                    showWinner(pos1val);
                    return;
                }
            }
        }
    };

    gamebtn.addEventListener("click", resetGame);
    reset.addEventListener("click", resetGame);
});