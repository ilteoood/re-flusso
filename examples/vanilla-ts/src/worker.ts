import { fetchText } from '@ilteoood/re-flusso/fetchText'
import { filter } from '@ilteoood/re-flusso/filter'
import { map } from '@ilteoood/re-flusso/map'
import { parser } from '@ilteoood/re-flusso/ndJson/parser'
import { pipeline } from '@ilteoood/re-flusso/pipeline'

interface User {
    name: string
    surname: string
    age: number
}

const response = await fetch('/users')
const [response1, response2] = fetchText(response).tee()

const userMapper = (user: User) => `${user.name} ${user.surname} - ${user.age}`

const sendMessage = (kind: 'adult' | 'child') => (textContent: string) => {
    self.postMessage({ kind, textContent })
}

await Promise.all([
    pipeline(
        response1,
        parser(),
        filter(user => user.age >= 18),
        map(userMapper),
        new WritableStream({ write: sendMessage('adult') })
    ),
    pipeline(
        response2,
        parser(),
        filter(user => user.age < 18),
        map(userMapper),
        new WritableStream({ write: sendMessage('child') })
    )
])