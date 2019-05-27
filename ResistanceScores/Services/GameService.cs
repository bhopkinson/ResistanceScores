using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ResistanceScores.Models;
using ResistanceScores.Models.api;

namespace ResistanceScores.Services
{
    public class GameService : IGameService
    {
        public AppDbContext _appDbContext;

        public GameService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        public async Task<int> CreateGame(GameUpdateDto game)
        {
            var players = await _appDbContext
                .Players
                .ToListAsync();

            var newGamePlayers = game.Players.Select(o => new GamePlayer
            {
                WasResistance = o.WasResistance,
                Player = players.Where(p => p.Initials == o.Initials).SingleOrDefault()
            })
            .ToList();
                
            var newGame = new Game
            {
                Date = game.Date,
                ResistanceWin = game.ResistanceWin,
                Players = newGamePlayers
            };

            _appDbContext.Games.Add(newGame);
            
            await _appDbContext.SaveChangesAsync();
            return newGame.Id;
        }
    }
}
