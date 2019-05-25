using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models
{
    public class Game
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTimeOffset Date { get; set; }

        [Required]
        public bool ResistanceWin { get; set; }
    }
}
