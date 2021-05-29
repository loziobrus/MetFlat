namespace MetFlat.Model.Entities
{
    public class Address : IEntity<int>
    {
        public int Id { get; set; }

        public int FlatId { get; set; }

        public Flat Flat { get; set; }

        public string City { get; set; }

        public string Street { get; set; }

        public int Appartment { get; set; }
    }
}
