using MetFlat.Model.DTO;
using System.Threading.Tasks;

namespace MetFlat.BusinessLogic.Interfaces
{
    public interface IAccountService
    {
        public Task<UserDTO> GetUser(string id);

        public Task<UserLoginDTO> SignUp(UserRegisterDTO user);

        public Task<UserDTO> SignIn(UserLoginDTO user);

        public Task ChangePassword(ChangePasswordDTO passwordDTO);

        public Task Logout();
    }
}
