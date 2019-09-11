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
    public class PairingController : ControllerBase
    {
        private IPairingService _pairingService;

        public PairingController(IPairingService pairingService)
        {
            _pairingService = pairingService ?? throw new ArgumentNullException(nameof(pairingService));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<PairingSummaryDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<PairingSummaryDto>>> GetSummary()
        {
            var games = await _pairingService.GetSummary();
            return Ok(games);
        }
    }
}
