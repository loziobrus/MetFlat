using MetFlat.Model.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetFlat.DataAccess.Interfaces.Repositories
{
    public interface IFlatRepository : IBaseRepository<Flat, int>
    {
        public Task<IEnumerable<Flat>> GetFiltered(FlatFilters filters);

        public Task<Flat> GetById(int id);
    }
}
