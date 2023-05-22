import {Figure} from "./Figure.js";
import {Board} from "@/chess/Board.js";
import {Queen} from "@/chess/figures/Queen.js";

export class Pawn extends Figure {
    canMove(dropSquare) {
        return super.canMove(dropSquare)
    }

    canMoveHorizontal(dropSquare) {
        super.canMoveHorizontal(dropSquare)

        const squareId = parseInt(this.square.id.replace('square_', ''))
        const replacedSquareId = parseInt(dropSquare.id.replace('square_', ''))
        return Math.floor(squareId / 8) !== Math.floor(replacedSquareId / 8);
    }


    canMoveVertical(dropSquare) {
        const figureRules = super.canMoveVertical(dropSquare);

        const squareId = parseInt(this.square.id.replace('square_', ''))
        const replacedSquareId = parseInt(dropSquare.id.replace('square_', ''))

        const squareRow = Math.floor(squareId / 8)
        const replaceSquareRow = Math.floor(replacedSquareId / 8)

        if ((squareRow === 1 && replaceSquareRow > 3) || (squareRow === 6 && replaceSquareRow < 4)) {
            return false
        }

        if (squareRow < replaceSquareRow) {
            if (squareRow !== 1 && (replaceSquareRow - squareRow) > 1) {
                return false
            }

            if (this.figureAlias === this.figureAlias.toUpperCase()) {
                return false
            }
        } else {
            if (squareRow !== 6 && (squareRow - replaceSquareRow) > 1) {
                return false
            }

            if (this.figureAlias !== this.figureAlias.toUpperCase()) {
                return false
            }
        }

        const canMoves = Math.abs(replacedSquareId - squareId);
        if ((canMoves < 7 || canMoves > 9) && (squareRow !== 1 && squareRow !== 6)) {
            return false
        }

        return figureRules
            && this.canEat(squareId, replacedSquareId, canMoves)
            && this.canUpgrade(squareId, replacedSquareId)
    }


    canEat(squareId, replacedSquareId, canMoves) {
        if (canMoves === 8 && this.Board.figures[replacedSquareId] !== '1') {
            return false
        }

        if ((canMoves === 7 || canMoves === 9) && this.Board.figures[replacedSquareId] === '1') {
            return false
        }

        return true
    }


    canUpgrade(squareId, replacedSquareId) {
        if (replacedSquareId < 8 || replacedSquareId > 55) {
            this.upgrade(squareId, replacedSquareId, (replacedSquareId < 8) ? 'Q' : 'q')

            return false
        }

        return true
    }


    upgrade(squareId, replacedSquareId, figureAlias) {
        this.square.innerHTML = ''
        document.getElementById('square_' + replacedSquareId).innerHTML = ''
        new Queen(`square_${replacedSquareId}`, figureAlias, this.Board)
        this.Board.figures[squareId] = '1'
        this.Board.figures[replacedSquareId] = figureAlias
    }
}
