namespace MetFlat.Model.Entities
{
    public class Facility : IEntity<int>
    {
        public int Id { get; set; }

        public int FlatId { get; set; }

        public Flat Flat { get; set; }

        public string Attribute { get; set; }

        public string Value { get; set; }
    }
}
