using MetFlat.DataAccess.Interfaces.Repositories;
using MetFlat.Model.Entities;

namespace MetFlat.DataAccess.Repositories
{
    public class UserRepository : BaseRepository<User, string>, IUserRepository
    {
        public UserRepository(MetFlatContext context) : base(context) { }
    }
}
