using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ResistanceScores.Models;
using ResistanceScores.Models.api;

namespace ResistanceScores.Services
{
    public class PlayerService : IPlayerService
    {
        public AppDbContext _appDbContext;

        public PlayerService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task CreatePlayer(PlayerUpdateDto player)
        {
            _appDbContext
                .Players
                .Add(new Player()
                {
                    Id = player.Id,
                    FirstName = player.FirstName,
                    Surname = player.Surname,
                    Initials = player.Initials
                });

            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeletePlayer(int id)
        {
            var player = _appDbContext.Players.Single(o => o.Id == id);

            _appDbContext.Players.Remove(player);

            await _appDbContext.SaveChangesAsync();
        }

        public async Task<PlayerDetailDto> GetPlayer(int id)
        {
            var player = await _appDbContext.Players.SingleOrDefaultAsync(o => o.Id == id);

            return new PlayerDetailDto()
            {
                Id = player.Id,
                FirstName = player.FirstName,
                Surname = player.Surname,
                Initials = player.Initials,
            };
        }

        public async Task<List<PlayerListingDto>> GetPlayers()
        {
            return await _appDbContext
                .Players
                .Select(o => new PlayerListingDto()
                {
                    Id = o.Id,
                    FirstName = o.FirstName,
                    Surname = o.Surname,
                    Initials = o.Initials,
                })
                .ToListAsync();
        }

        public async Task UpdatePlayer(PlayerUpdateDto player)
        {
            var dbPlayer = _appDbContext.Players.SingleOrDefault(o => o.Id == player.Id);

            dbPlayer.FirstName = player.FirstName;
            dbPlayer.Surname = player.Surname;
            dbPlayer.Initials = player.Initials;

            await _appDbContext.SaveChangesAsync();
        }
    }
}
