using MetFlat.BusinessLogic.Interfaces;
using MetFlat.Model.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace EuroScreen.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        public readonly IAccountService accountService;

        public AccountController(IAccountService _accountService)
        {
            accountService = _accountService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<UserLoginDTO>> SignUp([FromBody] UserDTO user)
        {
            try
            {
                var result = await accountService.SignUp(user);
                return Ok(result);
            }
            catch (FormatException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserLoginDTO>> SignIn([FromBody] UserLoginDTO user)
        {
            try
            {
                var result = await accountService.SignIn(user);
                return Ok(result);
            }
            catch (FormatException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPost("changePassword")]
        [Authorize]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDTO passwordDTO)
        {
            passwordDTO.Username = User.Identity.Name;

            try
            {
                await accountService.ChangePassword(passwordDTO);
                return Ok("Password has been changed successfully.");
            }
            catch (FormatException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            try
            {
                await accountService.Logout();
                return Ok();
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
        }
    }
}
