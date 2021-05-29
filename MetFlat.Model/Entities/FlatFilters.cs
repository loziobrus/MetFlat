using System;

namespace MetFlat.Model.Entities
{
    public class FlatFilters
    {
        public int GuestNumber { get; set; }

        public string City { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
