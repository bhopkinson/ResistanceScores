import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service).toBeTruthy();
  });

  describe('getRelativeDay', () => {
    it('should return correct value for April 4th 2019', () => {
      // Arrange
      const service: DateService = TestBed.get(DateService);
      const date = new Date(2019,3,4);
      const expectedResult = (31 + 28 + 31) + 4;

      // Act
      const result = service.getRelativeDay(date);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return correct value for December 31st 2021', () => {
      // Arrange
      const service: DateService = TestBed.get(DateService);
      const date = new Date(2021, 11, 31);
      const expectedResult = (365 + 366) + (31+28+31+30+31+30+31+31+30+31+30) + 31;

      // Act
      const result = service.getRelativeDay(date);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

});
