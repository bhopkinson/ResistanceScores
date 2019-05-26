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
            _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
        }

        public async Task CreatePlayer(PlayerUpdateDto player)
        {
            var newPlayer = new Player
            {
                Id = player.Id,
                FirstName = player.FirstName,
                Surname = player.Surname,
                Initials = player.Initials
            };

            _appDbContext.Players.Add(newPlayer);

            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeletePlayer(int id)
        {
            var player = await _appDbContext.Players.SingleOrDefaultAsync(o => o.Id == id);

            _appDbContext.Players.Remove(player);

            await _appDbContext.SaveChangesAsync();
        }

        public async Task<PlayerDetailDto> GetPlayer(int id)
        {
            return await _appDbContext.Players.Select(o => new PlayerDetailDto
            {
                Id = o.Id,
                FirstName = o.FirstName,
                Surname = o.Surname,
                Initials = o.Initials,
            })
            .SingleOrDefaultAsync(o => o.Id == id);
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
            var dbPlayer = await _appDbContext.Players.SingleOrDefaultAsync(o => o.Id == player.Id);

            dbPlayer.FirstName = player.FirstName;
            dbPlayer.Surname = player.Surname;
            dbPlayer.Initials = player.Initials;

            _appDbContext.Players.Update(dbPlayer);

            await _appDbContext.SaveChangesAsync();
        }
    }
}
