import { Injectable } from '@angular/core';
import { arraySum, isNullOrUndefined } from '../shared/functions';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private DAYS_IN_JANUARY = 31;
  private DAYS_IN_FEBRUARY_NON_LEAP = 28;
  private DAYS_IN_FEBRUARY_LEAP = 29;
  private DAYS_IN_MARCH = 31;
  private DAYS_IN_APRIL = 30;
  private DAYS_IN_MAY = 31;
  private DAYS_IN_JUNE = 30;
  private DAYS_IN_JULY = 31;
  private DAYS_IN_AUGUST = 31;
  private DAYS_IN_SEPTEMPER = 30;
  private DAYS_IN_OCTOBER = 31;
  private DAYS_IN_NOVEMEBER = 30;
  private DAYS_IN_DECEMBER = 31;

  private DAYS_IN_NON_LEAP_YEAR = 365;
  private DAYS_IN_LEAP_YEAR = 366;

  private BASE_YEAR = 2019;

  private isLeapYear(year: number): boolean {
    // According to timeanddate.com/date/leapyear.html, a year is a leap year when
    // The year can be evenly divided by 4;
    // If the year can be evenly divided by 100, it is NOT a leap year, unless;
    // The year is also evenly divisible by 400. Then it is a leap year.
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }

  private get dayCountsOfAllNonLeapMonths(): number[] {
    return [
      this.DAYS_IN_JANUARY,
      this.DAYS_IN_FEBRUARY_NON_LEAP,
      this.DAYS_IN_MARCH,
      this.DAYS_IN_APRIL,
      this.DAYS_IN_MAY,
      this.DAYS_IN_JUNE,
      this.DAYS_IN_JULY,
      this.DAYS_IN_AUGUST,
      this.DAYS_IN_SEPTEMPER,
      this.DAYS_IN_OCTOBER,
      this.DAYS_IN_NOVEMEBER,
      this.DAYS_IN_DECEMBER,
    ]
  }

  private get dayCountsOfAllLeapMonths(): number[] {
    return [
      this.DAYS_IN_JANUARY,
      this.DAYS_IN_FEBRUARY_LEAP,
      this.DAYS_IN_MARCH,
      this.DAYS_IN_APRIL,
      this.DAYS_IN_MAY,
      this.DAYS_IN_JUNE,
      this.DAYS_IN_JULY,
      this.DAYS_IN_AUGUST,
      this.DAYS_IN_SEPTEMPER,
      this.DAYS_IN_OCTOBER,
      this.DAYS_IN_NOVEMEBER,
      this.DAYS_IN_DECEMBER,
    ]
  }

  private getDayCountsOfAllMonths(date: Date): number[] {
    const year = !isNullOrUndefined(date) ? date.getFullYear() : 0;
    return this.isLeapYear(year)
      ? this.dayCountsOfAllLeapMonths
      : this.dayCountsOfAllNonLeapMonths;
}

  private getDayCountsOfPreviousMonths(date: Date): number[] {
    const month = date.getMonth();

    return this.getDayCountsOfAllMonths(date).slice(0, month)
  }

  private getDayOfYear(date: Date): number {
    const previousMonths = this.getDayCountsOfPreviousMonths(date);
    const totalDaysOfPreviousMonths = arraySum(previousMonths);
    const totalDaysThisMonth = date.getDate();

    return totalDaysOfPreviousMonths + totalDaysThisMonth;
  }

  private getDayCountsOfPreviousYears(date: Date): number[] {
    const currentYear = date.getFullYear();
    const allDayCounts = [];
    let dayCount;

    for (let year = this.BASE_YEAR; year < currentYear; year++) {
      dayCount = this.isLeapYear(year)
        ? this.DAYS_IN_LEAP_YEAR
        : this.DAYS_IN_NON_LEAP_YEAR;
      allDayCounts.push(dayCount);
    }

    return allDayCounts;
  }

  /**
   * Count how many days since Jan 1st 2019
   */
  public getRelativeDay(date: Date): number {
    const previousYears = this.getDayCountsOfPreviousYears(date);
    const totalDaysOfPreviousYears = arraySum(previousYears);
    const totalDaysThisYear = this.getDayOfYear(date);

    return totalDaysOfPreviousYears + totalDaysThisYear;
  }
}
