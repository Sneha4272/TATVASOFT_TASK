using Microsoft.EntityFrameworkCore;
using Mission.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mission.Entities
{
    public class MissionDbContext(DbContextOptions<MissionDbContext> options) : DbContext(options)
    {
        public DbSet<User> users {  get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User()
            {
                Id = 1,
                FName = "Test",
                LName = "Demo",
                EmailID="test@gmail.com",
                Password="1234",
                PhoneNumber="12345670",
                UserType="admin",

            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
