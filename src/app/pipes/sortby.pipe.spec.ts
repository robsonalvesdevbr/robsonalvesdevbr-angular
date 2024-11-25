import { SortbyPipe } from './sortby.pipe'

describe('SortbyPipe', () => {
  let pipe: SortbyPipe

  beforeEach(() => {
    pipe = new SortbyPipe()
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should sort array of strings in ascending order', () => {
    const array = ['banana', 'apple', 'orange']
    const result = pipe.transform(array, undefined, 'asc')

    expect(result).toEqual(['apple', 'banana', 'orange'])
  })

  it('should sort array of strings in descending order', () => {
    const array = ['banana', 'apple', 'orange']
    const result = pipe.transform(array, undefined, 'desc')

    expect(result).toEqual(['orange', 'banana', 'apple'])
  })

  it('should sort array of objects in ascending order', () => {
    const array = [
      { name: 'banana' },
      { name: 'apple' },
      { name: 'orange' },
    ]
    const result = pipe.transform(array, 'name', 'asc')

    expect(result).toEqual([
      { name: 'apple' },
      { name: 'banana' },
      { name: 'orange' },
    ])
  })

  it('should sort array of objects in descending order', () => {
    const array = [
      { name: 'banana' },
      { name: 'apple' },
      { name: 'orange' },
    ]
    const result = pipe.transform(array, 'name', 'desc')

    expect(result).toEqual([
      { name: 'orange' },
      { name: 'banana' },
      { name: 'apple' },
    ])
  })

})
