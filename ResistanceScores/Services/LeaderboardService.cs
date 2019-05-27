using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<List<LeaderboardDto>> GetLeaderboard()
        {
            var leaderboard = await _appDbContext
                .Players
                .Include(x => x.Games)
                .ThenInclude(x => x.Game)
                .Select(o => new LeaderboardDto
                {
                    PlayerId = o.Id,
                    Initials = o.Initials,
                    Wins = o.Games.Where(g => (g.WasResistance && g.Game.ResistanceWin) || (!g.WasResistance && !g.Game.ResistanceWin)).Count(),
                    TotalGames = o.Games.Count,
                })
                .ToListAsync();

            return leaderboard;
        }
    }
}
