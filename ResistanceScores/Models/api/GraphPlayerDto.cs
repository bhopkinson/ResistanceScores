using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class GraphPlayerDto
    {
        public int PlayerId;
        public IList<GraphPointDto> GraphPoints;
    }
}
