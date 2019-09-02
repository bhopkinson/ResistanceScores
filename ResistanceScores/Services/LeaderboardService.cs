using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ResistanceScores.Models;
using ResistanceScores.Models.api;

namespace ResistanceScores.Services
{
    public class LeaderboardService : ILeaderboardService
    {
        public AppDbContext _appDbContext;

        public LeaderboardService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        public async Task<List<LeaderboardDto>> GetLeaderboard(QueryOptions queryOptions)
        {
            var query = _appDbContext
                .Players
                .Include(x => x.Games)
                .ThenInclude(x => x.Game);

            Expression<Func<GamePlayer, bool>> teamClause;
            switch (queryOptions.Team)
            {
                case Enums.Team.Resistance:
                    teamClause = g => g.WasResistance;
                    break;
                case Enums.Team.Spy:
                    teamClause = g => !g.WasResistance;
                    break;
                default:
                    teamClause = g => true;
                    break;
            }
            Expression<Func<GamePlayer, bool>> timescaleClause;
            var thisMonday = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek + (int)DayOfWeek.Monday);
            switch (queryOptions.Timescale)
            {
                case Enums.Timescale.Last30Days:
                    timescaleClause = g => DateTime.Now.Month == g.Game.Date.Month && DateTime.Now.Year == g.Game.Date.Year;
                    break;
                case Enums.Timescale.Last7Days:
                    timescaleClause = g => thisMonday <= g.Game.Date;
                    break;
                default:
                    timescaleClause = g => true;
                    break;
            }

            Expression<Func<GamePlayer, bool>> noOfPlayersClause;
            if (queryOptions.NoOfPlayers > 4) // 4 is the "All team sizes" option
            {
                noOfPlayersClause = g => g.Game.Players.Count == queryOptions.NoOfPlayers;
            }
            else
            {
                noOfPlayersClause = g => true;
            }

            Expression<Func<GamePlayer, bool>> asOfWhenClause;
            asOfWhenClause = g => g.Game.Date.AddDays(queryOptions.AsOfWhen) < DateTime.Now;

            var leaderboard = await query
                .Select(o => new LeaderboardDto
                {
                    PlayerId = o.Id,
                    Initials = o.Initials,
                    Wins = o.Games.AsQueryable()
                        .Where(timescaleClause)
                        .Where(teamClause)
                        .Where(noOfPlayersClause)
                        .Where(asOfWhenClause)
                        .Where(g => (g.WasResistance && g.Game.ResistanceWin) || (!g.WasResistance && !g.Game.ResistanceWin)).Count(),
                    TotalGames = o.Games.AsQueryable()
                        .Where(timescaleClause)
                        .Where(teamClause)
                        .Where(noOfPlayersClause)
                        .Where(asOfWhenClause)
                        .Count(),
                })
                .ToListAsync();

            return leaderboard;
        }

        public async Task<List<GameOverviewDto>> GetGameLeaderboard()
        {
            var query = await _appDbContext
                .Games
                .Include(x => x.Players)
                .ToListAsync();

            var allPlayers = new GameOverviewDto
            {
                TotalGames = query.Count,
                ResistanceWins = query.Where(g => g.ResistanceWin).Count()
            };
            var fivePlayers = new GameOverviewDto
            {
                TotalGames = query.Where(g => g.Players.Count == 5).Count(),
                ResistanceWins = query.Where(g => g.Players.Count == 5).Where(g => g.ResistanceWin).Count()
            };
            var sixPlayers = new GameOverviewDto
            {
                TotalGames = query.Where(g => g.Players.Count == 6).Count(),
                ResistanceWins = query.Where(g => g.Players.Count == 6).Where(g => g.ResistanceWin).Count()
            };
            var sevenPlayers = new GameOverviewDto
            {
                TotalGames = query.Where(g => g.Players.Count == 7).Count(),
                ResistanceWins = query.Where(g => g.Players.Count == 7).Where(g => g.ResistanceWin).Count()
            };
            var eightPlayers = new GameOverviewDto
            {
                TotalGames = query.Where(g => g.Players.Count == 8).Count(),
                ResistanceWins = query.Where(g => g.Players.Count == 8).Where(g => g.ResistanceWin).Count()
            };
            var ninePlayers = new GameOverviewDto
            {
                TotalGames = query.Where(g => g.Players.Count == 9).Count(),
                ResistanceWins = query.Where(g => g.Players.Count == 9).Where(g => g.ResistanceWin).Count()
            };
            var tenPlayers = new GameOverviewDto
            {
                TotalGames = query.Where(g => g.Players.Count == 10).Count(),
                ResistanceWins = query.Where(g => g.Players.Count == 10).Where(g => g.ResistanceWin).Count()
            };
            var elevenPlayers = new GameOverviewDto
            {
                TotalGames = query.Where(g => g.Players.Count == 11).Count(),
                ResistanceWins = query.Where(g => g.Players.Count == 11).Where(g => g.ResistanceWin).Count()
            };

            return new List<GameOverviewDto>
            {
                allPlayers,fivePlayers,sixPlayers,sevenPlayers,eightPlayers,ninePlayers,tenPlayers,elevenPlayers
            };
        }

