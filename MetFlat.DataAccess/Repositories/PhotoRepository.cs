using MetFlat.DataAccess.Interfaces.Repositories;
using MetFlat.Model.Entities;

namespace MetFlat.DataAccess.Repositories
{
    public class PhotoRepository : BaseRepository<Photo, int>, IPhotoRepository
    {
        public PhotoRepository(MetFlatContext context) : base(context) { }
    }
}
