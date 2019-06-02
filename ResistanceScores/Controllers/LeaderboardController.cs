using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResistanceScores.Models.api;
using ResistanceScores.Services;

namespace ResistanceScores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderboardController : ControllerBase
    {
        private ILeaderboardService _leaderboardService;

        public LeaderboardController(ILeaderboardService leaderboardService)
        {
            _leaderboardService = leaderboardService ?? throw new ArgumentNullException(nameof(leaderboardService));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<LeaderboardDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(List<LeaderboardDto>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<LeaderboardDto>>> GetLeaderboard([FromQuery] QueryOptions queryOptions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var leaderboard = await _leaderboardService.GetLeaderboard(queryOptions);
            return Ok(leaderboard);
        }

        // TODO: Move to separate controller
        [HttpGet("GameLeaderboard")]
        [ProducesResponseType(typeof(List<GameOverviewDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<GameOverviewDto>>> GetGameLeaderboard()
        {
            var leaderboard = await _leaderboardService.GetGameLeaderboard();
            return Ok(leaderboard);
        }

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

        //[HttpPost]
        //[ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        //public async Task<ActionResult<int>> CreateGame([FromBody] GameUpdateDto game)
        //{
        //    var id = await _gameService.CreateGame(game);
        //    return Ok(id);
        //}

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
