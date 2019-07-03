using ResistanceScores.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models
{
    public class GamePlayer
    {
        [Required]
        public int GameId { get; set; }

        [Required]
        public int PlayerId { get; set; }

        [Required]
        public bool WasResistance { get; set; }

        [Required]
        public Role Role { get; set; }

        public Game Game { get; set; }
        public Player Player { get; set; }
    }
}
