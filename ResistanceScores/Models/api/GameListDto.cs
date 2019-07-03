using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class GameListDto
    {
        public IList<string> Players;
        public IList<GameSummaryDto> Games;
    }
}
