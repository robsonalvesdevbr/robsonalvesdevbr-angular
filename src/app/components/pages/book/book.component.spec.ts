import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BookComponent } from './book.component'
import { DataService } from '@path-services/data-service'
import { of } from 'rxjs'
import { CommonModule } from '@angular/common'
import { NgxPaginationModule } from 'ngx-pagination'
import { FilterPipe } from '@path-pipes/filter.pipe'
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe'
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe'
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe'
import { SortbyPipe } from '@path-pipes/sortby.pipe'
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'

describe('BookComponent', () => {
  let component: BookComponent
  let fixture: ComponentFixture<BookComponent>
  let dataServiceStub: Partial<DataService>

  beforeEach(async () => {
    dataServiceStub = {
      getBooks: () => [
        {
          title: 'Inteligência Artificial e ChatGPT 1',
          subtitle: 'Da revolução dos modelos de IA generativa à Engenharia de Prompt',
          author: ['Fabrício Carraro'],
          publishName: 'Publisher 1',
          publishYear: 2023,
          tags: ['Tag1', 'Tag2'],
          bookUrl: 'https://www.casadocodigo.com.br/pages/sumario-inteligencia-artificial-chatgpt',
          pages: 223,
          progress: 0,
          favorite: false,
        },
        {
          title: 'Inteligência Artificial e ChatGPT 2',
          subtitle: 'Da revolução dos modelos de IA generativa à Engenharia de Prompt',
          author: ['Fabrício Carraro'],
          publishName: 'Publisher 2',
          publishYear: 2023,
          tags: ['Tag3', 'Tag4'],
          bookUrl: 'https://www.casadocodigo.com.br/pages/sumario-inteligencia-artificial-chatgpt',
          pages: 223,
          progress: 0,
          favorite: false,
        },
      ],
    }

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FilterPipe,
        ImgcursoPipe,
        MessageDateConclusionPipe,
        PrintTagsPipe,
        NgxPaginationModule,
        GoogleAnalyticsDirective,
        SortbyPipe,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        BookComponent, // Moved from declarations to imports
      ],
      // Removed BookComponent from declarations
      providers: [{ provide: DataService, useValue: dataServiceStub }],
    }).compileComponents()

    fixture = TestBed.createComponent(BookComponent)
    component = fixture.componentInstance
    fixture.detectChanges() // Ensure ngOnInit is called
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize publishNameList and tags on init', () => {
    component.ngOnInit()
    expect(component.publishNameList().size).toBe(2)
    expect(component.tags().size).toBe(4)
  })

  it('should return sorted publish names', () => {
    component.ngOnInit()
    const sortedPublishNames = component.getPublishNameList()
    expect(sortedPublishNames).toEqual(['Publisher 1', 'Publisher 2'])
  })

  it('should return sorted tags', () => {
    component.ngOnInit()
    const sortedTags = component.getTags()
    expect(sortedTags).toEqual(['Tag1', 'Tag2', 'Tag3', 'Tag4'])
  })

  it('should calculate absolute index correctly', () => {
    component.config().currentPage = 2
    const index = component.absoluteIndex(2)
    expect(index).toBe(8)
  })

  it('should change page on onPageChange', () => {
    component.onPageChange(3)
    expect(component.config().currentPage).toBe(3)
  })

  it('should clear filters', () => {
    component.publishNameFilter().add('Publisher 1')
    component.tagsFilter().add('Tag1')
    component.clearFilters()
    expect(component.publishNameFilter().size).toBe(0)
    expect(component.selectInstitutionsFilter()).toBe('')
    expect(component.tagsFilter().size).toBe(0)
    expect(component.selectTagFilter()).toBe('')
  })

  it('should handle institution click event', () => {
    const event = { target: { id: 'input_book_institution_Publisher 1' } } as unknown as MouseEvent
    component.onClickIntitutionEvent(event)
    expect(component.publishNameFilter().has('Publisher 1')).toBeTrue()
    expect(component.selectInstitutionsFilter()).toBe('Publisher 1')
  })

  it('should handle tag click event', () => {
    const event = { target: { id: 'input_book_tag_Tag1' } } as unknown as MouseEvent
    component.onClickTagEvent(event)
    expect(component.tagsFilter().has('Tag1')).toBeTrue()
    expect(component.selectTagFilter()).toBe('Tag1')
  })

  it('should delete id from publishNameFilter on onClickIntitutionEvent', () => {
    const id = 'Test Publisher'
    component.publishNameFilter().add(id)

    const event = new MouseEvent('click')
    const inputElement = document.createElement('input')
    inputElement.id = `input_book_institution_${id}`
    Object.defineProperty(event, 'target', { value: inputElement })

    component.onClickIntitutionEvent(event)

    expect(component.publishNameFilter().has(id)).toBeFalse()
  })

  it('should delete id from tagsFilter on onClickTagEvent', () => {
    const id = 'Test Tag'
    component.tagsFilter().add(id)

    const event = new MouseEvent('click')
    const inputElement = document.createElement('input')
    inputElement.id = `input_book_tag_${id}`
    Object.defineProperty(event, 'target', { value: inputElement })

    component.onClickTagEvent(event)

    expect(component.tagsFilter().has(id)).toBeFalse()
  })

  it('should sort publishNameList correctly', () => {
    const testSet = new Set<string>(['Zebra', 'Apple', 'Mango'])
    component.publishNameList.set(testSet)
    const sortedList = component.getPublishNameList()
    expect(sortedList).toEqual(['Apple', 'Mango', 'Zebra'])
  })
})
