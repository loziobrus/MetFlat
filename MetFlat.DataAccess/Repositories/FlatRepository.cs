using MetFlat.DataAccess.Interfaces.Repositories;
using MetFlat.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetFlat.Model.Enums;

namespace MetFlat.DataAccess.Repositories
{
    public class FlatRepository : BaseRepository<Flat, int>, IFlatRepository
    {
        public FlatRepository(MetFlatContext context) : base(context) { }

        public async Task<IEnumerable<Flat>> GetFiltered(FlatFilters filters)
        {
            IQueryable<Flat> query = Filter(filters);

            query = query
                .Include(f => f.Photos);

            return await query.ToArrayAsync();
        }

        public new async Task<IEnumerable<Flat>> GetAll()
        {
            IQueryable<Flat> query = _dbContext.Set<Flat>();

            query = query
                .Include(f => f.Photos);

            return await query.ToArrayAsync();
        }

        public new async Task<Flat> GetById(int id)
        {
            var flat = _dbContext.Set<Flat>().Where(f => f.Id == id);
            if (flat != null)
            {
                flat = flat.Include(f => f.Photos);
                return (await flat.ToArrayAsync()).FirstOrDefault();
            }
            else
                return null;
        }

        public async Task<IEnumerable<Flat>> GetByOwnerId(string id)
        {
            var flats = _dbContext.Set<Flat>().Where(f => f.OwnerId == id);
            if (flats != null)
            {
                flats = flats.Include(f => f.Photos);
                return await flats.ToArrayAsync();
            }
            else
                return null;
        }

        private IQueryable<Flat> Filter(FlatFilters filters)
        {
            IQueryable<Flat> query = _dbContext.Set<Flat>();

            // filter by availability
            if (filters.StartDate.HasValue && filters.EndDate.HasValue)
            {
                IQueryable<Rental> rentals = _dbContext.Set<Rental>();

                var rentalino = rentals.FirstOrDefault();

                var check = filters.StartDate >= rentalino.StartDate || filters.EndDate <= rentalino.EndDate;
                var check2 = filters.StartDate >= rentalino.StartDate && filters.EndDate <= rentalino.EndDate;


                rentals = rentals.Where(
                   r => ((filters.StartDate < r.EndDate && filters.EndDate > r.EndDate) ||
                        (filters.StartDate > r.StartDate && filters.EndDate < r.EndDate) ||
                        (filters.StartDate < r.StartDate && filters.EndDate > r.StartDate) ||
                        (filters.StartDate < r.StartDate && filters.EndDate > r.EndDate) ||
                        (filters.StartDate == r.StartDate && filters.EndDate == r.EndDate) ||
                        (filters.StartDate == r.StartDate && filters.EndDate > r.StartDate) ||
                        (filters.StartDate < r.EndDate && filters.EndDate == r.EndDate))
                         && r.RentalStatus != Status.Canceled);

                foreach (var rental in rentals)
                    query = query.Where(f => f.Id != rental.FlatId);
            }

            if(filters.City != "")
            {
                query = query.Where(f => f.City == filters.City);
            }

            if (filters.GuestNumber != 0)
            {
                query = query.Where(f => f.MaxGuests >= filters.GuestNumber);
            }

            if (filters.RoomCount != 0)
            {
                query = query.Where(f => f.RoomCount == filters.RoomCount);
            }

            if (filters.MaxPrice != 0)
            {
                query = query.Where(f => f.Price <= filters.MaxPrice);
            }

            if (filters.MinPrice != 0)
            {
                query = query.Where(f => f.Price >= filters.MinPrice);
            }

            if (filters.Balcony)
            {
                query = query.Where(f => f.Balcony == true);
            }

            if (filters.TV)
            {
                query = query.Where(f => f.TV == true);
            }

            if (filters.Elevator)
            {
                query = query.Where(f => f.Elevator == true);
            }

            if (filters.WIFI)
            {
                query = query.Where(f => f.WIFI == true);
            }

            if (filters.Kitchen)
            {
                query = query.Where(f => f.Kitchen == true);
            }

            if (filters.Oven)
            {
                query = query.Where(f => f.Oven == true);
            }

            if (filters.Iron)
            {
                query = query.Where(f => f.Iron == true);
            }

            if (filters.WithKids)
            {
                query = query.Where(f => f.WithKids == true);
            }

            if (filters.WithPets)
            {
                query = query.Where(f => f.WithPets == true);
            }

            if (filters.Microwave)
            {
                query = query.Where(f => f.Microwave == true);
            }

            if (filters.Parking)
            {
                query = query.Where(f => f.Parking == true);
            }

            if (filters.Fridge)
            {
                query = query.Where(f => f.Fridge == true);
            }

            query = query.Where(f => f.IsActive == true);

            return query;
        }
    }
}
