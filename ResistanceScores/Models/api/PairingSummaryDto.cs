using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class PairingSummaryDto
    {
        public List<int> Ids { get; set; }

        public int Wins { get; set; }

        public int TotalGames { get; set; }
    }
}
