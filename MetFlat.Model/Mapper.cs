using AutoMapper;
using MetFlat.Model.DTO;
using MetFlat.Model.Entities;

namespace MetFlat.Model
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<UserLoginDTO, User>().ReverseMap();
            CreateMap<FlatDTO, Flat>().ReverseMap();
            CreateMap<Flat, FlatDTO>().ReverseMap();
            CreateMap<RentalDTO, Rental>().ReverseMap();
            CreateMap<FacilityDTO, Facility>().ReverseMap();
            CreateMap<AddressDTO, Address>().ReverseMap();
            CreateMap<PhotoDTO, Photo>().ReverseMap();
        }
    }
}
