using MetFlat.DataAccess.Interfaces.Repositories;
using MetFlat.Model.Entities;

namespace MetFlat.DataAccess.Repositories
{
    public class AddressRepository : BaseRepository<Address, int>, IAddressRepository
    {
        public AddressRepository(MetFlatContext context) : base(context) { }
    }
}
