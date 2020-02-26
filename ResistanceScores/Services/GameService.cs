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
                Player = players.Where(p => p.Id == o.Id).SingleOrDefault(),
                Role = o.Role
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

        public async Task CreateMultipleGames(List<GameUpdateDto> games)
        {
            var players = await _appDbContext
                .Players
                .ToListAsync();

            foreach (var game in games)
            {
                var newGamePlayers = game.Players.Select(o => new GamePlayer
                {
                    WasResistance = o.WasResistance,
                    Player = players.Where(p => p.Id == o.Id).SingleOrDefault()
                })
                .ToList();

                var newGame = new Game
                {
                    Date = game.Date,
                    ResistanceWin = game.ResistanceWin,
                    Players = newGamePlayers
                };

                _appDbContext.Games.Add(newGame);
            }

            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteGame(int id)
        {
            var game = await _appDbContext.Games.SingleOrDefaultAsync(o => o.Id == id);

            _appDbContext.Games.Remove(game);

            await _appDbContext.SaveChangesAsync();
        }

        public async Task<GameDetailDto> GetGame(int id)
        {
            return await _appDbContext.Games.Select(o => new GameDetailDto
            {
                Id = o.Id,
                Date = o.Date,
                ResistanceWin = o.ResistanceWin,
                Players = o.Players.Select(p => new GamePlayerDetailDto
                {
                    Id = p.PlayerId,
                    WasResistance = p.WasResistance,
                    Role = p.Role
                }).ToList()
            })
            .SingleOrDefaultAsync(o => o.Id == id);
        }

        public async Task<List<GameListingDto>> GetGames()
        {
            return await _appDbContext
                .Games
                .Select(o => new GameListingDto()
                {
                    Id = o.Id,
                    Date = o.Date,
                    ResistanceWin = o.ResistanceWin,
                    Players = o.Players.Select(p => p.Player.Initials).ToList()
                })
                .OrderByDescending(o => o.Id)
                .ToListAsync();
        }

        public async Task UpdateGame(GameUpdateDto game)
        {
            var dbGame = await _appDbContext.Games.SingleOrDefaultAsync(o => o.Id == game.Id);
            dbGame.Id = game.Id;
            dbGame.Date = game.Date;
            dbGame.ResistanceWin = game.ResistanceWin;

            _appDbContext.Games.Update(dbGame);

            var dbGamePlayers = await _appDbContext.GamePlayers.Where(o => o.GameId == game.Id).ToListAsync();
            var newGamePlayers = game.Players.Select(o => new GamePlayer
            {
                GameId = game.Id,
                PlayerId = o.Id,
                WasResistance = o.WasResistance,
                Role = p.Role
            })
            .ToList();

            _appDbContext.GamePlayers.RemoveRange(dbGamePlayers);
            _appDbContext.GamePlayers.AddRange(newGamePlayers);

            await _appDbContext.SaveChangesAsync();
        }
    }
}

