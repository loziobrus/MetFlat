using MetFlat.DataAccess.Interfaces.Repositories;
using System.Threading.Tasks;

namespace MetFlat.DataAccess.Interfaces
{
    public interface IUnitOfWork
    {
        public IAddressRepository AddressRepository { get; }

        public IFlatRepository FlatRepository { get; }

        public IRentalRepository RentalRepository { get; }

        public IFacilityRepository FacilityRepository { get; }
        
        public IUserRepository UserRepository { get; }

        public IPhotoRepository PhotoRepository { get; }

        public Task Save();
    }
}
