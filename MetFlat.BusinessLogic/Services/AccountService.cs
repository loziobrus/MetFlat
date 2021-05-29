using AutoMapper;
using MetFlat.BusinessLogic.Interfaces;
using MetFlat.Model.DTO;
using MetFlat.Model.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace MetFlat.BusinessLogic.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IMapper _mapper;

        public AccountService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        public async Task<UserDTO> SignIn(UserLoginDTO user)
        {
            var result = _signInManager.PasswordSignInAsync(user.UserName, user.Password, true, false).Result;

            if (result.Succeeded)
            {
                var userEntity = await _userManager.FindByEmailAsync(user.UserName);
                var loggedUser = new UserDTO();
                _mapper.Map(userEntity, loggedUser);
                return loggedUser;
            }

            throw new FormatException("User doesn't exist or wrong password.");
        }

        public async Task<UserLoginDTO> SignUp(UserDTO userDTO)
        {
            if(await _userManager.FindByEmailAsync(userDTO.Email) != null)
            {
                throw new FormatException("User with this email already exists.");
            }

            var user = new User
            {
                UserName = userDTO.Email,
                Email = userDTO.Email,
                Name = userDTO.Name,
                Age = userDTO.Age,
                Bio = userDTO.Bio,
                City = userDTO.City,
                PhoneNumber = userDTO.PhoneNumber,
                Photo = userDTO.Photo,
                Active = userDTO.Active
            };

            var result = await _userManager.CreateAsync(user, userDTO.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: true);
                var userEntity = await _userManager.FindByEmailAsync(userDTO.Email);
                var newDto = new UserLoginDTO
                {
                    UserName = userEntity.UserName,
                    Password = userEntity.PasswordHash
                };
                return newDto;
            }
            else
            {
                throw new FormatException("Failed to create new user.");
            }
        }

        public async Task ChangePassword(ChangePasswordDTO newPassword)
        {
            var user = _userManager.FindByNameAsync(newPassword.Username).Result;

            if (user != null)
            {
                var result = await _userManager.ChangePasswordAsync(user, newPassword.OldPassword, newPassword.NewPassword);

                if (!result.Succeeded)
                    throw new FormatException("Failed to change the password.");
            }
            else
            {
                throw new FormatException("User does not exist.");
            }

            await _signInManager.RefreshSignInAsync(user);
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<UserDTO> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
                return _mapper.Map<UserDTO>(user);
            else
                return null;
        }
    }
}
