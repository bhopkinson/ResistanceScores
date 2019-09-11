using Microsoft.EntityFrameworkCore;
using ResistanceScores.Models;
using ResistanceScores.Models.api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Services
{
    public class PairingService : IPairingService
    {
        public AppDbContext _appDbContext;

        public PairingService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        public async Task<List<PairingSummaryDto>> GetSummary()
        {
            var players = await _appDbContext.Players.Where(p => !p.IsArchived).ToListAsync();
            var playerIds = players.Select(p => p.Id);

            var games = await _appDbContext.Games
                            .Include(g => g.Players)
                            .ToListAsync();

            var allPossiblePairings = PairingHelper.GetAll2ItemCombinations(playerIds);

            var allPairingSummaries = new List<PairingSummaryDto>();

            foreach (var pairing in allPossiblePairings)
            {
                var player1 = pairing[0];
                var player2 = pairing[1];

                var gamesWithBothPlayers = games
                    .Where(g => g.Players.Select(p => p.PlayerId).Contains(player1))
                    .Where(g => g.Players.Select(p => p.PlayerId).Contains(player2));

                var gamesWithBothPlayersOnTheSameTeam = gamesWithBothPlayers
                    .Where(g =>
                        g.Players.Where(p => p.PlayerId == player1).Single().WasResistance ==
                        g.Players.Where(p => p.PlayerId == player2).Single().WasResistance);

                var gamesWhereBothPlayersWin = gamesWithBothPlayersOnTheSameTeam
                    .Where(g =>
                        g.Players.Where(p => p.PlayerId == player1).Single().WasResistance ==
                        g.ResistanceWin);

                var totalGames = gamesWithBothPlayersOnTheSameTeam.Count();
                var wins = gamesWhereBothPlayersWin.Count();

                allPairingSummaries.Add(new PairingSummaryDto
                {
                    Ids = pairing.ToList(),
                    TotalGames = totalGames,
                    Wins = wins
                });
            }
            return allPairingSummaries;
        }
    }
}
