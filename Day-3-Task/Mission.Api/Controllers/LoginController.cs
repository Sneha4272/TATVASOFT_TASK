using Microsoft.AspNetCore.Mvc;
using Mission.Entities.ViewModels;
using Mission.Entities.ViewModels.Login;
using Mission.Services.IService;
using System.Threading.Tasks;

namespace Mission.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;
        [HttpPost]
        [Route("LoginUser")]
        public async Task<IActionResult> LoginUser(UserLoginRequestModel model)
        {
           var response=await _userService.LoginUser(model);
            if(response.Status == ResponseStatus.Error)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
