import {Queen} from "./figures/Queen.js";
import {King} from "./figures/King.js";
import {Bishop} from "./figures/Bishop.js";
import {Knight} from "./figures/Knight.js";
import {Rook} from "./figures/Rook.js";
import {Pawn} from "./figures/Pawn.js";

export class Board {
    #board;
    figures
    constructor() {
        this.#board = document.getElementById('board')

        this.render();

        this.getFigures().then((figures) => {
            this.showFigures(figures);
        })

    }


    render() {
        this.#board.innerHTML = ''

        for (let squareId = 0; squareId < 64; squareId++) {
            const square = document.createElement('div')
            square.id = `square_${squareId}`

            const color = ((squareId % 8 + Math.floor(squareId / 8)) % 2) ? 'black' : 'white'

            square.classList.add('square', color)

            this.#board.appendChild(square)
        }

        this.#board.onselectstart = () => false
    }


    async getFigures() {
        const response = await fetch('/api/board')

        return await response.json()
    }


    showFigures(figures) {
        const figuresAliases = {
            Q: Queen,
            K: King,
            B: Bishop,
            N: Knight,
            R: Rook,
            P: Pawn,
        }

        this.figures = []
        for (let coordinate = 0; coordinate < 64; coordinate++) {
            const figureAlias = figures.charAt(coordinate)
            const figure = figuresAliases[figureAlias.toUpperCase()]
            this.figures.push(figureAlias)
            if (figure !== undefined) {
                new figure(`square_${coordinate}`, figureAlias, this)
            }
        }
    }
}
