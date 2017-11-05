using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WOF.Entities
{
    public class Prize
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public decimal Chances { get; set; } = 100;

        [MaxLength(200)]
        public string Description { get; set; }

        [Required]
        public int Quantity { get; set; } = 0;

        [Required]
        public bool IsActive { get; set; } = true;

        [Required]
        public DateTime CreateDateTime { get; set; } = DateTime.Now;


    }
}
