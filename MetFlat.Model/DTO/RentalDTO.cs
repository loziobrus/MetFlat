using MetFlat.Model.Enums;
using System;

namespace MetFlat.Model.DTO
{
    public class RentalDTO : IDto<int>
    {
        public int Id { get; set; }

        public int FlatId { get; set; }

        public string TenantId { get; set; }

        public string FlatPhoto { get; set; }

        public string Address { get; set; }

        public Status RentalStatus { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int Total { get; set; }
    }
}
