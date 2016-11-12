export class Game {
    config: Config;
    players: Array<string>;
    active: boolean;
}

export class Config {
    dayLength: number;
    nightLength: number;
}
