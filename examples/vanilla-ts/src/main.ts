import PersonWorker from './worker?worker'

type PersonKind = 'adult' | 'child'

interface WorkerMessage {
  kind: PersonKind
  textContent: string
}

const containers = {
  adult: document.querySelector<HTMLUListElement>('#adultList') as HTMLUListElement,
  child: document.querySelector<HTMLUListElement>('#childList') as HTMLUListElement
}

const people: Record<PersonKind, string[]> = {
  adult: [],
  child: []
}

const worker = new PersonWorker()


worker.onmessage = ({ data: { kind, textContent } }: MessageEvent<WorkerMessage>) => {
  people[kind].push(textContent)
}

const appendElement = (kind: PersonKind) => {
  if (people[kind].length > 0) {
    const fragment = document.createDocumentFragment()

    for (const person of people[kind]) {
      const li = document.createElement('li')
      li.textContent = person
      fragment.append(li)
    }

    people[kind] = []
    containers[kind].append(fragment)
  }
}

const resursiveAnimationFrame = () => {
  window.requestAnimationFrame(() => {
    appendElement('adult')
    appendElement('child')
    resursiveAnimationFrame()
  })
}

setTimeout(resursiveAnimationFrame, 1000)