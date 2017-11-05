using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WOF.Models
{
    public class PrizeDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

		public int Quantity { get; set; }

		public decimal Chances { get; set; }

        public bool IsActive { get; set; }
    }
}
