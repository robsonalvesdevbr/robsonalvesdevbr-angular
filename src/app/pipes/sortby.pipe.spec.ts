import { SortbyPipe } from './sortby.pipe'

describe('SortbyPipe', () => {
  let pipe: SortbyPipe

  beforeEach(() => {
    pipe = new SortbyPipe()
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should sort array of objects by field in ascending order', () => {
    const data = [{ name: 'banana' }, { name: 'apple' }]
    const result = pipe.transform(data, 'name', 'asc')
    expect(result).toEqual([{ name: 'apple' }, { name: 'banana' }])
  })

  it('should sort array of objects by field in descending order', () => {
    const data = [{ name: 'banana' }, { name: 'apple' }]
    const result = pipe.transform(data, 'name', 'desc')
    expect(result).toEqual([{ name: 'banana' }, { name: 'apple' }])
  })
})
