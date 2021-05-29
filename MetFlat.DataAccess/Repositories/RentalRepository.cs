using MetFlat.DataAccess.Interfaces.Repositories;
using MetFlat.Model.Entities;

namespace MetFlat.DataAccess.Repositories
{
    public class RentalRepository : BaseRepository<Rental, int>, IRentalRepository
    {
        public RentalRepository(MetFlatContext context) : base(context) { }
    }
}
