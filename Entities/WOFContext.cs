using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;

namespace WOF.Entities
{
    public class WOFContext : DbContext
    {
        public WOFContext(DbContextOptions<WOFContext> options) : base(options)
        {
            Database.Migrate();
        }

        public DbSet<Prize> Prizes { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<PlayHistory> PlayHistorys { get; set; }
    }
}
