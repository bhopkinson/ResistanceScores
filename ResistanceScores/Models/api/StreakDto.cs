using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class StreakDto
    {
        public int PlayerId { get; set; }
        public string Initials { get; set; }
        public int MaxWins { get; set; }
        public int MaxLosses { get; set; }
        public int Current { get; set; }
        public bool CurrentWinOrLoss { get; set; }
    }
}
