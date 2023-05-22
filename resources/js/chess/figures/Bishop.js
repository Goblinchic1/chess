import {Figure} from "./Figure.js";

export class Bishop extends Figure {
    canMove(dropSquare) {
        return super.canMove(dropSquare)
            && super.canMoveSquareColor(dropSquare)
            && this.canMoveDiagonal(dropSquare)
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

        return squareId % 8 !== replacedSquareId % 8 && figureRules
    }
}
