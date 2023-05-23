import {Figure} from "./Figure.js";

export class Bishop extends Figure {
    canMove(dropSquare) {
        const squareId = parseInt(this.square.id.replace('square_', ''))
        const replacedSquareId = parseInt(dropSquare.id.replace('square_', ''))

        return super.canMove(dropSquare)
            && (super.canMoveSquareColor(dropSquare) && super.canMoveCurrentColorDiagonal(squareId, replacedSquareId))
            && this.canMoveDiagonal(squareId, replacedSquareId)
    }


    canMoveHorizontal(dropSquare, squareId, replacedSquareId) {
        super.canMoveHorizontal(dropSquare, squareId, replacedSquareId)

        return Math.floor(squareId / 8) !== Math.floor(replacedSquareId / 8);
    }

    canMoveVertical(dropSquare, squareId, replacedSquareId) {
        const figureRules = super.canMoveVertical(dropSquare, squareId, replacedSquareId);

        return squareId % 8 !== replacedSquareId % 8 && figureRules
    }
}
