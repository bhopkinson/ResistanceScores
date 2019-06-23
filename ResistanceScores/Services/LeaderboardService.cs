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
            switch (queryOptions.Timescale)
            {
                case Enums.Timescale.Last30Days:
                    timescaleClause = g => DateTime.Now < g.Game.Date.AddDays(30);
                    break;
                case Enums.Timescale.Last7Days:
                    timescaleClause = g => DateTime.Now < g.Game.Date.AddDays(7);
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

        public async Task<GameListDto> GetDaySummary()
        {
            var games = await _appDbContext
            .Games
            .Include(x => x.Players)
            .ThenInclude(x => x.Player)
            .Where(x => x.Date.AddDays(1) > DateTime.Now)
            .Select(g => new GameSummaryDto
            {
                Players = g.Players.Select(p => new PlayerWinDto
                {
                    Player = p.Player.Initials,
                    Win = (p.WasResistance && g.ResistanceWin) || (!p.WasResistance && !g.ResistanceWin)
                }).ToList()
            })
            .ToListAsync();

            var players = games.SelectMany(x => x.Players).Select(x => x.Player).Distinct().ToList();

            return new GameListDto
            {
                Players = players,
                Games = games
            };
        }
    }
}
