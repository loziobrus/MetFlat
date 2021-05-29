namespace MetFlat.Model.Entities
{
    public class Photo : IEntity<int>
    {
        public int Id { get; set; }

        public int FlatId { get; set; }

        public Flat Flat { get; set; }

        public string Path { get; set; }
    }
}
