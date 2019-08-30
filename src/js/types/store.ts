export interface RootState {
    timers: Timer[],
    readonly defaultParams: Timer,
    readonly songs: Sound[]
}

export interface TimerMain {
    id?: number,
    name: string,
    song?: Sound
}

export interface Timer extends TimerMain {
    isActive: boolean,
    begin: number,
    passed: number
}

export interface SaveData extends TimerMain {
    hour: number,
    minute: number,
    second: number
}

export interface Sound {
    id: number,
    title: string
}
