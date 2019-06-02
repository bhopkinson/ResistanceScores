import { Component, OnInit } from '@angular/core';
import { LeaderboardDto, LeaderboardClient, Team, Timescale, GameOverviewDto } from '../../../services/web-api.service.generated';
import { take, timeInterval } from 'rxjs/operators';
import { Constants } from '../../../constants';

@Component({
  selector: 'app-all-time-leaderboard',
  templateUrl: './all-time-leaderboard.component.html',
  styleUrls: ['./all-time-leaderboard.component.scss']
})
export class AllTimeLeaderboardComponent implements OnInit {

  constructor(private _leaderboardClient: LeaderboardClient) { }

  public leaderboard: LeaderboardDto[] = [];
  public gameOverview: GameOverviewDto[] = [];
  public isLoading = true;
  public errorOccurred = false;
  public teamFilter = Team.None;
  public timescaleFilter = Timescale.AllTime;
  public noOfPlayersFilter = 4;
  public asOfWhenFilter = 0;
  public Team = Team;
  public Timescale = Timescale;

  ngOnInit() {
    this._leaderboardClient
      .getLeaderboard(Team.None, Timescale.AllTime, 4, 0)
      .pipe(take(1))
      .subscribe(
        leaderboard => { this.leaderboard = leaderboard.sort(this.sortByPercentageFn); this.isLoading = false; },
        error => { this.errorOccurred = true; }
    )

    this._leaderboardClient
      .getGameLeaderboard()
      .pipe(take(1))
      .subscribe(
        overview => { this.gameOverview = overview;},
        error => { this.errorOccurred = true; }
      )
  }

  losses(player: LeaderboardDto): number {
    return player.totalGames - player.wins;
  }

  percentage(player: LeaderboardDto): number {
    return player.totalGames > 0
      ? 100 * player.wins / player.totalGames
      : 0;
  }

  gamesLosses(game: GameOverviewDto): number {
    return game.totalGames - game.resistanceWins;
  }

  gamesPercentage(game: GameOverviewDto): number {
    return game.totalGames > 0
      ? 100 * game.resistanceWins / game.totalGames
      : 0;
  }

  gameChanceOfWinning(game: GameOverviewDto, teamSize: number) {
    const chanceOfAResistanceWin = this.gamesPercentage(game);
    const chanceOfBeingResistance = (teamSize - Constants.noOfSpies(teamSize)) / teamSize;
    const chanceOfWinningAsResistance = chanceOfAResistanceWin * chanceOfBeingResistance;

    const chanceOfASpyWin = game.totalGames > 0 ? 100 - this.gamesPercentage(game) : 0;
    const chanceOfBeingSpy = Constants.noOfSpies(teamSize) / teamSize;
    const chanceOfWinningAsSpy = chanceOfASpyWin * chanceOfBeingSpy;

    return chanceOfWinningAsResistance + chanceOfWinningAsSpy;
  }

  updateTeamFilter(team: Team): void {
    if (team === this.teamFilter) {
      return;
    }

    this.reload(team, this.timescaleFilter, this.noOfPlayersFilter, this.asOfWhenFilter);
  }

  updateTimescaleFilter(timescale: Timescale): void {
    if (timescale === this.timescaleFilter) {
      return;
    }

    this.reload(this.teamFilter, timescale, this.noOfPlayersFilter, this.asOfWhenFilter);
  }

  updateNoOfPlayersFilter(noOfPlayers: number): void {
    if (noOfPlayers === this.noOfPlayersFilter) {
      return;
    }

    this.reload(this.teamFilter, this.timescaleFilter, noOfPlayers, this.asOfWhenFilter);
  }

  updateAsOfWhenFilter(asOfWhen: number): void {
    if (asOfWhen === this.asOfWhenFilter) {
      return;
    }

    this.reload(this.teamFilter, this.timescaleFilter, this.noOfPlayersFilter, asOfWhen);
  }

  private sortByPercentageFn = (a: LeaderboardDto, b: LeaderboardDto) => { return this.percentage(b) - this.percentage(a); }

  private reload(team: Team, timescale: Timescale, noOfPlayers: number, asOfWhen: number): void {
    this._leaderboardClient
      .getLeaderboard(team, timescale, noOfPlayers, asOfWhen)
      .pipe(take(1))
      .subscribe(
      leaderboard => {
        this.leaderboard = leaderboard.sort(this.sortByPercentageFn);
        this.teamFilter = team;
        this.timescaleFilter = timescale;
        this.noOfPlayersFilter = noOfPlayers;
        this.asOfWhenFilter = asOfWhen;
      },
        error => { this.errorOccurred = true; }
      )
  }

}
