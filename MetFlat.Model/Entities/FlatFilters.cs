using System;

namespace MetFlat.Model.Entities
{
    public class FlatFilters
    {
        public int GuestNumber { get; set; }

        public int RoomCount { get; set; }

        public string City { get; set; }

        public int MaxPrice { get; set; }

        public int MinPrice { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public bool TV { get; set; }
        public bool WIFI { get; set; }
        public bool Parking { get; set; }
        public bool Balcony { get; set; }
        public bool Oven { get; set; }
        public bool Microwave { get; set; }
        public bool Kitchen { get; set; }
        public bool Elevator { get; set; }
        public bool WithKids { get; set; }
        public bool WithPets { get; set; }
        public bool Fridge { get; set; }
        public bool Iron { get; set; }
    }
}
