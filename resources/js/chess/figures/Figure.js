import Figures from "./Figures.js";
import {Queen} from "@/chess/figures/Queen.js";
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

        this.click()
    }


    show(figureName) {
        this._figure.innerHTML = figureName
        this.square.appendChild(this._figure)
    }


    click() {
        this._figure.onclick = () => {
            this.removePreMove()

            this.Board.figures.forEach((v, i) => {
                const dropSquare = document.getElementById('square_' + i)
                const canMove = this.canMove(dropSquare)
                if (canMove && dropSquare.childNodes[0] !== undefined) {
                    dropSquare.classList.add('pre-move_eat')
                    dropSquare.onclick = () => {
                        this.move(dropSquare)
                        dropSquare.onclick = null
                    }
                } else if (canMove) {
                    dropSquare.classList.add('pre-move')
                    dropSquare.onclick = () => {
                        this.move(dropSquare)
                        dropSquare.onclick = null
                    }
                }
            })
        }
    }

    drag() {
        this._figure.onmousedown = (e) => {
            const coords = this.getCoords(this._figure);
            this.shiftX = e.pageX - coords.left;
            this.shiftY = e.pageY - coords.top;

            this._figure.style.position = 'absolute';
            this._figure.style.zIndex = '';

            document.onmousemove = (e) => {
                this._figure.style.left = e.pageX - this.shiftX + 'px';
                this._figure.style.top = e.pageY - this.shiftY + 'px';
            }

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
                this.move(dropSquare)
            }


            this._figure.style.position = '';
            this._figure.style.left = '';
            this._figure.style.top = '';
            document.onmousemove = null;
            this._figure.onmouseup = null;
        }
    }


    move(dropSquare) {
        dropSquare.innerHTML = '';
        dropSquare.appendChild(this._figure)

        this.Board.figures[this.square.id.replace('square_', '')] = '1'
        this.Board.figures[dropSquare.id.replace('square_', '')] = this.figureAlias

        this.square = dropSquare

        this.removePreMove()

        const squareId = parseInt(this.square.id.replace('square_', ''))
        const replacedSquareId = parseInt(dropSquare.id.replace('square_', ''))

        this.canUpgrade(squareId, replacedSquareId)
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


    canMoveHorizontal(dropSquare, squareId, replacedSquareId) {
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

        let movedSquares = 0
        if (differenceSquares % 9 === 0) {
            movedSquares = 9
        } else if (differenceSquares % 7 === 0) {
            movedSquares = 7
        } else {
            return true
        }

        const minSquare = Math.min(squareId, replacedSquareId)
        const maxSquare = Math.max(squareId, replacedSquareId)

        for (let i = minSquare + movedSquares; i < maxSquare; i += movedSquares) {
            if (this.Board.figures[i] !== '1') {
                return false
            }
        }

        return true
    }


    canMoveSquareColor(dropSquare) {
        return dropSquare.classList.contains('black') === this.square.classList.contains('black')
    }


    canMoveCurrentColorDiagonal(squareId, replacedSquareId) {
        const moveSquares = Math.abs(squareId - replacedSquareId)
        return moveSquares % 7 === 0 || moveSquares % 9 === 0
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


    removePreMove() {
        document.querySelectorAll('.pre-move').forEach(square => {
            square.classList.remove('pre-move')
            square.onclick = null
        })
        document.querySelectorAll('.pre-move_eat').forEach(square => {
            square.classList.remove('pre-move_eat')
            if (this.square !== square) {
                square.onclick = null
            }
        })
    }

    canUpgrade(squareId, replacedSquareId) {
        if (this.figureAlias.toLowerCase() === 'p' && (replacedSquareId < 8 || replacedSquareId > 55)) {
            this.upgrade(squareId, replacedSquareId, (replacedSquareId < 8) ? 'Q' : 'q')
        }
    }


    upgrade(squareId, replacedSquareId, figureAlias) {
        this.square.innerHTML = ''
        document.getElementById('square_' + replacedSquareId).innerHTML = ''
        new Queen(`square_${replacedSquareId}`, figureAlias, this.Board)
        this.Board.figures[squareId] = '1'
        this.Board.figures[replacedSquareId] = figureAlias
    }
}
