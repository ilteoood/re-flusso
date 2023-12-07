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

const adultContainer = document.querySelector<HTMLUListElement>('#adultList') as HTMLUListElement
const childContainer = document.querySelector<HTMLUListElement>('#childList') as HTMLUListElement

const response = await fetch('/users')

const [response1, response2] = fetchText(response).tee()

const appendElement = (container: HTMLUListElement) => (user: User) => {
  const li = document.createElement('li')
  li.textContent = `${user.name} ${user.surname} - ${user.age}`
  container.appendChild(li)
}

await Promise.all([
  pipeline(
    response1,
    parser(),
    filter(user => user.age >= 18),
    map(user => user.name),
    new WritableStream({ write: appendElement(adultContainer) })
  ),
  pipeline(
    response2,
    parser(),
    filter(user => user.age < 18),
    map(user => user.name),
    new WritableStream({ write: appendElement(childContainer) })
  )
])
