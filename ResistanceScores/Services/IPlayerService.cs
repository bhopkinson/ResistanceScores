using ResistanceScores.Models;
using ResistanceScores.Models.api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Services
{
    public interface IPlayerService
    {
        Task<List<PlayerListingDto>> GetPlayers();
        Task<PlayerDetailDto> GetPlayer(int id);
        Task<int> CreatePlayer(PlayerUpdateDto player);
        Task UpdatePlayer(PlayerUpdateDto player);
        Task DeletePlayer(int id);
    }
}
