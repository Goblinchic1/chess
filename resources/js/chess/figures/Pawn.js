import {Figure} from "./Figure.js";

export class Pawn extends Figure {
    canMoveHorizontal(dropSquare, squareId, replacedSquareId) {
        super.canMoveHorizontal(dropSquare, squareId, replacedSquareId)

        return Math.floor(squareId / 8) !== Math.floor(replacedSquareId / 8);
    }


    canMoveVertical(dropSquare, squareId, replacedSquareId) {
        const figureRules = super.canMoveVertical(dropSquare, squareId, replacedSquareId);

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

        if ((canMoves < 7 || canMoves > 9) && ((squareRow !== 1 && squareRow !== 6) || canMoves !== 16)) {
            return false
        }

        return figureRules
            && this.canEat(squareId, replacedSquareId, canMoves)
    }


    canEat(squareId, replacedSquareId, canMoves) {
        const isBusyForward = canMoves === 8 && this.Board.figures[replacedSquareId] !== '1'

        const isFreeDiagonal = (canMoves === 7 || canMoves === 9) && this.Board.figures[replacedSquareId] === '1'

        return !(isBusyForward || isFreeDiagonal)
    }
}
