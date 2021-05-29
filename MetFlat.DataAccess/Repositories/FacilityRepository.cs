using MetFlat.DataAccess.Interfaces.Repositories;
using MetFlat.Model.Entities;

namespace MetFlat.DataAccess.Repositories
{
    public class FacilityRepository : BaseRepository<Facility, int>, IFacilityRepository
    {
        public FacilityRepository(MetFlatContext context) : base(context) { }
    }
}
