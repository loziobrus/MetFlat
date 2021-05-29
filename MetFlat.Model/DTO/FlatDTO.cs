using MetFlat.Model.Entities;
using System.Collections.Generic;

namespace MetFlat.Model.DTO
{
    public class FlatDTO : IDto<int>
    {
        public int Id { get; set; }

        public int FlatValue { get; set; }

        public string Description { get; set; }

        public int MaxGuests { get; set; }

        public int RoomCount { get; set; }

        public int Price { get; set; }

        public bool IsActive { get; set; }

        public string OwnerId { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public string MainPhoto { get; set; }

        public List<PhotoDTO> Photos { get; set; }

        //features
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
