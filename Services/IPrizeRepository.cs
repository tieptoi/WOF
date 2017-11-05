using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WOF.Entities;

namespace WOF.Services
{
    public interface IPrizeRepository
	{
		void AddPrize(Prize prize);
		Prize GetPrize(int prizeId);
        void DeletePrize(Prize prize);
        IEnumerable<Prize> GetAllPrizes();
        bool Save();

    }
}
