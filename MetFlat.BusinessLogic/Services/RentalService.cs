using AutoMapper;
using MetFlat.BusinessLogic.Interfaces;
using MetFlat.DataAccess.Interfaces;
using MetFlat.Model.DTO;
using MetFlat.Model.Entities;
using MetFlat.Model.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace MetFlat.BusinessLogic.Services
{
    public class RentalService : IRentalService
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        public readonly IFlatService flatService;
        private readonly UserManager<IdentityUser> userManager;

        public RentalService(IMapper _mapper, IUnitOfWork _unitOfWork, IFlatService _flatService, UserManager<IdentityUser> _userManager)
        {
            mapper = _mapper;
            unitOfWork = _unitOfWork;
            flatService = _flatService;
            userManager = _userManager;
        }


        public IEnumerable<RentalDTO> GetAll()
        {
            var rentals = unitOfWork.RentalRepository.GetAll();
            return mapper.Map<IEnumerable<RentalDTO>>(rentals);
        }

        public async Task<RentalDTO> GetById(int id)
        {
            var rental = await unitOfWork.RentalRepository.GetById(id);
            return mapper.Map<RentalDTO>(rental);
        }

        public IEnumerable<RentalDTO> GetByOwnerId(string id)
        {
            var rentals = unitOfWork.RentalRepository.GetAll();//.Where(r => r.Flat.OwnerId == id);
            var rentalsDTO = mapper.Map<IEnumerable<RentalDTO>>(rentals);
            foreach(var rentalDTO in rentalsDTO)
            {
                foreach(var rental in rentals)
                {
                    if(rentalDTO.Id == rental.Id)
                    {
                        rentalDTO.FlatPhoto = rental.Flat.Photos[0].Path;
                        rentalDTO.Address = rental.Flat.City + ", " + rental.Flat.Address;
                    }
                }
            }
            
            return rentalsDTO;
        }

        public IEnumerable<RentalDTO> GetByTenantId(string id)
        {
            var rentals = unitOfWork.RentalRepository.GetAll().Where(r => r.TenantId == id);
            var rentalsDTO = mapper.Map<IEnumerable<RentalDTO>>(rentals);
            foreach (var rentalDTO in rentalsDTO)
            {
                foreach (var rental in rentals)
                {
                    if (rentalDTO.Id == rental.Id)
                    {
                        rentalDTO.FlatPhoto = rental.Flat.Photos[0].Path;
                        rentalDTO.Address = rental.Flat.City + ", " + rental.Flat.Address;
                    }
                }
            }

            return rentalsDTO;
        }

        public async Task Insert(RentalDTO rentalDTO)
        {
            int flatPrice = (await flatService.GetById(rentalDTO.FlatId)).Price;
            rentalDTO.Total = (rentalDTO.EndDate - rentalDTO.StartDate).Days * flatPrice;
            var entity = mapper.Map<Rental>(rentalDTO);
            await unitOfWork.RentalRepository.Insert(entity);
            await unitOfWork.Save();
        }

        public async Task Update(int id, RentalDTO rentalDTO)
        {
            var entity = await unitOfWork.RentalRepository.GetById(id);
            if (entity != null)
            {
                mapper.Map(rentalDTO, entity);
                unitOfWork.RentalRepository.Update(entity);
                await unitOfWork.Save();
            }
        }

        public async Task Delete(int id)
        {
            var entity = await unitOfWork.RentalRepository.GetById(id);
            if (entity != null)
            {
                await unitOfWork.RentalRepository.Delete(id);
                await unitOfWork.Save();
            }
        }

        public async Task ApproveRental(int id)
        {
            var entity = await unitOfWork.RentalRepository.GetById(id);
            if (entity != null)
            {
                entity.RentalStatus = Model.Enums.Status.Approved;
                unitOfWork.RentalRepository.Update(entity);
                await unitOfWork.Save();
                Notify(entity);
            }
        }

        //public async Task RejectRental(int id)
        //{
        //    var entity = await unitOfWork.RentalRepository.GetById(id);
        //    if (entity != null)
        //    {
        //        entity.RentalStatus = Model.Enums.Status.Rejected;
        //        unitOfWork.RentalRepository.Update(entity);
        //        await unitOfWork.Save();
        //    }
        //}

        public async Task CancelRental(int id)
        {
            var entity = await unitOfWork.RentalRepository.GetById(id);
            if (entity != null)
            {
                entity.RentalStatus = Model.Enums.Status.Canceled;
                unitOfWork.RentalRepository.Update(entity);
                await unitOfWork.Save();
                Notify(entity);
            }
        }

        public async void Notify(Rental rental)
        {
            var tenantMail = await userManager.GetEmailAsync(await userManager.FindByIdAsync(rental.TenantId));
            var ownerMail = await userManager.GetEmailAsync(await userManager.FindByIdAsync(rental.Flat.OwnerId));
            var subject = "";

            switch(rental.RentalStatus)
            {
                case Status.Approved:
                    subject = "The rental has been approved."; 
                    break;
                case Status.Canceled:
                    subject = "The rental has been canceled.";
                    break;
                default: break;
            }

            var smtpClient = new SmtpClient("smtp.sendgrid.net")
            {
                Port = 587,
                Credentials = new NetworkCredential("metfalt@gmail.com", "metflat12345"),
                EnableSsl = true
            };

            var mailMessage = new MailMessage()
            {
                From = new MailAddress("metflat@gmail.com", "MetFlat"),
                Subject = subject,
                Body = BuildFromTemplate(rental),
                IsBodyHtml = true,
            };

            mailMessage.To.Add(tenantMail);
            mailMessage.To.Add(ownerMail);
            smtpClient.Send(mailMessage);
        }

        private string BuildFromTemplate(Rental rental)
        {
            var tenant = userManager.FindByIdAsync(rental.TenantId).Result;
            var owner = userManager.FindByIdAsync(rental.Flat.OwnerId).Result;
            var builder = new StringBuilder(File.ReadAllText("..\\Metflat.BusinessLogic\\EmailTemplate.html"));

            builder.Replace("[status]", rental.RentalStatus.ToString());
            builder.Replace("[check-in]", rental.StartDate.ToString());
            builder.Replace("[check-out]", rental.EndDate.ToString());
            builder.Replace("[owner]", owner.UserName);
            builder.Replace("[tenant]", tenant.UserName);

            return builder.ToString();
        }
    }
}
