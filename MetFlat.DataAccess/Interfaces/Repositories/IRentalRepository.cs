using MetFlat.Model.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace MetFlat.DataAccess.Interfaces.Repositories
{
    public interface IRentalRepository : IBaseRepository<Rental, int>
    {
        public IQueryable<Rental> GetAll();
    }
}
