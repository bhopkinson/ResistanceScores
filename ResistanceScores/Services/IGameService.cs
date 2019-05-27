using ResistanceScores.Models;
using ResistanceScores.Models.api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Services
{
    public interface IGameService
    {
        //Task<List<GameListingDto>> GetGames();
        //Task<GameDetailDto> GetGame(int id);
        Task<int> CreateGame(GameUpdateDto game);
        //Task UpdateGame(GameUpdateDto game);
        //Task DeleteGame(int id);
    }
}
