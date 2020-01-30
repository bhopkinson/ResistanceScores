using ResistanceScores.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class QueryOptions
    {
        public Team Team { get; set; }

        public Timescale Timescale { get; set; }

        [Range(4, 11)]
        public int NoOfPlayers { get; set; }

        [Range(0, int.MaxValue)]
        public int AsOfWhen { get; set; }

        public Role Role { get; set; }
    }
}
