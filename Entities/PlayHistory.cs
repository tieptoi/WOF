using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WOF.Entities
{
    public class PlayHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("PrizeId")]
        public Prize Prize { get; set; }
        public int PrizeId { get; set; }

        public DateTime CreatedDateTime { get; set; }

        [ForeignKey("PlayerId")]
        public Player Player { get; set; }
        public int PlayerId { get; set; }
    }
}
