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
    public class PlayerController : ControllerBase
    {
        private IPlayerService _playerService;

        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService ?? throw new ArgumentNullException(nameof(playerService));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<PlayerListingDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<PlayerListingDto>>> GetPlayers()
        {
            var players = await _playerService.GetPlayers();
            return Ok(players);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PlayerDetailDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PlayerDetailDto>> GetPlayer(int id)
        {
            var player = await _playerService.GetPlayer(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        [HttpPost]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<ActionResult<int>> CreatePlayer([FromBody] PlayerUpdateDto player)
        {
            var id = await _playerService.CreatePlayer(player);
            return Ok(id);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> UpdatePlayer([FromBody] PlayerUpdateDto player)
        {
            await _playerService.UpdatePlayer(player);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeletePlayer(int id)
        {
            await _playerService.DeletePlayer(id);
            return NoContent();
        }
    }
}
