using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WOF.Entities;

namespace WOF.Entities
{
    public static class WOFContextExtensions
    {
        public static void EnsureSeedDataForContext(this WOFContext context)
        {
            if (context.Prizes.Any())
            {
                return;
            }

            // init seed data
            var prizes = new List<Prize>()
            {
                new Prize()
                {
                     Name = "$100",
                     Description = "Gift Card worth $100",
                     IsActive = true,
                     Quantity=100,
                     CreateDateTime=DateTime.Now
                },
                 new Prize()
                {
                     Name = "$50",
                     Description = "Gift Card worth $50",
                     IsActive = true,
                     Quantity=100,
                     CreateDateTime=DateTime.Now
                }
                 , new Prize()
                {
                     Name = "$10",
                     Description = "Gift Card worth $10",
                     IsActive = true,
                     Quantity=100,
                     CreateDateTime=DateTime.Now
                }
            };

            context.Prizes.AddRange(prizes);
            context.SaveChanges();
        }
    }
}
