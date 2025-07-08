using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mission.Entities.ViewModels.Login
{
    public class UserLoginResponseModel
    {
        public int Id { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string EmailID { get; set; }
        public string PhoneNumber { get; set; }
        public string UserType { get; set; } 
        public string? Userimg { get; set; }
    }
}
