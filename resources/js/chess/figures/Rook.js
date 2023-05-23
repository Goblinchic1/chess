import {Figure} from "./Figure.js";

export class Rook extends Figure {
    canMoveHorizontal(dropSquare, squareId, replacedSquareId) {
        return super.canMoveHorizontal(dropSquare, squareId, replacedSquareId)
            && this.canMoveByRook(squareId, replacedSquareId)
    }


    canMoveByRook(squareId, replacedSquareId) {
        const moveOnCurrentColumn = Math.abs(squareId - replacedSquareId) % 8 === 0
        const moveOnCurrentRow = Math.floor(squareId / 8) === Math.floor(replacedSquareId / 8)

        return moveOnCurrentColumn || moveOnCurrentRow
    }
}
