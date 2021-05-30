using MetFlat.DataAccess.Interfaces.Repositories;
using MetFlat.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetFlat.DataAccess.Repositories
{
    public class RentalRepository : BaseRepository<Rental, int>, IRentalRepository
    {
        public RentalRepository(MetFlatContext context) : base(context) { }

        public new IQueryable<Rental> GetAll()
        {
            IQueryable<Rental> query = _dbContext.Set<Rental>();

            query = query
                .Include(r => r.Flat)
                .ThenInclude(f => f.Photos);

            return query;
        }
    }
}
