using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class GameDetailDto
    {
        public int Id { get; set; }

        public DateTimeOffset Date { get; set; }

        public bool ResistanceWin { get; set; }

        public List<GamePlayerDetailDto> Players { get; set; }
    }
}
