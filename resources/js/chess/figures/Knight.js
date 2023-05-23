import {Figure} from "./Figure.js";

export class Knight extends Figure {
    canMoveHorizontal(dropSquare, squareId, replacedSquareId) {
        return super.canMoveHorizontal(dropSquare, squareId, replacedSquareId)
            && this.canMoveByKnight(dropSquare, squareId, replacedSquareId)
    }


    canMoveByKnight(dropSquare, squareId, replacedSquareId) {
        const movedSquares = Math.abs(squareId - replacedSquareId)

        return !this.canMoveSquareColor(dropSquare)
            && (movedSquares === 6
                || movedSquares === 10
                || movedSquares === 15
                || movedSquares === 17
            )
    }
}
