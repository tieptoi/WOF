using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WOF.Entities;

namespace WOF.Services
{
    public interface IPrizeRepository
	{
		void AddPrize(Prize prize);
		Prize GetPrize(int prizeId);
        void DeletePrize(Prize prize);
        IEnumerable<Prize> GetAllPrizes(Expression<Func<Prize, bool>> filter = null,
                                        Func<IQueryable<Prize>, IOrderedQueryable<Prize>> orderBy = null, int? page=1, 
                                        int? pageSize = 8, string includeProperties = "");
        void Update(Prize prize);
        bool Save();

    }
}
