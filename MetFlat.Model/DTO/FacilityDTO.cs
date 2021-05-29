namespace MetFlat.Model.DTO
{
    public class FacilityDTO : IDto<int>
    {
        public int Id { get; set; }

        public int FlatId { get; set; }

        public string Attribute { get; set; }

        public string Value { get; set; }
    }
}
