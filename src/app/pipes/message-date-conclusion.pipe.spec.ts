import { MessageDateConclusionPipe } from './message-date-conclusion.pipe'

describe('MessageDateConclusionPipe', () => {
  let pipe: MessageDateConclusionPipe

  beforeEach(() => {
    pipe = new MessageDateConclusionPipe()
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should return "Concluído" when conclusionStatus is "completed"', () => {
    expect(pipe.transform('completed')).toBe('Concluído')
  })

  it('should return "Trancado" when conclusionStatus is "locked"', () => {
    expect(pipe.transform('locked')).toBe('Trancado')
  })

  it('should return "Em andamento" when conclusionStatus is "inprogress"', () => {
    expect(pipe.transform('inprogress')).toBe('Em andamento')
  })

  it('should return "Estado desconhecido" when conclusionStatus is not "completed", "locked" or "inprogress"', () => {
    expect(pipe.transform('unknown' as any)).toBe('Estado desconhecido')
  })

  it('should return "Estado desconhecido" when conclusionStatus is undefined', () => {
    expect(pipe.transform(undefined as any)).toBe('Estado desconhecido')
  })
})
