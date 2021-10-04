using AutoMapper;
using MailKit.Net.Smtp;
using MetFlat.BusinessLogic.Interfaces;
using MetFlat.DataAccess.Interfaces;
using MetFlat.Model.DTO;
using MetFlat.Model.Entities;
using MetFlat.Model.Enums;
using Microsoft.AspNetCore.Identity;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
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
            var rentals = unitOfWork.RentalRepository.GetAll().Where(r => r.Flat.OwnerId == id);
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
            var rentals = unitOfWork.RentalRepository.GetAll().Where(r => r.TenantId == id).OrderByDescending(r => r.StartDate);
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

        public IEnumerable<RentalDTO> GetPendingByOwnerId(string id)
        {
            var rentals = unitOfWork.RentalRepository.GetAll().Where(r => r.Flat.OwnerId == id).Where(r => r.RentalStatus == Status.Requested);
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

        public IEnumerable<RentalDTO> GetPendingByTenantId(string id)
        {
            var rentals = unitOfWork.RentalRepository.GetAll().Where(r => r.TenantId == id).Where(r => r.RentalStatus == Status.Requested);
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
            var entity = mapper.Map<Rental>(rentalDTO);
            await unitOfWork.RentalRepository.Insert(entity);
            await unitOfWork.Save();

            var rentalEntity = await unitOfWork.RentalRepository.GetById(entity.Id);
            await Notify(rentalEntity);
        }


        public async Task ApproveRental(int id)
        {
            var entity = await unitOfWork.RentalRepository.GetById(id);
            if (entity != null)
            {
                entity.RentalStatus = Model.Enums.Status.Approved;
                unitOfWork.RentalRepository.Update(entity);
                await unitOfWork.Save();
                await Notify(entity);
            }
        }

        public async Task CancelRental(int id)
        {
            var entity = await unitOfWork.RentalRepository.GetById(id);
            if (entity != null)
            {
                entity.RentalStatus = Model.Enums.Status.Canceled;
                unitOfWork.RentalRepository.Update(entity);
                await unitOfWork.Save();
                await Notify(entity);
            }
        }

        public async Task Notify(Rental rental)
        {
            var tenantMail = (await userManager.FindByIdAsync(rental.TenantId)).Email;
            var ownerMail = (await userManager.FindByIdAsync(rental.Flat.OwnerId)).Email;
            var subject = "";

            switch(rental.RentalStatus)
            {
                case Status.Approved:
                    subject = "The rental has been approved."; 
                    break;
                case Status.Canceled:
                    subject = "The rental has been canceled.";
                    break;
                case Status.Requested:
                    subject = "New book request.";
                    break;
                default: break;
            }

            MimeMessage message = new MimeMessage() { Subject = subject };

            message.From.Add(new MailboxAddress("MetFlat", "metflat@ukr.net"));
            message.To.Add(new MailboxAddress("Tenant", tenantMail));
            message.To.Add(new MailboxAddress("Owner", ownerMail));

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = await BuildFromTemplate(rental);
            message.Body = bodyBuilder.ToMessageBody();

            SmtpClient client = new SmtpClient();
            client.Connect("smtp.ukr.net", 465, true);
            client.Authenticate("metflat@ukr.net", "uKPDWm9JdqlGGD9S");

            try 
            { 
            client.Send(message);
            client.Disconnect(true);
            client.Dispose();
            } catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        private async Task<string> BuildFromTemplate(Rental rental)
        {
            var tenant = await userManager.FindByIdAsync(rental.TenantId);
            var owner = rental.Flat.Owner;
            var builder = new StringBuilder(File.ReadAllText("..\\Metflat.BusinessLogic\\EmailTemplate.html"));

            var mainInfo = "";
            switch (rental.RentalStatus)
            {
                case Status.Approved:
                    mainInfo = "Book request has been approved.";
                    break;
                case Status.Canceled:
                    mainInfo = "Book request has been canceled.";
                    break;
                case Status.Requested:
                    mainInfo = "New book request.";
                    break;
                default: break;
            }

            builder.Replace("[main_info]", mainInfo);
            builder.Replace("[address]", rental.Flat.City + ", " + rental.Flat.Address);
            builder.Replace("[check-in]", rental.StartDate.ToString());
            builder.Replace("[check-out]", rental.EndDate.ToString());
            builder.Replace("[owner]", owner.UserName);
            builder.Replace("[tenant]", tenant.UserName);

            return builder.ToString();
        }
    }
}
