export interface RootState {
    timers: Timer[],
    readonly defaultParams: Timer,
    readonly songs: Sound[]
}

export interface Timer {
    id?: number,
    name: string,
    song: object | null,
    isActive: boolean,
    begin: number,
    passed: number
}

export interface Sound {
    id: number,
    title: string
}

export interface SaveData {
    id: number,
    name: string,
    song: object,
    hour: number,
    minute: number,
    second: number
}