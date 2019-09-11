using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ResistanceScores.Models
{
    public class Player
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string Surname { get; set; }

        [Required]
        [StringLength(2)]
        public string Initials { get; set; }

        [Required]
        public bool IsArchived { get; set; }

        public List<GamePlayer> Games { get; set; }
    }
}
