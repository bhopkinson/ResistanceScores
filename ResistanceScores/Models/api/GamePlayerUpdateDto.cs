using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models.api
{
    public class GamePlayerUpdateDto
    {
        [Required]
        public string Initials { get; set; }

        [Required]
        public bool WasResistance { get; set; }
    }
}
