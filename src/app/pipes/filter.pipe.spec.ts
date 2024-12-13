import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter array of objects by string field', () => {
    const data = [
      { name: 'Book A', category: 'Fiction' },
      { name: 'Book B', category: 'Science' },
      { name: 'Book C', category: 'Fiction' },
    ];

    const result = pipe.transform(data, 'string', 'category', 'fiction');
    expect(result.length).toBe(2);
    expect(result).toEqual([
      { name: 'Book A', category: 'Fiction' },
      { name: 'Book C', category: 'Fiction' },
    ]);
  });

  it('should filter array of objects by array field', () => {
    const data = [
      { name: 'Book A', tags: ['Fantasy', 'Adventure'] },
      { name: 'Book B', tags: ['Science', 'Education'] },
      { name: 'Book C', tags: ['Fiction', 'Drama'] },
    ];

    const result = pipe.transform(data, 'array', 'tags', 'science,education');
    expect(result.length).toBe(1);
    expect(result).toEqual([
      { name: 'Book B', tags: ['Science', 'Education'] },
    ]);
  });

  it('should return the original array if filter is empty', () => {
    const data = [
      { name: 'Book A', category: 'Fiction' },
      { name: 'Book B', category: 'Science' },
    ];

    const result = pipe.transform(data, 'string', 'category', '');
    expect(result.length).toBe(2);
    expect(result).toEqual(data);
  });

  it('should be case insensitive in filtering', () => {
    const data = [
      { name: 'Book A', category: 'Fiction' },
      { name: 'Book B', category: 'Science' },
      { name: 'Book C', category: 'fiction' },
    ];

    const result = pipe.transform(data, 'string', 'category', 'FICTION');
    expect(result.length).toBe(2);
    expect(result).toEqual([
      { name: 'Book A', category: 'Fiction' },
      { name: 'Book C', category: 'fiction' },
    ]);
  });

  it('should handle multiple comma-separated filter terms', () => {
    const data = [
      { name: 'Book A', category: 'Science' },
      { name: 'Book B', category: 'Fiction' },
      { name: 'Book C', category: 'Adventure' },
    ];

    const result = pipe.transform(
      data,
      'string',
      'category',
      'fiction,adventure',
    );
    expect(result.length).toBe(2);
    expect(result).toEqual([
      { name: 'Book B', category: 'Fiction' },
      { name: 'Book C', category: 'Adventure' },
    ]);
  });
});
