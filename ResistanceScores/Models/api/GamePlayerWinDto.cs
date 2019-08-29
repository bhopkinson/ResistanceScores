using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class GamePlayerWinDto
    {
        public int GameId { get; set; }

        public int PlayerId { get; set; }

        public bool Win { get; set; }

        public DateTime Date { get; set; }

        public int WinCount { get; set; }
        public int GameCount { get; set; }
    }
}
