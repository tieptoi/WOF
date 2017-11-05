using System.ComponentModel.DataAnnotations;

namespace WOF.Models
{
    public class PrizeForUpdateDto
    {
		[Required(ErrorMessage = "You should provide a name value.")]
        [MaxLength(50)]
        public string Name { get; set; }

		[Required(ErrorMessage = "You should provide a name value.")]
        [MaxLength(200)]
        public string Description { get; set; }

		[Required(ErrorMessage = "You should provide a quantity value.")]
        public int Quantity { get; set; }

		[Required(ErrorMessage = "You should provide a chances value.")]
		public decimal Chances { get; set; }

		[Required(ErrorMessage = "You should provide a active value.")]
        public bool IsActive { get; set; } = true;
	}
}