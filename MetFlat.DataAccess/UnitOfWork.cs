using MetFlat.DataAccess.Interfaces;
using MetFlat.DataAccess.Interfaces.Repositories;
using MetFlat.DataAccess.Repositories;
using System.Threading.Tasks;

namespace MetFlat.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MetFlatContext _dbContext;

        private AddressRepository _addressRepository;
        private FlatRepository _flatRepository;
        private FacilityRepository _facilityRepository;
        private RentalRepository _rentalRepository;
        private UserRepository _userRepository;
        private PhotoRepository _photoRepository;

        public UnitOfWork(MetFlatContext context)
        {
            _dbContext = context;
        }

        public IAddressRepository AddressRepository => _addressRepository ??= new AddressRepository(_dbContext);

        public IFlatRepository FlatRepository => _flatRepository ??= new FlatRepository(_dbContext);

        public IRentalRepository RentalRepository => _rentalRepository ??= new RentalRepository(_dbContext);

        public IFacilityRepository FacilityRepository => _facilityRepository ??= new FacilityRepository(_dbContext);

        public IUserRepository UserRepository => _userRepository ??= new UserRepository(_dbContext);

        public IPhotoRepository PhotoRepository => _photoRepository ??= new PhotoRepository(_dbContext);

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
