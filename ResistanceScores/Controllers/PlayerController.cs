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
        public async Task<ActionResult<List<PlayerListingDto>>> GetPlayers()
        {
            var players = await _playerService.GetPlayers();
            return Ok(players);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerDetailDto>> GetPlayer(int id)
        {
            var player = await _playerService.GetPlayer(id);
            return Ok(player);
        }

        [HttpPost]
        public async Task<ActionResult> CreatePlayer([FromBody] PlayerUpdateDto player)
        {
            await _playerService.CreatePlayer(player);
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdatePlayer([FromBody] PlayerUpdateDto player)
        {
            await _playerService.UpdatePlayer(player);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePlayer(int id)
        {
            await _playerService.DeletePlayer(id);
            return Ok();
        }
    }
}
