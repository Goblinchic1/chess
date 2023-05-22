import Figures from "./Figures.js";
import {Board} from "@/chess/Board.js";
export class Figure {
    Board
    _figure
    square
    figureAlias

    constructor(squareId, figureAlias, Board) {
        this.Board = Board

        this.figureAlias = figureAlias

        this.square = document.getElementById(squareId)

        this._figure = document.createElement('div')
        this._figure.classList.add('figure')

        this.show(Figures[figureAlias])

        this.drag()
    }


    show(figureName) {
        this._figure.innerHTML = figureName
        this.square.appendChild(this._figure)
    }


    drag() {
        this._figure.onmousedown = (e) => {
            const coords = this.getCoords(this._figure);
            this.shiftX = e.pageX - coords.left;
            this.shiftY = e.pageY - coords.top;

            this._figure.style.position = 'absolute';
            this._figure.style.zIndex = '';

            this.move()

            this.drop()

            this._figure.ondragstart = () => false
        }
    }


    drop() {
        this._figure.onmouseup = (e) => {
            this._figure.style.zIndex = '-1';

            let dropSquare = document.elementFromPoint(e.clientX, e.clientY)

            if (dropSquare.classList.contains('figure')) {
                dropSquare = dropSquare.parentNode;
            }

            this._figure.style.zIndex = '';

            if (this.canMove(dropSquare)) {
                dropSquare.innerHTML = '';

                dropSquare.appendChild(this._figure)

                this.Board.figures[this.square.id.replace('square_', '')] = '1'
                this.Board.figures[dropSquare.id.replace('square_', '')] = this.figureAlias

                this.square = dropSquare
            }


            this._figure.style.position = '';
            this._figure.style.left = '';
            this._figure.style.top = '';
            document.onmousemove = null;
            this._figure.onmouseup = null;
        }
    }


    move() {
        document.onmousemove = (e) => {
            this._figure.style.left = e.pageX - this.shiftX + 'px';
            this._figure.style.top = e.pageY - this.shiftY + 'px';
        }
    }

    getCoords(elem) {
        const box = elem.getBoundingClientRect();
        return {
            top: box.top,
            left: box.left
        };
    }


    canMove(dropSquare) {
        const squareId = parseInt(this.square.id.replace('square_', ''))
        const replacedSquareId = parseInt(dropSquare.id.replace('square_', ''))

        return this.canMoveColor(dropSquare)
            && this.canMoveKing(dropSquare)
            && this.canMoveVertical(dropSquare, squareId, replacedSquareId)
            && this.canMoveHorizontal(dropSquare, squareId, replacedSquareId)
            && this.canMoveDiagonal(squareId, replacedSquareId)
    }


    canMoveVertical(dropSquare, squareId, replacedSquareId) {
        if ((squareId - replacedSquareId) % 8 !== 0) {
            return true
        }

        if (squareId > replacedSquareId) {
            for (let i = squareId - 8; i > replacedSquareId; i -= 8) {
                if (this.Board.figures[i] !== '1') {
                    return false;
                }
            }
        } else {
            for (let i = squareId + 8; i < replacedSquareId; i += 8) {
                if (this.Board.figures[i] !== '1') {
                    return false;
                }
            }
        }


        return true
    }


    canMoveHorizontal(squareId, replacedSquareId) {
        if (Math.floor(squareId / 8) !== Math.floor(replacedSquareId / 8)) {
            return true
        }

        if (squareId > replacedSquareId) {
            for (let i = squareId - 1; i > replacedSquareId; i--) {
                if (this.Board.figures[i] !== '1') {
                    return false;
                }
            }
        } else {
            for (let i = squareId + 1; i < replacedSquareId; i++) {
                if (this.Board.figures[i] !== '1') {
                    return false;
                }
            }
        }

        return true
    }


    canMoveDiagonal(squareId, replacedSquareId) {


        const differenceSquares = Math.abs(squareId - replacedSquareId)

        let movesSquares = 0
        if (differenceSquares % 9 === 0) {
            movesSquares = 9
        } else if (differenceSquares % 7 === 0) {
            movesSquares = 7
        } else {
            return true
        }

        const minSquare = Math.min(squareId, replacedSquareId)
        const maxSquare = Math.max(squareId, replacedSquareId)

        for (let i = minSquare + movesSquares; i < maxSquare; i += movesSquares) {
            if (this.Board.figures[i] !== '1') {
                return false
            }
        }

        return true
    }


    canMoveSquareColor(dropSquare) {
        return dropSquare.classList.contains('black') === this.square.classList.contains('black')
    }


    canMoveColor(dropSquare) {
        const replaceFigure = this.Board.figures[dropSquare.id.replace('square_', '')];

        if (replaceFigure === '1') {
            return true
        }

        const replaceCase = replaceFigure === replaceFigure.toUpperCase()
        const figureCase = this.figureAlias === this.figureAlias.toUpperCase()

        return replaceCase !== figureCase
    }


    canMoveKing(dropSquare) {
        return !(dropSquare.childNodes[0] !== undefined
            && this.Board.figures[dropSquare.id.replace('square_', '')].toLowerCase() === 'k');
    }
}
