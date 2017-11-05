using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WOF.Entities;

namespace WOF.Services
{
    public class PrizeRepository : IPrizeRepository
    {
        private readonly WOFContext _wofContext;

        public PrizeRepository(WOFContext wofContext)
        {
            _wofContext = wofContext;
        }

		public void AddPrize(Prize prize)
		{
			_wofContext.Prizes.Add(prize);
		}

		public void DeletePrize(Prize prize)
        {
			_wofContext.Prizes.Remove(prize);
        }

        public IEnumerable<Prize> GetAllPrizes()
        {
            return _wofContext.Prizes.ToList();
        }

        public Prize GetPrize(int prizeId)
        {
            return _wofContext.Prizes.FirstOrDefault(x => x.Id == prizeId);
        }

        public bool Save()
        {
            return(_wofContext.SaveChanges() > 0);
        }
    }
}
