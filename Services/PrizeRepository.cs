using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public IEnumerable<Prize> GetAllPrizes(Expression<Func<Prize, bool>> filter = null, Func<IQueryable<Prize>, 
                                               IOrderedQueryable<Prize>> orderBy = null, int? page = 1, int? pageSize = 8, string includeProperties = "")
        {
            IQueryable<Prize> query = _wofContext.Prizes;

            // Filter
            if (filter != null)
            {
                query = query.Where(filter);
            }

            // Include Properties
            foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            // Pagination
            int skipRows = (page.Value - 1) * pageSize.Value;
            query = query.Take(pageSize.Value).Skip(skipRows);

            // Order By
            if(orderBy != null){
                query =  orderBy(query);
            } 

			return query.ToList();
        }

        public Prize GetPrize(int prizeId)
        {
            return _wofContext.Prizes.FirstOrDefault(x => x.Id == prizeId);
        }

        public bool Save()
        {
            return(_wofContext.SaveChanges() > 0);
        }

        public void Update(Prize prize)
        {
            _wofContext.Attach(prize);
            _wofContext.Entry(prize).State = EntityState.Modified;
        }
    }
}
