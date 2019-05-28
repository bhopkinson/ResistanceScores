using ResistanceScores.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class QueryOptions
    {
        public Team Team { get; set; }

        public Timescale Timescale { get; set; }
    }
}
