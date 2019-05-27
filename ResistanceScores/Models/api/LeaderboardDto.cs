using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class LeaderboardDto
    {   
        public int PlayerId { get; set; }
        public string Initials { get; set; }
        public int Wins { get; set; }
        public int TotalGames { get; set; }
    }
}
