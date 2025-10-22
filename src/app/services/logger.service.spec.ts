import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  let consoleSpy: {
    log: jasmine.Spy;
    warn: jasmine.Spy;
    error: jasmine.Spy;
    debug: jasmine.Spy;
    group: jasmine.Spy;
    groupEnd: jasmine.Spy;
    table: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(LoggerService);

    consoleSpy = {
      log: spyOn(console, 'log'),
      warn: spyOn(console, 'warn'),
      error: spyOn(console, 'error'),
      debug: spyOn(console, 'debug'),
      group: spyOn(console, 'group'),
      groupEnd: spyOn(console, 'groupEnd'),
      table: spyOn(console, 'table'),
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call console.log in development mode', () => {
    service.log('test message', 'param1', 'param2');
    expect(consoleSpy.log).toHaveBeenCalledWith('test message', 'param1', 'param2');
  });

  it('should call console.warn in development mode', () => {
    service.warn('warning message', 'param1');
    expect(consoleSpy.warn).toHaveBeenCalledWith('warning message', 'param1');
  });

  it('should call console.error in development mode', () => {
    service.error('error message', 'param1');
    expect(consoleSpy.error).toHaveBeenCalledWith('error message', 'param1');
  });

  it('should call console.debug in development mode', () => {
    service.debug('debug message');
    expect(consoleSpy.debug).toHaveBeenCalledWith('debug message');
  });

  it('should call console.group in development mode', () => {
    service.group('group label');
    expect(consoleSpy.group).toHaveBeenCalledWith('group label');
  });

  it('should call console.groupEnd in development mode', () => {
    service.groupEnd();
    expect(consoleSpy.groupEnd).toHaveBeenCalled();
  });

  it('should call console.table in development mode', () => {
    const data = [{ name: 'test', value: 123 }];
    service.table(data);
    expect(consoleSpy.table).toHaveBeenCalledWith(data);
  });
});
