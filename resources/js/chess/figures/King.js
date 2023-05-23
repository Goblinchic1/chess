import {Figure} from "./Figure.js";

export class King extends Figure {
    canMoveHorizontal(dropSquare, squareId, replacedSquareId) {
        return super.canMoveHorizontal(dropSquare, squareId, replacedSquareId)
            && this.canMoveByKing(squareId, replacedSquareId)
    }

    canMoveByKing(squareId, replacedSquareId) {
        const moveSquares = Math.abs(replacedSquareId - squareId);
        return !(moveSquares !== 7 && moveSquares !== 8 && moveSquares !== 9 && moveSquares !== 1);

    }
}
