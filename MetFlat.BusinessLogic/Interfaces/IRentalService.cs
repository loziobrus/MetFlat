using MetFlat.Model.DTO;
using MetFlat.Model.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetFlat.BusinessLogic.Interfaces
{
    public interface IRentalService
    {
        public IEnumerable<RentalDTO> GetAll();

        public IEnumerable<RentalDTO> GetByOwnerId(string id);

        public IEnumerable<RentalDTO> GetByTenantId(string id);

        public IEnumerable<RentalDTO> GetPendingByOwnerId(string id);

        public IEnumerable<RentalDTO> GetPendingByTenantId(string id);

        public Task<RentalDTO> GetById(int Id);

        public Task Insert(RentalDTO rentalDTO);

        public Task Notify(Rental rental);

        public Task ApproveRental(int id);

        public Task CancelRental(int id);
    }
}
