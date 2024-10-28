import { FilterPipe } from './filter.pipe'
import { ICourse } from '@path-interfaces/ICourse'

const Courses: ICourse[] = [
  {
    name: 'GitHub Copilot: Formação Básica',
    institution: 'Linkedin Learning',
    certificateUrl: 'https://www.linkedin.com/learning/certificates/86c236d05e24c26443322a5d07c3026de9e74e8c9a13ae51d9266105b1ddc291?trk=share_certificate',
    tags: ['artificial-intelligence', 'github', 'copilot'],
    conclusion: new Date('2024-8-22'),
    favorite: true,
  },
  {
    name: 'Comunicação Assertiva para Gestores de Alto Desempenho',
    institution: 'Linkedin Learning',
    certificateUrl: 'https://www.linkedin.com/learning/certificates/f1cd3d0f28df30ef793720cf64234c5f249822e19e68e8f3fb3f9bd12d56ab7c?trk=share_certificate',
    tags: ['communication', 'leadership'],
    conclusion: new Date('2024-8-30'),
    favorite: true,
  },
]

describe('FilterPipe', () => {
  let pipe: FilterPipe

  beforeEach(() => {
    pipe = new FilterPipe()
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should filter array of strings', () => {
    const result = pipe.transform(Courses, 'array', 'tags', 'leadership')
    expect(result[0].tags).toEqual(['communication', 'leadership'])
  })

  it('should filter array of arrays', () => {
    const result = pipe.transform(Courses, 'array', 'tags', 'copilot')
    expect(result[0].tags).toEqual(['artificial-intelligence', 'github', 'copilot'])
  })
})
