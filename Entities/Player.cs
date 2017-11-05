using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WOF.Entities
{
    public class Player
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MinLength(30)]
        public string MemberId { get; set; }

        public ICollection<PlayHistory> PlayHistorys { get; set; } = new List<PlayHistory>();

        [Required]
        public DateTime CreateDateTime { get; set; } = DateTime.Now;
    }
}
