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

            var leaderboard = await query
                .Select(o => new LeaderboardDto
                {
                    PlayerId = o.Id,
                    Initials = o.Initials,
                    Wins = o.Games.AsQueryable().Where(teamClause).Where(g => (g.WasResistance && g.Game.ResistanceWin) || (!g.WasResistance && !g.Game.ResistanceWin)).Count(),
                    TotalGames = o.Games.AsQueryable().Where(teamClause).Count(),
                })
                .ToListAsync();

            return leaderboard;
        }
    }
}
