// BASIC TYPESCRIPT

let age: number
let isStudent: boolean
let hobbies: string[]
let role: [number, string]
let printId: number | string
let personName: unknown

type Person = {
  name: string
  age: number
}

let person: Person = {
  name: 'hdz',
  age: 0
}

let lostOfPeople: Person[]

let printName: (name: string) => void

export {}
