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

        public async Task<List<GraphPlayerDto>> GetGraph()
        {
            var gamePlayers = _appDbContext.GamePlayers
                .Include(gp => gp.Game)
                .Include(gp => gp.Player);

            var playerDateWinList = await gamePlayers
                .Select(o => new
                {
                    Player = o.PlayerId,
                    o.Game.Date.Date,
                    Win = o.WasResistance == o.Game.ResistanceWin,
                })
                .ToListAsync();

            var playerDateTotalList = playerDateWinList
                .GroupBy(
                    o => new { o.Player, o.Date },
                    o => o.Win,
                    (playerDate, wins) => new
                    {
                        playerDate.Player,
                        playerDate.Date,
                        WinsThatDay = wins.Count(w => w),
                        GamesThatDay = wins.Count()
                    })
                .OrderBy(o => o.Date);

            var players = playerDateTotalList
                .GroupBy(
                    o => o.Player,
                    o => new { o.Date, o.WinsThatDay, o.GamesThatDay });

            var graphPlayers = new List<GraphPlayerDto>();

            foreach (var player in players)
            {
                var runningWinCount = 0;
                var runningGameCount = 0;
                var graphPlayer = new GraphPlayerDto
                {
                    PlayerId = player.Key,
                    GraphPoints = player.Select(o =>
                    {
                        runningWinCount += o.WinsThatDay;
                        runningGameCount += o.GamesThatDay;
                        return new GraphPointDto
                        {
                            Date = o.Date,
                            Wins = runningWinCount,
                            TotalGames = runningGameCount
                        };
                    }).ToList()
                };

                graphPlayers.Add(graphPlayer);
            }

            return graphPlayers;
        }

        //private Hello GroupByDate(List<GamePlayerWinDto> gamePlayerWins) {
        //    return gamePlayerWins.Select(gpw => new Hello {
                
        //    })
        //}

        private class Hello
        {
            public int Wins { get; set; } 
            public int TotalGames { get; set; }
            public int Date { get; set; }
        }
    }
}
