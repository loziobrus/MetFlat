using MetFlat.Model.Enums;
using System;

namespace MetFlat.Model.Entities
{
    public class Rental : IEntity<int>
    {
        public int Id { get; set; }

        public int FlatId { get; set; }

        public Flat Flat { get; set; }

        public string TenantId { get; set; }

        public User Tenant { get; set; }

        public Status RentalStatus { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Total { get; set; }
    }
}
