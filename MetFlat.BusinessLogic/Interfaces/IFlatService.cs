using MetFlat.Model.DTO;
using MetFlat.Model.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MetFlat.BusinessLogic.Interfaces
{
    public interface IFlatService
    {
        public IEnumerable<FlatDTO> GetAll();

        public Task<IEnumerable<FlatDTO>> GetFiltered(FlatFilters filters);

        public Task<FlatDTO> GetById(int id);

        public Task<IEnumerable<FlatDTO>> GetByOwnerId(string id);

        public Task Insert(FlatDTO flatDTO);

        public void Update(int id, FlatDTO flatDTO);

        public Task Delete(int id);

        public Task Deactivate(int id);
    }
}
