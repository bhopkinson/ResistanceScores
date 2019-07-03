using ResistanceScores.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class GamePlayerDetailDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public bool WasResistance { get; set; }

        [Required]
        public Role Role { get; set; }
    }
}
