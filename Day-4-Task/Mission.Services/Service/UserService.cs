using Mission.Entities.ViewModels;
using Mission.Entities.ViewModels.Login;
using Mission.Repositories.IRepository;
using Mission.Services.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mission.Services.Service
{
    public class UserService(IUserRepository userRepository, JwtService jwtService) : IUserService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly JwtService _jwtService = jwtService;
        public async Task<ResponseResult> LoginUser(UserLoginRequestModel model)
        {
            var (response, message) = await _userRepository.LoginUser(model);
            var result = new ResponseResult
            {
                Data = response,
                Message = message
            };
            if (response == null)
            {
                result.Status = ResponseStatus.Error;
                return result;
            }
            else {
                result.Data = _jwtService.GenerateJwtToken(response);
                result.Status = ResponseStatus.Success;
            }
                
            return result;

        }
    }
}