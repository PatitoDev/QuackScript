import { Lexemes } from './Lexemes';
import { Position } from './Position';

export interface Token {
    value: string,
    position: Position,
    type: Lexemes,
}