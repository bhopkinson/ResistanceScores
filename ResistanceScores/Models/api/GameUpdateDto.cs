using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class GameUpdateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTimeOffset Date { get; set; }

        [Required]
        public bool ResistanceWin { get; set; }

        [Required]
        public List<GamePlayerUpdateDto> Players { get; set; }
    }
}
