import {Figure} from "./Figure.js";

export class Queen extends Figure {
    canMoveHorizontal(dropSquare, squareId, replacedSquareId) {
        return super.canMoveHorizontal(dropSquare, squareId, replacedSquareId)
            && this.canMoveByQueen(dropSquare, squareId, replacedSquareId)
    }


    canMoveByQueen(dropSquare, squareId, replacedSquareId) {

        const moveOnCurrentColumn = Math.abs(squareId - replacedSquareId) % 8 === 0
        const moveOnCurrentRow = Math.floor(squareId / 8) === Math.floor(replacedSquareId / 8)

        return (moveOnCurrentColumn || moveOnCurrentRow)
            || (this.canMoveSquareColor(dropSquare) && this.canMoveCurrentColorDiagonal(squareId, replacedSquareId))
    }
}
