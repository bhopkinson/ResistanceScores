using ResistanceScores.Models;
using ResistanceScores.Models.api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Services
{
    public interface ILeaderboardService
    {
        Task<List<LeaderboardDto>> GetLeaderboard(QueryOptions queryOptions);
        Task<List<GameOverviewDto>> GetGameLeaderboard(); // TODO: Refactor this
        Task<GameListDto> GetDaySummary(int daysAgo); // TODO: Refactor this
        //Task<List<StreakDto>> GetStreaks(); // TODO: Refactor this
    }
}
