namespace MetFlat.Model.DTO
{
    public class UserDTO : IDto<string>
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public int Age { get; set; }

        public string City { get; set; }

        public int Active { get; set; }

        public string Bio { get; set; }

        public string Photo { get; set; }

        public string Password { get; set; }
    }
}
