namespace MetFlat.Model.DTO
{
    public class AddressDTO : IDto<int>
    {
        public int Id { get; set; }

        public string City { get; set; }

        public string Street { get; set; }

        public int Appartment { get; set; }
    }
}
