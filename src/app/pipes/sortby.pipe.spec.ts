import { SortbyPipe } from './sortby.pipe'

describe('SortbyPipe', () => {
  let pipe: SortbyPipe

  beforeEach(() => {
    pipe = new SortbyPipe()
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should sort array of objects in ascending order by specified field', () => {
    const data = [
      { name: 'Book C', year: 2022 },
      { name: 'Book A', year: 2020 },
      { name: 'Book B', year: 2021 },
    ]

    const result = pipe.transform(data, 'name', 'asc')
    expect(result).toEqual([
      { name: 'Book A', year: 2020 },
      { name: 'Book B', year: 2021 },
      { name: 'Book C', year: 2022 },
    ])
  })

  it('should sort array of objects in descending order by specified field', () => {
    const data = [
      { name: 'Book C', year: 2022 },
      { name: 'Book A', year: 2020 },
      { name: 'Book B', year: 2021 },
    ]

    const result = pipe.transform(data, 'name', 'desc')
    expect(result).toEqual([
      { name: 'Book C', year: 2022 },
      { name: 'Book B', year: 2021 },
      { name: 'Book A', year: 2020 },
    ])
  })

  it('should sort array in ascending order when no field is specified', () => {
    const data = [3, 1, 2]

    const result = pipe.transform(data, undefined, 'asc')
    expect(result).toEqual([1, 2, 3])
  })

  it('should sort array in descending order when no field is specified', () => {
    const data = [3, 1, 2]

    const result = pipe.transform(data, undefined, 'desc')
    expect(result).toEqual([3, 2, 1])
  })

  it('should return original array if input is not an array', () => {
    const data = 'not-an-array'

    const result = pipe.transform(data as any)
    expect(result).toBe(data)
  })

  it('should handle array with mixed field values correctly', () => {
    const data = [
      { name: 'Book C', year: 2022 },
      { name: null, year: 2020 },
      { name: 'Book A', year: 2021 },
    ]

    const result = pipe.transform(data, 'name', 'asc')
    expect(result).toEqual([
      { name: 'Book C', year: 2022 },
      { name: null, year: 2020 },
      { name: 'Book A', year: 2021 },
    ])
  })

  it('should not modify the original array', () => {
    const data = [
      { name: 'Book C', year: 2022 },
      { name: 'Book A', year: 2020 },
      { name: 'Book B', year: 2021 },
    ]

    const result = pipe.transform([...data], 'name', 'asc')
    expect(data).toEqual([
      { name: 'Book C', year: 2022 },
      { name: 'Book A', year: 2020 },
      { name: 'Book B', year: 2021 },
    ])
  })
})
