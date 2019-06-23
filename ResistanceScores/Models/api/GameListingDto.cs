using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class GameListingDto
    {
        public int Id { get; set; }

        public DateTimeOffset Date { get; set; }

        public bool ResistanceWin { get; set; }

        public List<string> Players { get; set; }
    }
}
