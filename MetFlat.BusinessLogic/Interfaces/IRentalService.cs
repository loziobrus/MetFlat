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

        public Task<RentalDTO> GetById(int Id);

        public Task Insert(RentalDTO rentalDTO);

        public Task Update(int id, RentalDTO rentalDTO);

        public Task Delete(int id);

        public void Notify(Rental rental);

        public Task ApproveRental(int id);

        public Task CancelRental(int id);
    }
}
