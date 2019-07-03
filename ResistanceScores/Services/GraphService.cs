using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ResistanceScores.Models;
using ResistanceScores.Models.api;

namespace ResistanceScores.Services
{
    public class GraphService : IGraphService
    {
        public AppDbContext _appDbContext;

        public GraphService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        public async Task<GraphDto> GetGraph()
        {
            var gamePlayers = _appDbContext.GamePlayers
                .Include(gp => gp.Game)
                .Include(gp => gp.Player)
                .OrderBy(gp => gp.GameId);

            var gamePlayerWins = await gamePlayers
                .Where(o => o.PlayerId == 2)
                .Select(o => new GamePlayerWinDto
                {
                    GameId = o.GameId,
                    PlayerId = o.PlayerId,
                    Win = (o.WasResistance && o.Game.ResistanceWin) || (!o.WasResistance && !o.Game.ResistanceWin)
                }).ToListAsync();

            var firstGameId = gamePlayerWins.Select(o => o.GameId).Min();
            var lastGameId = gamePlayerWins.Select(o => o.GameId).Max();
            var allPlayerWins = gamePlayerWins.GroupBy(o => o.PlayerId, o => new { o.GameId, o.Win });

            var graphPlayers = new List<GraphPlayerDto>();

            foreach (var singlePlayerWins in allPlayerWins)
            {
                var playerId = singlePlayerWins.Key;
                var graphPoints = new List<GraphPointDto>();
                var wins = 0;
                var totalGames = 0;
                foreach (var game in singlePlayerWins)
                {
                    if (game.Win)
                    {
                        wins++;
                    }
                    totalGames++;
                    graphPoints.Add(new GraphPointDto
                    {
                        Wins = wins,
                        TotalGames = totalGames,
                        GameId = game.GameId
                    });
                }
                graphPlayers.Add(new GraphPlayerDto
                {
                    PlayerId = playerId,
                    GraphPoints = graphPoints
                });
            };

            var graphDto = new GraphDto
            {
                GraphPlayers = graphPlayers,
                FirstGameId = firstGameId,
                LastGameId = lastGameId

            };

            return graphDto;
        }
    }
}