        public async Task<GameListDto> GetDaySummary(int daysAgo)
        {
            var games = await _appDbContext
            .Games
            .Include(x => x.Players)
            .ThenInclude(x => x.Player)
            .Where(x => x.Date.AddDays(daysAgo + 1) > DateTime.Now)
            .Where(x => x.Date.AddDays(daysAgo) <= DateTime.Now)
            .Select(g => new GameSummaryDto
            {
                Players = g.Players.Select(p => new PlayerWinDto
                {
                    Player = p.Player.Initials,
                    Win = (p.WasResistance && g.ResistanceWin) || (!p.WasResistance && !g.ResistanceWin)
                }).ToList(),
                Id = g.Id
            })
            .ToListAsync();

            var players = games.SelectMany(x => x.Players).Select(x => x.Player).Distinct().ToList();

            return new GameListDto
            {
                Players = players,
                Games = games
            };
        }

        public async Task<GameListDto> GetWinHistory()
        {
            var games = await _appDbContext
                .Games
                .Include(x => x.Players)
                .ThenInclude(x => x.Player)
                .Select(g => new GameSummaryDto
                {
                    Players = g.Players.Select(p => new PlayerWinDto
                    {
                        Player = p.Player.Initials,
                        Win = (p.WasResistance && g.ResistanceWin) || (!p.WasResistance && !g.ResistanceWin)
                    }).ToList(),
                    Id = g.Id
                })
                .ToListAsync();

            var players = games.SelectMany(x => x.Players).Select(x => x.Player).Distinct().ToList();

            return new GameListDto
            {
                Players = players,
                Games = games
            };
        }

        public async Task<List<StreakDto>> GetStreaks()
        {
            var gamePlayers = _appDbContext.GamePlayers
                            .Include(gp => gp.Game)
                            .Include(gp => gp.Player);

            var playerDateWinList = await gamePlayers
                .Select(o => new
                {
                    Player = o.PlayerId,
                    o.GameId,
                    Win = o.WasResistance == o.Game.ResistanceWin,
                })
                .ToListAsync();

            var playersWinHistories = playerDateWinList
                .GroupBy(
                    o => o.Player,
                    o => new WinHistoryItem { Win = o.Win, GameId = o.GameId });

            var streakDtos = new List<StreakDto>();

            foreach (var playerWinHistory in playersWinHistories)
            {
                var playerId = playerWinHistory.Key;

                var winHistory = playerWinHistory.ToList();
                var streakHistory = TransformWinHistoryToStreakHistory(winHistory);

                var winStreaks = streakHistory.Where(s => s.IsAWinStreak).Select(s => s.Streak);
                var lossStreaks = streakHistory.Where(s => !s.IsAWinStreak).Select(s => s.Streak);
                var currentStreak = streakHistory.Last();

                var streakDto = new StreakDto
                {
                    PlayerId = playerId,
                    MaxWins = winStreaks.Max(),
                    MaxLosses = lossStreaks.Max(),
                    Current = currentStreak.Streak,
                    CurrentWinOrLoss = currentStreak.IsAWinStreak,
                };

                streakDtos.Add(streakDto);
            }
            return streakDtos
                .OrderByDescending(p => (p.CurrentWinOrLoss ? +1 : -1) * p.Current)
                .ToList();
        }

        private List<StreakHistoryItem> TransformWinHistoryToStreakHistory(List<WinHistoryItem> winHistory)
        {
            var streakHistory = new List<StreakHistoryItem>();
            var currentStreak = 0;
            var wasLastGameAWin = default(bool);
            var isFirstGame = true;

            foreach (var game in winHistory)
            {
                var wasAWin = game.Win;
                var doesContinueStreak = wasAWin == wasLastGameAWin && !isFirstGame;

                currentStreak = doesContinueStreak
                    ? currentStreak + 1
                    : 1;

                streakHistory.Add(new StreakHistoryItem
                {
                    GameId = game.GameId,
                    Streak = currentStreak,
                    IsAWinStreak = wasAWin
                });

                isFirstGame = false;
                wasLastGameAWin = wasAWin;
            }

            return streakHistory;
        }

        public class WinHistoryItem
        {
            public int GameId { get; set; }
            public bool Win { get; set; }
        }

        private class StreakHistoryItem
        {
            public int GameId { get; set; }
            public int Streak { get; set; }
            public bool IsAWinStreak { get; set; }
        }
    }
}
