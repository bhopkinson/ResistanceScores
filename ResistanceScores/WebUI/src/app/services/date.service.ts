import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private MILLISECONDS_IN_A_DAY = 86_400_000;
  private DAYS_IN_A_WEEK = 7;

  /**
   * Returns the dates's day value in days since January 1, 1970 UTC
   */
  public getRelativeDay(date: Date): number {
    const millisecondsSinceEpochDate = date.valueOf();
    const daysSinceEpochDate = Math.floor(millisecondsSinceEpochDate / this.MILLISECONDS_IN_A_DAY);
    return daysSinceEpochDate;
  }

  /**
   * Returns the date corresponding to the given number of days since January 1, 1970 UTC
   */
  public getDateFromRelativeDay(relativeDay: number): Date {
    const daysSinceEpochDate = relativeDay;
    const millisecondsSinceEpochDate = daysSinceEpochDate * this.MILLISECONDS_IN_A_DAY;
    return new Date(millisecondsSinceEpochDate);
  }

  public get today(): Date {
    return new Date();
  }

  public get oneWeekAgoToday(): Date {
    const date = this.today;
    date.setDate(date.getDate() - this.DAYS_IN_A_WEEK);
    return date;
  }
}
