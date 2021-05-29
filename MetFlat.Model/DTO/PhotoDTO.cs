namespace MetFlat.Model.DTO
{
    public class PhotoDTO : IDto<int>
    {
        public int Id { get; set; }

        public int FlatId { get; set; }

        public string Path { get; set; }
    }
}
