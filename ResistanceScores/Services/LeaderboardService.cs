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

            var leaderboard = await query
                .Select(o => new LeaderboardDto
                {
                    PlayerId = o.Id,
                    Initials = o.Initials,
                    Wins = o.Games.AsQueryable()
                        .Where(timescaleClause)
                        .Where(teamClause)
                        .Where(noOfPlayersClause)
                        .Where(g => (g.WasResistance && g.Game.ResistanceWin) || (!g.WasResistance && !g.Game.ResistanceWin)).Count(),
                    TotalGames = o.Games.AsQueryable()
                        .Where(timescaleClause)
                        .Where(teamClause)
                        .Where(noOfPlayersClause)
                        .Count(),
                })
                .ToListAsync();

            return leaderboard;
        }
    }
}
