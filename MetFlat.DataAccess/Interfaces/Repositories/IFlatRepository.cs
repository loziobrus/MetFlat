using MetFlat.Model.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetFlat.DataAccess.Interfaces.Repositories
{
    public interface IFlatRepository : IBaseRepository<Flat, int>
    {
        public Task<IEnumerable<Flat>> GetFiltered(FlatFilters filters);

        public new Task<IEnumerable<Flat>> GetAll();

        public Task<IEnumerable<Flat>> GetByOwnerId(string id);

        public new Task<Flat> GetById(int id);
    }
}
