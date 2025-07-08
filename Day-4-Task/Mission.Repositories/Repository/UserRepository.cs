using Microsoft.EntityFrameworkCore;
using Mission.Entities;
using Mission.Entities.ViewModels.Login;
using Mission.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mission.Repositories.Repository
{
    public class UserRepository(MissionDbContext dbContext) : IUserRepository
    {
        private readonly MissionDbContext _context = dbContext;

        public async Task<(UserLoginResponseModel? response, string message)> LoginUser(UserLoginRequestModel model)
        {
           var user = await _context.users.Where(u => u.EmailID.ToLower() == model.EmailAddress.ToLower()).FirstOrDefaultAsync();
            if(user==null)
            {
                return (null,"User not found");
            }
            if(user.Password != model.Password)
            {
                return (null, "Invalid password");
            }
            var response = new UserLoginResponseModel
            {
                Id = user.Id,
                FName = user.FName,
                LName = user.LName,
                EmailID = user.EmailID,
                PhoneNumber = user.PhoneNumber,
                UserType = user.UserType,
                Userimg = user.Userimg
            };
            return (response, "Login successful");
        }
    }
}
