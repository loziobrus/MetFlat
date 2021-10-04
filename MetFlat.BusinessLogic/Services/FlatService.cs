using AutoMapper;
using MetFlat.BusinessLogic.Interfaces;
using MetFlat.DataAccess.Interfaces;
using MetFlat.Model.DTO;
using MetFlat.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetFlat.BusinessLogic.Services
{
    public class FlatService : IFlatService
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;

        public FlatService(IMapper _mapper, IUnitOfWork _unitOfWork)
        {
            mapper = _mapper;
            unitOfWork = _unitOfWork;
        }

        public IEnumerable<FlatDTO> GetAll()
        {
            var flats = unitOfWork.FlatRepository.GetAll();
            return mapper.Map<IEnumerable<FlatDTO>>(flats);
        }
        public async Task<IEnumerable<FlatDTO>> GetFiltered(FlatFilters filters)
        {
            var flats = await unitOfWork.FlatRepository.GetFiltered(filters);
            return mapper.Map<IEnumerable<FlatDTO>>(flats);
        }

        public async Task<IEnumerable<FlatDTO>> GetInactive()
        {
            var flats = (await unitOfWork.FlatRepository.GetAll()).Where(f => f.IsActive == false);
            return mapper.Map<IEnumerable<FlatDTO>>(flats);
        }

        public async Task<FlatDTO> GetById(int id)
        {
            var flat = await unitOfWork.FlatRepository.GetById(id);
            return mapper.Map<FlatDTO>(flat);
        }

        public async Task Insert(FlatDTO flatDTO)
        {
            var entity = mapper.Map<Flat>(flatDTO);
            await unitOfWork.FlatRepository.Insert(entity);
            await unitOfWork.Save();

            foreach(var photo in flatDTO.Photos)
            {
                var newPhoto = new Photo
                {
                    FlatId = entity.Id,
                    Path = photo.Path
                };
                await unitOfWork.PhotoRepository.Insert(newPhoto);
                await unitOfWork.Save();
            }
        }

        public async void Update(int id, FlatDTO flatDTO)
        {
            var entity = await unitOfWork.FlatRepository.GetById(id);
            if (entity != null)
            {
                mapper.Map(flatDTO, entity);
                unitOfWork.FlatRepository.Update(entity);
                await unitOfWork.Save();
            }
            else 
            {
                throw new NullReferenceException();
            }
        }

        public async Task Deactivate(int id)
        {
            var entity = await unitOfWork.FlatRepository.GetById(id);
            if (entity != null)
            {
                entity.IsActive = false;
                try
                { 
                    unitOfWork.FlatRepository.Update(entity);
                } catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
                await unitOfWork.Save();
            }
            else
            {
                throw new NullReferenceException();
            }
        }

        public async Task Activate(int id)
        {
            var entity = await unitOfWork.FlatRepository.GetById(id);
            if (entity != null)
            {
                entity.IsActive = true;
                unitOfWork.FlatRepository.Update(entity);
                await unitOfWork.Save();
            }
            else
            {
                throw new NullReferenceException();
            }
        }

        public async Task Delete(int id)
        {
            var entity = await unitOfWork.FlatRepository.GetById(id);
            if (entity != null)
            {
                await unitOfWork.FlatRepository.Delete(id);
                await unitOfWork.Save();
            }
        }

        public async Task<IEnumerable<FlatDTO>> GetByOwnerId(string id)
        {
            var flats = await unitOfWork.FlatRepository.GetByOwnerId(id);
            return mapper.Map<IEnumerable<FlatDTO>>(flats);
        }
    }
}
