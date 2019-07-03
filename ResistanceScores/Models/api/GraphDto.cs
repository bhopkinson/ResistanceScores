using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class GraphDto
    {
        public IList<GraphPlayerDto> GraphPlayers;
        public int FirstGameId;
        public int LastGameId;
    }
}
