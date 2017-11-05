using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WOF.Entities;

namespace WOF.Models
{
    public class PlayerDto
    {
        public int Id { get; set; }

        public string MemberId { get; set; }

        public IEnumerable<PlayHistory> PlayHistorys { get; set; } = new List<PlayHistory>();
    }
}
