using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResistanceScores.Models;
using ResistanceScores.Models.api;
using ResistanceScores.Services;

namespace ResistanceScores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService ?? throw new ArgumentNullException(nameof(gameService));
        }

        //[HttpGet]
        //[ProducesResponseType(typeof(List<GameDetailDto>), StatusCodes.Status200OK)]
        //public async Task<ActionResult<List<GameListingDto>>> GetGames()
        //{
        //    var games = await _gameService.GetGames();
        //    return Ok(games);
        //}

        //[HttpGet("{id}")]
        //[ProducesResponseType(typeof(GameDetailDto), StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<ActionResult<GameDetailDto>> GetGame(int id)
        //{
        //    var game = await _gameService.GetGame(id);

        //    if (game == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(game);
        //}

        [HttpPost]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<ActionResult<int>> CreateGame([FromBody] GameUpdateDto game)
        {
            var id = await _gameService.CreateGame(game);
            return Ok(id);
        }

        //[HttpPut]
        //[ProducesResponseType(StatusCodes.Status204NoContent)]
        //public async Task<ActionResult> UpdateGame([FromBody] GameUpdateDto game)
        //{
        //    await _gameService.UpdateGame(game);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //[ProducesResponseType(StatusCodes.Status204NoContent)]
        //public async Task<ActionResult> DeleteGame(int id)
        //{
        //    await _gameService.DeleteGame(id);
        //    return NoContent();
        //}
    }
}
